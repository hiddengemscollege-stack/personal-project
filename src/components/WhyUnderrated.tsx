import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { TrendingUp, Wallet, Users, Award, Briefcase, CheckCircle2 } from 'lucide-react';

interface WhyUnderratedProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function WhyUnderrated({ onNavigate, onBack }: WhyUnderratedProps) {
    const benefits = [
        {
            icon: Wallet,
            title: "Affordable Excellence",
            description: "Get the same quality of education as top-tier institutes at a fraction of the cost. Save money without compromising on your future.",
            color: "green"
        },
        {
            icon: Users,
            title: "Personalized Attention",
            description: "Smaller batch sizes mean more interaction with professors. You're not just a roll number here; you're a future leader.",
            color: "blue"
        },
        {
            icon: Briefcase,
            title: "Better Placement ROI",
            description: "With lower fees and competitive placement packages, your Return on Investment (ROI) is often significantly higher than expensive private universities.",
            color: "purple"
        },
        {
            icon: TrendingUp,
            title: "Rapid Growth",
            description: "These colleges are hungry for success. They put in extra effort to train students and build industry connections to improve their rankings.",
            color: "orange"
        },
        {
            icon: Award,
            title: "Practical Focus",
            description: "Many underrated colleges focus heavily on practical skills and industry readiness rather than just theoretical knowledge.",
            color: "red"
        },
        {
            icon: CheckCircle2,
            title: "Less Competition",
            description: "Stand out easily. With fewer students fighting for the same opportunities, you have a better chance at leadership roles and campus placements.",
            color: "teal"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onNavigate={onNavigate} currentPage="home" onBack={onBack} />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4 border border-blue-500/30">
                        Uncover the Truth
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Why Choose an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Underrated</span> College?
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Rankings aren't everything. Discover the hidden advantages of joining a growing institution that values your potential.
                    </p>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
                                <div className={`w-12 h-12 rounded-xl bg-${benefit.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={24} className={`text-${benefit.color}-600`} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>



            <Footer onNavigate={onNavigate} />
        </div>
    );
}
