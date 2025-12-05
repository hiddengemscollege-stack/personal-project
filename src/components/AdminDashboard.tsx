import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCollege } from '../context/CollegeContext';
import { LayoutDashboard, Edit, LogOut } from 'lucide-react';

interface AdminDashboardProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function AdminDashboard({ onNavigate, onBack }: AdminDashboardProps) {
    const { logout, user } = useAuth();
    const { collegeData } = useCollege();

    const handleLogout = () => {
        logout();
        onNavigate('home');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onNavigate={onNavigate} currentPage="home" onBack={onBack} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <LayoutDashboard className="mr-3 text-blue-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">Welcome back, {user?.user_metadata?.full_name || 'Administrator'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <LogOut size={18} className="mr-2" />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Action Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage College</h2>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
                            <div>
                                <div className="font-medium text-blue-900">{collegeData.name}</div>
                                <div className="text-sm text-blue-600">{collegeData.city}, {collegeData.state}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => onNavigate('college-detail')}
                            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit size={18} className="mr-2" />
                            Edit College Details
                        </button>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Statistics</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Placement %</span>
                                <span className="font-bold text-gray-900">{collegeData.placements.percentage}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Avg Package</span>
                                <span className="font-bold text-gray-900">{collegeData.placements.averagePackage}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Highest Package</span>
                                <span className="font-bold text-gray-900">{collegeData.placements.highestPackage}</span>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
                        <div className="flex items-center space-x-2 text-green-600 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">System Online</span>
                        </div>
                        <p className="text-xs text-gray-500">
                            Changes made here are currently local. Database integration required for global updates.
                        </p>
                    </div>
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
