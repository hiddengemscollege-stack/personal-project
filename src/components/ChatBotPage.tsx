import { useState, useRef, useEffect } from 'react';
import { Header } from './Header';
import { Page } from '../types';
import { Bot, Sparkles, ChevronRight, User, HelpCircle } from 'lucide-react';

interface ChatBotPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

interface Question {
    id: number;
    text: string;
    answer: string;
    category: string;
    nextQuestions?: number[];
}

const ALL_QUESTIONS: Question[] = [
    { id: 1, text: "How do I find the best college?", answer: "You can use our 'Find Colleges' page to filter by state, city, course, and budget. We only list verified, high-quality colleges!", category: "Getting Started", nextQuestions: [2, 3, 6, 7] },
    { id: 2, text: "Are these colleges verified?", answer: "Yes, absolutely! Every college listed on HiddenGems is verified for facilities, faculty, and genuine student reviews.", category: "Getting Started", nextQuestions: [8, 9, 10] },
    { id: 3, text: "What is the fee structure?", answer: "Fees vary by college and course. You can see the 'Starting from' fees on each college card. Click 'Enquire' to get the detailed fee breakdown.", category: "Getting Started", nextQuestions: [4, 11, 12] },
    { id: 4, text: "How can I contact a college?", answer: "Simply click the 'Enquire' button on any college profile. We'll connect you directly with their admission team within 24 hours.", category: "Getting Started", nextQuestions: [5, 13] },
    { id: 5, text: "Is this service free?", answer: "Yes! HiddenGems is 100% free for students. We want to help you find your dream college without any cost.", category: "Getting Started", nextQuestions: [14, 15] },
];

const INITIAL_QUESTIONS = [1, 2, 3, 4, 5];

export function ChatBotPage({ onNavigate, onBack }: ChatBotPageProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, text: "Hi! I'm Gemmy 💎. I'm here to help you find your perfect college match. What's on your mind today?", sender: 'bot' }
    ]);
    const [currentQuestions, setCurrentQuestions] = useState<number[]>(INITIAL_QUESTIONS);
    const [isTyping, setIsTyping] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleQuestionClick = (questionId: number) => {
        const question = ALL_QUESTIONS.find(q => q.id === questionId);
        if (!question) return;

        const userMsgId = Date.now();
        setMessages(prev => [...prev, { id: userMsgId, text: question.text, sender: 'user' }]);
        setIsTyping(true);

        setTimeout(() => {
            const botMsgId = Date.now() + 1;
            setMessages(prev => [...prev, { id: botMsgId, text: question.answer, sender: 'bot' }]);
            setIsTyping(false);

            if (question.nextQuestions && question.nextQuestions.length > 0) {
                setCurrentQuestions(question.nextQuestions.slice(0, 10));
            }
        }, 1000);
    };

    const handleAnyOtherQuestion = () => {
        setShowPopup(true);
        setTimeout(() => {
            onNavigate('contact');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col font-sans relative">
            <Header onNavigate={onNavigate} currentPage="chatbot" onBack={onBack} />

            {showPopup && (
                <div className="fixed top-20 right-6 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-right duration-300">
                    <p className="font-bold text-lg">Redirecting to Contact Page</p>
                    <p className="text-sm text-emerald-100 mt-1">Fill your details, our team will connect to you within 24 hours!</p>
                </div>
            )}

            <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex flex-col h-[calc(100vh-64px)]">
                <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col relative">

                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 flex items-center justify-between shadow-lg z-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-16 h-16 shrink-0 bg-white rounded-full shadow-xl flex items-center justify-center">
                                <span className="text-3xl">💎</span>
                            </div>

                            <div>
                                <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-md leading-none">Gemmy</h1>
                                <p className="text-emerald-50 text-xl font-semibold leading-tight mt-1">Your Personal College Assistant</p>
                                <p className="text-emerald-100 text-lg flex items-center gap-2 mt-1 leading-tight">
                                    <span className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse"></span>
                                    Always Online & Ready to Help
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-gradient-to-b from-slate-50 to-white scrollbar-thin scrollbar-thumb-emerald-200">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                                <div className={`flex gap-4 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${msg.sender === 'user' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'}`}>
                                        {msg.sender === 'user' ? <User size={22} /> : <Bot size={22} />}
                                    </div>
                                    <div className={`p-6 rounded-2xl text-[17px] leading-relaxed shadow-md relative ${msg.sender === 'user' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 text-slate-800 border border-blue-200 rounded-tr-md' : 'bg-gradient-to-br from-emerald-50 to-teal-50 text-slate-800 border border-emerald-200 rounded-tl-md'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="flex gap-4 max-w-[85%]">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                        <Bot size={22} />
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl rounded-tl-md shadow-md border border-emerald-200 flex gap-2.5 items-center">
                                        <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></span>
                                        <span className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-300"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-6 md:p-10 bg-gradient-to-t from-slate-50 to-white border-t border-emerald-100 shadow-[0_-10px_40px_rgba(5,150,105,0.05)] z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-5">
                                <Sparkles size={20} className="text-emerald-600" />
                                <p className="text-base text-slate-600 font-bold uppercase tracking-wider">Suggested Questions</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestions.map((qId) => {
                                    const question = ALL_QUESTIONS.find(q => q.id === qId);
                                    if (!question) return null;

                                    return (
                                        <button key={question.id} onClick={() => handleQuestionClick(question.id)} disabled={isTyping} className="group text-left text-[16px] bg-white text-slate-700 px-6 py-5 rounded-2xl hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-lg transition-all border-2 border-slate-200 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between shadow-sm">
                                            <span className="font-semibold">{question.text}</span>
                                            <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                        </button>
                                    );
                                })}

                                <button onClick={handleAnyOtherQuestion} className="group text-left text-[16px] bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-orange-400 flex items-center justify-between shadow-lg md:col-span-2">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle size={24} />
                                        <span className="font-bold text-lg">Any Other Question?</span>
                                    </div>
                                    <ChevronRight size={24} className="text-white/80 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
