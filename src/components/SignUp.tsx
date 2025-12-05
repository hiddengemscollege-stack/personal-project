import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, UserPlus } from 'lucide-react';

interface SignUpProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function SignUp({ onNavigate, onBack }: SignUpProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setError('Phone number must be exactly 10 digits.');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await signUp(email, password, name, phone);
            if (error) {
                setError(error.message);
            } else if (data && !data.session) {
                // User created but email not verified
                setError('Account created! Please check your email to confirm your account before logging in.');
            } else {
                // Successful signup with session (email confirmation disabled)
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
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-sm text-gray-600">Join HiddenGems to find your perfect college</p>
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
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

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
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="9876543210"
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
                                    minLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                                <UserPlus size={18} />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={() => onNavigate('login')}
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
