import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean; // Kept for compatibility, can be derived from user metadata or role
    login: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string, name: string, phone: string) => Promise<{ data?: any; error: any }>;
    logout: () => Promise<void>;
    logSessionActivity: (activity: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check active sessions and subscribe to auth changes
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (!error && data.user) {
            setIsAdmin(true);

            // Record login history and save ID
            const { data: historyData, error: historyError } = await supabase
                .from('login_history')
                .insert({
                    user_id: data.user.id,
                    login_at: new Date().toISOString(),
                    session_activities: []
                })
                .select()
                .single();

            if (historyData) {
                localStorage.setItem('current_login_history_id', historyData.id);
            }
        }
        return { error };
    };

    const signUp = async (email: string, password: string, name: string, phone: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    phone: phone,
                },
            },
        });

        if (!error && data.user) {
            // Create profile ONLY
            await supabase.from('profiles').insert({
                id: data.user.id,
                full_name: name,
                phone: phone,
                email: email,
                updated_at: new Date().toISOString()
            });
        }

        return { data, error };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setIsAdmin(false);
        localStorage.removeItem('current_login_history_id');
    };

    const logSessionActivity = async (activity: any) => {
        const historyId = localStorage.getItem('current_login_history_id');
        if (!historyId) return;

        // Fetch current activities
        const { data } = await supabase
            .from('login_history')
            .select('session_activities')
            .eq('id', historyId)
            .single();

        if (data) {
            const currentActivities = data.session_activities || [];
            const newActivities = [...currentActivities, { ...activity, timestamp: new Date().toISOString() }];

            await supabase
                .from('login_history')
                .update({ session_activities: newActivities })
                .eq('id', historyId);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, isAdmin, login, signUp, logout, logSessionActivity }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
