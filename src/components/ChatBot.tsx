import { useState, useRef, useEffect } from 'react';
import { X, Bot, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const PRESET_QUESTIONS = [
    {
        id: 1,
        text: "How do I find the best college?",
        answer: "You can use our 'Find Colleges' page to filter by state, city, course, and budget. We only list verified, high-quality colleges!"
    },
    {
        id: 2,
        text: "Are these colleges verified?",
        answer: "Yes, absolutely! Every college listed on HiddenGems is verified for facilities, faculty, and genuine student reviews."
    },
    {
        id: 3,
        text: "What is the fee structure?",
        answer: "Fees vary by college and course. You can see the 'Starting from' fees on each college card. Click 'Enquire' to get the detailed fee breakdown."
    },
    {
        id: 4,
        text: "How can I contact a college?",
        answer: "Simply click the 'Enquire' button on any college profile. We'll connect you directly with their admission team within 24 hours."
    },
    {
        id: 5,
        text: "Is this service free?",
        answer: "Yes! HiddenGems is 100% free for students. We want to help you find your dream college without any cost."
    }
];

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, text: "Hi! I'm Gemmy 💎. I can help you find your dream college. Tap a question below to get started!", sender: 'bot' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleQuestionClick = (questionText: string, answer: string) => {
        // Add user message
        const userMsgId = Date.now();
        setMessages(prev => [...prev, { id: userMsgId, text: questionText, sender: 'user' }]);
        setIsTyping(true);

        // Simulate bot delay
        setTimeout(() => {
            const botMsgId = Date.now() + 1;
            setMessages(prev => [...prev, { id: botMsgId, text: answer, sender: 'bot' }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Trigger Button - New Vibrant Gradient & Larger */}
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-white/30"
            >
                <div className="relative">
                    <MessageSquare size={22} className="text-white group-hover:-rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-purple-600"></span>
                    </span>
                </div>
                <span className="font-bold tracking-wide text-base">Ask Gemmy</span>
            </button>

            {/* Chat Window - Significantly Larger & Better Animation */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-[450px] md:w-[500px] max-w-[calc(100vw-2rem)] h-[700px] max-h-[85vh] bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 font-sans ring-1 ring-black/5">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 flex justify-between items-center text-white shadow-lg relative overflow-hidden shrink-0">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                                <Bot size={32} className="text-white drop-shadow-md" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-2xl tracking-tight">Gemmy AI</h3>
                                <p className="text-indigo-100 text-sm font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                                    Always here to help
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-10"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 scrollbar-thin scrollbar-thumb-gray-200">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                            >
                                <div
                                    className={`max-w-[85%] p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm relative ${msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start animate-in fade-in duration-200">
                                <div className="bg-white p-5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex gap-2 items-center">
                                    <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></span>
                                    <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area (Automated Chips) */}
                    <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-5px_30px_rgba(0,0,0,0.03)] shrink-0">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={16} className="text-purple-500" />
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Suggested Questions</p>
                        </div>
                        <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-100">
                            {PRESET_QUESTIONS.map((q) => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuestionClick(q.text, q.answer)}
                                    disabled={isTyping}
                                    className="group w-full text-left text-[15px] bg-gray-50 text-gray-700 px-5 py-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md transition-all border border-gray-100 hover:border-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                                >
                                    <span className="font-medium">{q.text}</span>
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
