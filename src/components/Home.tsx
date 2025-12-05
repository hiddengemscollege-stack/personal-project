import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { Search, DollarSign, Building2, Users, Heart, ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';
import { CollegeCard } from './CollegeCard';
import { STATES, CITIES_BY_STATE, COURSES, BUDGET_RANGES } from '../data/constants';
import { COLLEGES } from '../data/colleges';

interface HomeProps {
    onNavigate: (page: Page, params?: any) => void;
    onSelectCollege?: (id: number) => void;
}

const featuredColleges = COLLEGES.slice(0, 3);

const testimonials = [
    {
        name: "Priya Sharma",
        course: "B.Tech CSE, 2nd Year",
        text: "Bade colleges me admission nahi hua to laga career khatam. But yaha mujhe wo guidance mili jo shayad waha bhi nahi milti. Teachers actually care karte hain.",
    },
    {
        name: "Rahul Patel",
        course: "BCA, 3rd Year",
        text: "Fees kam thi to doubt tha, but labs aur facilities dekh ke surprise hua. Practical learning pe focus hai, jo job ke liye zaroori hai.",
    },
    {
        name: "Anjali Singh",
        course: "B.Com, 1st Year",
        text: "Parents fees ko leke pareshan the. HiddenGems ne budget me best college dhundne me help ki. Ab main confident feel karti hu.",
    },
];

const faqs = [
    {
        question: "Are these colleges recognized?",
        answer: "Yes, absolutely. We only list colleges that are approved by relevant authorities like UGC, AICTE, etc. We verify their accreditation status before listing them."
    },
    {
        question: "How do I apply to these colleges?",
        answer: "It's simple! Just click on 'Enquire' for any college you like. Fill in your details, and our team or the college representative will contact you directly to guide you through the admission process."
    },
    {
        question: "Is there a fee to use this website?",
        answer: "No, HiddenGems is completely free for students. Our mission is to help you find the right college without any hidden costs."
    },
    {
        question: "Can I get a scholarship?",
        answer: "Many of our listed colleges offer scholarships based on merit or financial need. You can ask about specific scholarship opportunities when you enquire."
    }
];

export function Home({ onNavigate, onSelectCollege }: HomeProps) {
    const [searchFilters, setSearchFilters] = useState({
        state: '',
        city: '',
        course: '',
        budget: '',
    });
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleSearch = () => {
        onNavigate('search', searchFilters);
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const availableCities = searchFilters.state ? CITIES_BY_STATE[searchFilters.state] || [] : [];

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header onNavigate={onNavigate} currentPage="home" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 md:py-32 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 z-0"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8 shadow-lg animate-fade-in-up">
                            <span className="text-white/95 text-sm font-semibold tracking-wide">🎓 Discover Your Perfect College Match</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-sm">
                            Find colleges that <span className="text-yellow-300 relative inline-block">
                                believe in you,

                            </span>
                            <br className="block" />
                            <span className="block mt-2">not just your rank.</span>
                        </h1>
                        <p className="text-blue-50 text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            Find colleges that match your <span className="font-semibold text-white">goals, budget and future</span> —
                            <span className="block mt-3 opacity-90 font-normal">not someone else's rank list.</span>
                        </p>

                        {/* Enhanced Search Bar */}
                        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 md:p-8 backdrop-blur-xl border border-white/50 transform transition-all hover:scale-[1.01] duration-300">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="relative group">
                                    <select
                                        value={searchFilters.state}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchFilters({ ...searchFilters, state: e.target.value, city: '' })}
                                        className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 font-medium transition-all hover:border-blue-200 group-hover:bg-white"
                                    >
                                        <option value="">Select State</option>
                                        {STATES.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="relative group">
                                    <select
                                        value={searchFilters.city}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                                        disabled={!searchFilters.state}
                                        className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 font-medium transition-all hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed group-hover:bg-white"
                                    >
                                        <option value="">Select City</option>
                                        {availableCities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="relative group">
                                    <select
                                        value={searchFilters.course}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchFilters({ ...searchFilters, course: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 font-medium transition-all hover:border-blue-200 group-hover:bg-white"
                                    >
                                        <option value="">Select Course</option>
                                        {COURSES.map(course => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="relative group">
                                    <select
                                        value={searchFilters.budget}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSearchFilters({ ...searchFilters, budget: e.target.value })}
                                        className="w-full px-5 py-4 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 font-medium transition-all hover:border-blue-200 group-hover:bg-white"
                                    >
                                        <option value="">Budget Range</option>
                                        {BUDGET_RANGES.map(range => (
                                            <option key={range.value} value={range.value}>{range.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-bold transform active:scale-95"
                                >
                                    <Search size={22} />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Stats Bar */}
            <section className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-6">
                    <div className="text-center border-r border-gray-100 last:border-0">
                        <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                        <div className="text-sm text-gray-600 font-medium">Verified Colleges</div>
                    </div>
                    <div className="text-center border-r border-gray-100 last:border-0">
                        <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                        <div className="text-sm text-gray-600 font-medium">Courses Listed</div>
                    </div>
                    <div className="text-center border-r border-gray-100 last:border-0">
                        <div className="text-3xl font-bold text-blue-600 mb-1">Zero</div>
                        <div className="text-sm text-gray-600 font-medium">Hidden Fees</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
                        <div className="text-sm text-gray-600 font-medium">Student Support</div>
                    </div>
                </div>
            </section>

            {/* Why Only Underrated Colleges */}
            <section className="py-16 md:py-28 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Why Choose Us
                        </div>
                        <h2 className="text-gray-900 mb-6 text-3xl md:text-4xl font-bold">Why only underrated colleges?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Not everyone gets into top-tier colleges. But that doesn't mean you should settle for less than you deserve.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                <DollarSign size={36} className="text-white" />
                            </div>
                            <h3 className="text-gray-900 mb-3 font-bold text-xl">Affordable Fees</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Quality education without breaking your family's budget.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30 group-hover:scale-110 transition-transform">
                                <Building2 size={36} className="text-white" />
                            </div>
                            <h3 className="text-gray-900 mb-3 font-bold text-xl">Good Facilities</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Modern labs, libraries, and infrastructure that support learning.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-amber-50 to-yellow-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-amber-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform">
                                <Users size={36} className="text-white" />
                            </div>
                            <h3 className="text-gray-900 mb-3 font-bold text-xl">Less Competition</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Better chances of admission and more individual attention.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-purple-50 to-violet-100 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-200">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                <Heart size={36} className="text-white" />
                            </div>
                            <h3 className="text-gray-900 mb-3 font-bold text-xl">Genuine Support</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Colleges that truly care about student success and growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Colleges */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-gray-900 mb-4 text-3xl font-bold">Top underrated picks of the week</h2>
                        <p className="text-gray-600 text-lg">
                            Hand-picked colleges that deserve your attention
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredColleges.map((college) => (
                            <CollegeCard
                                key={college.id}
                                college={college}
                                onViewDetails={() => {
                                    if (onSelectCollege) onSelectCollege(college.id);
                                    onNavigate('college-detail');
                                }}
                                onEnquire={() => {
                                    if (onSelectCollege) onSelectCollege(college.id);
                                    onNavigate('college-detail');
                                }}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                        >
                            <span>View All Colleges</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-16 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Simple Process
                        </div>
                        <h2 className="text-gray-900 mb-6 text-3xl font-bold">How It Works</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Simple, transparent, and student-first
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connector Line - Desktop Only */}
                        <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-1 bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200"></div>

                        <div className="relative text-center group">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30 relative z-10 transition-transform group-hover:scale-110">
                                <span className="text-white text-3xl font-bold">1</span>
                            </div>
                            <h3 className="text-gray-900 mb-4 font-bold text-xl">Search</h3>
                            <p className="text-gray-600 leading-relaxed px-4">
                                Browse colleges by location, course, and budget. All verified listings.
                            </p>
                        </div>

                        <div className="relative text-center group">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30 relative z-10 transition-transform group-hover:scale-110">
                                <span className="text-white text-3xl font-bold">2</span>
                            </div>
                            <h3 className="text-gray-900 mb-4 font-bold text-xl">Shortlist</h3>
                            <p className="text-gray-600 leading-relaxed px-4">
                                Compare facilities, fees, and courses. Find colleges that match your needs.
                            </p>
                        </div>

                        <div className="relative text-center group">
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/30 relative z-10 transition-transform group-hover:scale-110">
                                <span className="text-white text-3xl font-bold">3</span>
                            </div>
                            <h3 className="text-gray-900 mb-4 font-bold text-xl">Enquire</h3>
                            <p className="text-gray-600 leading-relaxed px-4">
                                Submit your details. We'll connect you with the college within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Student Success
                        </div>
                        <h2 className="text-gray-900 mb-6 text-3xl font-bold">What students say</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Real stories from students who found their path
                        </p>
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>

                            <div className="mb-6 relative z-10">
                                <svg className="w-12 h-12 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h8V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h8V14h-4c0-1.1.9-2 2-2V8z" />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-lg md:text-xl mb-8 italic leading-relaxed relative z-10">
                                "{testimonials[currentTestimonial].text}"
                            </p>
                            <div className="flex items-center space-x-4 relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-blue-50">
                                    {testimonials[currentTestimonial].name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                                    <div className="text-gray-600 font-medium text-sm">{testimonials[currentTestimonial].course}</div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 border border-gray-100 text-gray-700 hover:text-blue-600"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110 border border-gray-100 text-gray-700 hover:text-blue-600"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots */}
                        <div className="flex justify-center space-x-3 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-gray-900 mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Got questions? We've got answers.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-blue-200 hover:shadow-md">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                                >
                                    <span className="font-semibold text-gray-900">{faq.question}</span>
                                    {openFaqIndex === index ? (
                                        <Minus size={20} className="text-blue-600 flex-shrink-0" />
                                    ) : (
                                        <Plus size={20} className="text-gray-400 flex-shrink-0" />
                                    )}
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed bg-gray-50/50">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-white mb-6 leading-tight text-4xl md:text-5xl font-bold">
                        Ready to find your college?
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Start exploring colleges that value you for who you are, not just your marks.
                    </p>
                    <button
                        onClick={handleSearch}
                        className="bg-white text-blue-600 px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 font-bold text-lg inline-flex items-center space-x-2"
                    >
                        <span>Find Colleges Now</span>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </section>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}
