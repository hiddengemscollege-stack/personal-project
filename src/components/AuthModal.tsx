import { useState } from 'react';
import { X, UserPlus, LogIn, AlertCircle, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLead } from '../context/LeadContext';

export function AuthModal() {
    const { isAuthModalOpen, closeAuthModal } = useLead();
    const { signUp, login } = useAuth();

    const [mode, setMode] = useState<'signup' | 'login'>('signup');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isAuthModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                // Phone validation
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(formData.phone)) {
                    setError('Phone number must be exactly 10 digits.');
                    setLoading(false);
                    return;
                }

                const { data, error } = await signUp(formData.email, formData.password, formData.name, formData.phone);
                if (error) throw error;
                if (data && !data.session) {
                    setError('Account created! Please check your email to confirm.');
                }
            } else {
                const { error } = await login(formData.email, formData.password);
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">

                <button
                    onClick={closeAuthModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/50 rounded-full p-1"
                >
                    <X size={24} />
                </button>

                {/* Left Side - Value Proposition */}
                <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                            <Sparkles className="text-yellow-300" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold leading-tight mb-4">
                            Unlock the Full Experience
                        </h2>
                        <p className="text-blue-100 text-lg">
                            Join thousands of students finding their dream colleges on HiddenGems.
                        </p>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle2 size={18} className="text-blue-200" />
                            </div>
                            <span className="font-medium">Unlimited College Views</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle2 size={18} className="text-blue-200" />
                            </div>
                            <span className="font-medium">Compare Fees & Placements</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle2 size={18} className="text-blue-200" />
                            </div>
                            <span className="font-medium">Direct Admission Support</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20 text-sm text-blue-200">
                        Trusted by 10,000+ Students
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold mb-4 border border-amber-100">
                            <Lock size={14} />
                            Sign up to unlock full website access
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {mode === 'signup'
                                ? 'It takes less than 30 seconds.'
                                : 'Log in to continue your search.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center">
                            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <input
                                type="email"
                                required
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    {mode === 'signup' ? 'Unlock Full Access' : 'Log In'}
                                    {mode === 'signup' ? <UserPlus size={18} /> : <LogIn size={18} />}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                onClick={() => {
                                    setMode(mode === 'signup' ? 'login' : 'signup');
                                    setError('');
                                }}
                                className="font-bold text-blue-600 hover:text-blue-700 underline decoration-2 decoration-blue-100 hover:decoration-blue-600 transition-all"
                            >
                                {mode === 'signup' ? 'Log in' : 'Sign up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
