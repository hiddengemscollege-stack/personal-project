export type Page = 'home' | 'search' | 'college-detail' | 'for-colleges' | 'contact' | 'how-it-works' | 'why-underrated' | 'success-stories' | 'login' | 'signup' | 'admin-dashboard' | 'profile' | 'chatbot' | 'privacy-policy';

export interface SearchParams {
    state?: string;
    city?: string;
    course?: string;
    budget?: string;
    id?: number;
}
