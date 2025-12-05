import { Menu, X, GraduationCap, ArrowLeft, LogIn, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onBack?: () => void;
}

export function Header({ onNavigate, currentPage, onBack }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900">HiddenGems</span>
            </div>
          </div>

          {/* Centered ChatBot Button - Desktop Only */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => onNavigate('chatbot')}
              className="group flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 font-bold ring-2 ring-green-400"
            >
              <MessageSquare size={18} className="text-white group-hover:rotate-12 transition-transform" />
              <span className="font-bold tracking-wide text-sm">Ask Gemmy</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 font-medium transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('search')}
              className={`${currentPage === 'search' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 font-medium transition-colors`}
            >
              Find Colleges
            </button>

            {user ? (
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <User size={16} />
                Profile
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <LogIn size={16} />
                Login
              </button>
            )}

            <button
              onClick={() => onNavigate('for-colleges')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              For Colleges
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            {/* Mobile ChatBot Trigger */}
            <button
              onClick={() => onNavigate('chatbot')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-lg text-xs font-bold ring-2 ring-white/50"
            >
              <MessageSquare size={14} />
              Gemmy
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('search');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Find Colleges
            </button>
            {user ? (
              <button
                onClick={() => {
                  onNavigate('profile');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                Login
              </button>
            )}
            <button
              onClick={() => {
                onNavigate('for-colleges');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              For Colleges
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
