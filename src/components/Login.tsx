import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, AlertCircle } from 'lucide-react';

interface LoginProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function Login({ onNavigate, onBack }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [highlightSignup, setHighlightSignup] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setHighlightSignup(false);
        setLoading(true);

        try {
            const { error } = await login(email, password);
            if (error) {
                // Check for various forms of invalid credential errors
                const errorMessage = error.message.toLowerCase();
                if (errorMessage.includes('invalid') && (errorMessage.includes('credential') || errorMessage.includes('login'))) {
                    setError('Invalid login credentials. Please sign up first.');
                    setHighlightSignup(true);
                } else if (errorMessage.includes('email not confirmed')) {
                    setError('Please check your email to confirm your account.');
                } else {
                    setError(error.message || 'Invalid credentials.');
                }
            } else {
                onNavigate('home');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onNavigate={onNavigate} currentPage="home" onBack={onBack} />

            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
                        <p className="mt-2 text-sm text-gray-600">Enter your credentials to access the dashboard</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white py-8 px-6 shadow rounded-lg">
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm flex items-center">
                                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Logging in...' : 'Login to Dashboard'}
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => onNavigate('signup')}
                                    className={`font-medium transition-all duration-500 px-4 py-2 rounded-full ${highlightSignup
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110 hover:scale-125 hover:shadow-xl animate-bounce'
                                        : 'text-blue-600 hover:text-blue-500'
                                        }`}
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>

                        <p className="mt-4 text-center text-xs text-gray-500">
                            Protected by 256-bit SSL Encryption
                        </p>
                    </div>
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
