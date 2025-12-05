import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { Search, Building2, FileCheck, GraduationCap, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function HowItWorks({ onNavigate, onBack }: HowItWorksProps) {
    const steps = [
        {
            icon: Search,
            title: "Search & Discover",
            description: "Filter colleges by your preferred state, city, course, and budget. Our smart search helps you find hidden gems that match your criteria perfectly.",
            color: "blue"
        },
        {
            icon: Building2,
            title: "Compare Options",
            description: "View detailed profiles including placement stats, fees, and facilities. We provide transparent data so you can make an informed decision.",
            color: "purple"
        },
        {
            icon: FileCheck,
            title: "Apply Directly",
            description: "Fill out a simple enquiry form. We connect you directly with the college admission team - no middlemen, no hidden fees.",
            color: "green"
        },
        {
            icon: GraduationCap,
            title: "Secure Admission",
            description: "Get guidance on the admission process and secure your seat. Start your journey towards a successful career.",
            color: "orange"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onNavigate={onNavigate} currentPage="home" onBack={onBack} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Path to the Perfect College</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        We've simplified the college admission process. Here's how you can find and join your dream institution in 4 simple steps.
                    </p>
                </div>
            </div>

            {/* Steps Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={`relative z-10 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12 md:col-start-2'}`}>
                                {/* Timeline Dot */}
                                <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full items-center justify-center shadow-md">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                </div>

                                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-lg border border-gray-100 group">
                                    <div className={`w-14 h-14 rounded-xl bg-${step.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={28} className={`text-${step.color}-600`} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-4xl font-bold text-${step.color}-100`}>0{index + 1}</span>
                                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join thousands of students who have found their ideal college through HiddenGems.
                    </p>
                    <button
                        onClick={() => onNavigate('search')}
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-200"
                    >
                        Find Colleges Now
                        <ArrowRight className="ml-2" size={20} />
                    </button>
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
