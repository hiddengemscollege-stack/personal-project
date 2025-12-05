import { useState } from 'react';
import { Home } from './components/Home';
import { SearchResults } from './components/SearchResults';
import { CollegeDetail } from './components/CollegeDetail';
import { ForColleges } from './components/ForColleges';
import { Contact } from './components/Contact';
import { HowItWorks } from './components/HowItWorks';
import { WhyUnderrated } from './components/WhyUnderrated';
import { SuccessStories } from './components/SuccessStories';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { AdminDashboard } from './components/AdminDashboard';
import { Profile } from './components/Profile';
import { ChatBotPage } from './components/ChatBotPage';
import { AuthProvider } from './context/AuthContext';
import { CollegeProvider } from './context/CollegeContext';
import { LeadProvider } from './context/LeadContext';
import { AuthModal } from './components/AuthModal';
import { Page, SearchParams } from './types';

// export type Page = ... (removed)
// export interface SearchParams ... (removed)

export default function App() {
  const [history, setHistory] = useState<Page[]>(['home']);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleNavigate = (page: Page, params?: SearchParams) => {
    setHistory(prev => [...prev, page]);
    setCurrentPage(page);
    if (params) {
      setSearchParams(params);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentPage(previousPage);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'search':
        return (
          <SearchResults
            onNavigate={handleNavigate}
            onSelectCollege={(id) => {
              setSelectedCollege(id);
              handleNavigate('college-detail');
            }}
            initialFilters={searchParams}
            onBack={handleBack}
          />
        );
      case 'college-detail':
        return (
          <CollegeDetail
            onNavigate={handleNavigate}
            collegeId={selectedCollege || 1}
            onBack={handleBack}
          />
        );
      case 'for-colleges':
        return <ForColleges onNavigate={handleNavigate} onBack={handleBack} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} onBack={handleBack} />;
      case 'how-it-works':
        return <HowItWorks onNavigate={handleNavigate} onBack={handleBack} />;
      case 'why-underrated':
        return <WhyUnderrated onNavigate={handleNavigate} onBack={handleBack} />;
      case 'success-stories':
        return <SuccessStories onNavigate={handleNavigate} onBack={handleBack} />;
      case 'login':
        return <Login onNavigate={handleNavigate} onBack={handleBack} />;
      case 'signup':
        return <SignUp onNavigate={handleNavigate} onBack={handleBack} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} onBack={handleBack} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} onBack={handleBack} />;
      case 'chatbot':
        return <ChatBotPage onNavigate={handleNavigate} onBack={handleBack} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CollegeProvider>
        <LeadProvider>
          <div className="min-h-screen bg-white">
            {renderPage()}
            <AuthModal />
          </div>
        </LeadProvider>
      </CollegeProvider>
    </AuthProvider>
  );
}
