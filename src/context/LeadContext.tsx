import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface LeadContextType {
    isAuthModalOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
    checkAccess: (action: 'view' | 'enquire', callback: () => void, collegeId?: string) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

interface LeadProviderProps {
    children: React.ReactNode;
}

export function LeadProvider({ children }: LeadProviderProps) {
    const { user, logSessionActivity } = useAuth();
    const [viewedColleges, setViewedColleges] = useState<string[]>([]);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ callback: () => void } | null>(null);

    useEffect(() => {
        // Check localStorage on mount
        const viewed = localStorage.getItem('viewed_colleges_v1');
        if (viewed) {
            setViewedColleges(JSON.parse(viewed));
        }
    }, []);

    // If user logs in while modal is open, close it and run pending action
    useEffect(() => {
        if (user && isAuthModalOpen) {
            setIsAuthModalOpen(false);
            if (pendingAction) {
                pendingAction.callback();
                setPendingAction(null);
            }
        }
    }, [user, isAuthModalOpen, pendingAction]);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    const checkAccess = (action: 'view' | 'enquire', callback: () => void, collegeId?: string) => {
        // If user is logged in via Supabase, they have unlimited access
        if (user) {
            if (action === 'view' && collegeId) {
                // Record view activity to user_activity (Master Log)
                supabase.from('user_activity').insert({
                    user_id: user.id,
                    action_type: 'view_college',
                    details: { college_id: collegeId }
                }).then(({ error }) => {
                    if (error) console.error('Error recording view:', error);
                });

                // Record view activity to login_history (Session Log)
                logSessionActivity({
                    type: 'view_college',
                    college_id: collegeId
                });
            }
            callback();
            return;
        }

        if (action === 'enquire') {
            // Enquire always requires login
            setPendingAction({ callback });
            openAuthModal();
            return;
        }

        if (action === 'view') {
            // If no collegeId provided (shouldn't happen for view), treat as new view
            const id = collegeId || 'unknown';

            // If already viewed this college, allow access
            if (viewedColleges.includes(id)) {
                callback();
                return;
            }

            // If this is the first college being viewed (and not in list yet)
            if (viewedColleges.length < 1) {
                const newViewed = [...viewedColleges, id];
                setViewedColleges(newViewed);
                localStorage.setItem('viewed_colleges_v1', JSON.stringify(newViewed));
                callback();
            } else {
                // Trying to view a 2nd unique college -> Login required
                setPendingAction({ callback });
                openAuthModal();
            }
        }
    };

    return (
        <LeadContext.Provider value={{ isAuthModalOpen, openAuthModal, closeAuthModal, checkAccess }}>
            {children}
        </LeadContext.Provider>
    );
}

export function useLead() {
    const context = useContext(LeadContext);
    if (context === undefined) {
        throw new Error('useLead must be used within a LeadProvider');
    }
    return context;
}
