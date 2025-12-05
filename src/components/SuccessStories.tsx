import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { Quote, Star } from 'lucide-react';

interface SuccessStoriesProps {
    onNavigate: (page: Page) => void;
    onBack?: () => void;
}

export function SuccessStories({ onNavigate, onBack }: SuccessStoriesProps) {
    const stories = [
        {
            name: "Rahul Sharma",
            quote: "Starting me lga tha ki tier-3 college se hu to placement nhi hoga. But yha ki faculty ne bohot support kiya. Aaj main ek achi MNC me hu aur khush hu."
        },
        {
            name: "Priya Patel",
            quote: "College ka infrastructure decent hai, but padhai achi hai. Agar tum mehnat karoge to opportunities ki kami nahi hai."
        },
        {
            name: "Amit Kumar",
            quote: "Fees kam hai isliye choose kiya tha, but education quality me koi compromise nahi mila. Best ROI college hai ye."
        },
        {
            name: "Sneha Gupta",
            quote: "Placement cell waale bohot active hain. Unhone hume interview ke liye acche se prepare kiya. I got placed in a top MNC."
        },
        {
            name: "Vikram Singh",
            quote: "Yaha ke labs aur practicals bohot helpful the. Sirf theory nahi, practical knowledge pe bhi focus karte hain."
        },
        {
            name: "Anjali Desai",
            quote: "Mera experience accha raha. Teachers supportive hain aur environment bhi padhai ke liye accha hai. MBA ke liye good option hai."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onNavigate={onNavigate} currentPage="home" onBack={onBack} />

            {/* Hero Section */}
            <div className="bg-blue-600 py-20 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                            <Star className="text-yellow-300 w-8 h-8 fill-yellow-300" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Student Stories</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Real experiences from students who found their path through HiddenGems.
                    </p>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group">
                            <div className="p-8 flex-1">
                                <div className="flex items-start justify-between mb-6">
                                    <Quote className="text-blue-100 w-10 h-10 transform rotate-180" />
                                    <div className="flex space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">
                                    "{story.quote}"
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 border-t border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md mr-4">
                                        {story.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
