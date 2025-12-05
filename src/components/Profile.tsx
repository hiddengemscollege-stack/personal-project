import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Mail, Phone, Shield } from 'lucide-react';

interface ProfileProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function Profile({ onNavigate, onBack }: ProfileProps) {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        onNavigate('home');
    };

    if (!user) {
        onNavigate('login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onNavigate={onNavigate} currentPage="home" onBack={onBack} />

            <div className="flex-1 container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden transition-all hover:shadow-2xl duration-300">
                        {/* Profile Header - Spacious & Centered */}
                        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-8 py-16 text-white text-center relative overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="bg-white/20 p-1 rounded-full backdrop-blur-md mb-6 inline-block">
                                    <div className="bg-white p-4 rounded-full">
                                        <User size={64} className="text-blue-600" />
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight mb-2">{user.user_metadata?.full_name || 'User'}</h1>
                                <div className="inline-flex items-center gap-2 bg-blue-500/30 px-4 py-1.5 rounded-full backdrop-blur-sm border border-blue-400/30">
                                    <Shield size={16} className="text-blue-100" />
                                    <span className="text-blue-50 font-medium tracking-wide text-sm">Student Account</span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details - Grid Layout */}
                        <div className="p-10 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-100 p-3.5 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                                            <Mail className="text-blue-600 group-hover:text-white transition-colors duration-300" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Email Address</p>
                                            <p className="text-lg text-gray-900 font-semibold break-all">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-100 p-3.5 rounded-xl group-hover:bg-green-600 transition-colors duration-300">
                                            <Phone className="text-green-600 group-hover:text-white transition-colors duration-300" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Phone Number</p>
                                            <p className="text-lg text-gray-900 font-semibold">
                                                {user.user_metadata?.phone || 'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex justify-center">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 bg-white text-red-600 py-3 px-8 rounded-full border-2 border-red-100 hover:bg-red-50 hover:border-red-200 hover:shadow-md transition-all duration-300 font-semibold text-lg group"
                                >
                                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-gray-400 mt-8 text-sm">
                        Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
