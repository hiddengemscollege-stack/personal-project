import { supabase } from './supabase';

export const trackEvent = async (action_type: string, details: any = {}) => {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('user_activity')
            .insert([
                {
                    user_id: user?.id || null,
                    action_type,
                    details
                }
            ]);

        if (error) {
            console.error('Error tracking event:', error);
        }
    } catch (error) {
        console.error('Error in trackEvent:', error);
    }
};
