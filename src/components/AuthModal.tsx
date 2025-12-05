import { useState } from 'react';
import { X, UserPlus, LogIn, AlertCircle, CheckCircle2, Sparkles, Lock, User, Phone } from 'lucide-react';
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
            // Close modal on success (if no error thrown)
            closeAuthModal();
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl relative overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row border border-white/20">

                <button
                    onClick={closeAuthModal}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-sm"
                >
                    <X size={20} />
                </button>

                {/* Left Side - Value Proposition */}
                <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/20">
                            <Sparkles className="text-yellow-300" size={28} />
                        </div>
                        <h2 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
                            Unlock Unlimited Access
                        </h2>
                        <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                            You've viewed your free college. Sign up to explore thousands more Hidden Gems.
                        </p>
                    </div>

                    <div className="space-y-5 relative z-10">
                        <div className="flex items-center space-x-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                                <CheckCircle2 size={20} className="text-blue-200" />
                            </div>
                            <span className="font-medium text-lg">Unlimited College Views</span>
                        </div>
                        <div className="flex items-center space-x-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                                <CheckCircle2 size={20} className="text-blue-200" />
                            </div>
                            <span className="font-medium text-lg">Compare Fees & Placements</span>
                        </div>
                        <div className="flex items-center space-x-4 group">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                                <CheckCircle2 size={20} className="text-blue-200" />
                            </div>
                            <span className="font-medium text-lg">Direct Admission Support</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 text-sm text-blue-200 flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full bg-blue-400 border-2 border-blue-600"></div>
                            ))}
                        </div>
                        <span>Trusted by 10,000+ Students</span>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold mb-6 border border-amber-100 shadow-sm">
                            <Lock size={14} />
                            <span>Sign up to continue exploring</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-500">
                            {mode === 'signup'
                                ? 'Join for free and find your dream college today.'
                                : 'Log in to access your saved colleges.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center animate-in slide-in-from-top-2">
                            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'signup' && (
                            <>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400 hover:bg-gray-100/50"
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Phone Number (10 digits)"
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setFormData({ ...formData, phone: val });
                                        }}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400 hover:bg-gray-100/50"
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
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400 hover:bg-gray-100/50"
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-gray-400 hover:bg-gray-100/50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 active:scale-95"
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
                        <p className="text-sm text-gray-500">
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
