import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { Target, TrendingUp, DollarSign, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ForCollegesProps {
  onNavigate: (page: Page) => void;
  onBack?: () => void;
}

export function ForColleges({ onNavigate, onBack }: ForCollegesProps) {
  const [formData, setFormData] = useState({
    collegeName: '',
    city: '',
    contactPerson: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict 10-digit phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const { error } = await supabase
        .from('college_applications')
        .insert([
          {
            college_name: formData.collegeName,
            city: formData.city,
            contact_person: formData.contactPerson,
            phone: formData.phone,
            email: formData.email,
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          collegeName: '',
          city: '',
          contactPerson: '',
          phone: '',
          email: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const plans = [
    {
      name: "Listing + Leads",
      price: "₹1,999",
      period: "/Month",
      features: [
        "Unlimited student enquiries",
        "Verified badge",
        "WhatsApp alerts for enquiries",
      ],
      highlighted: false,
    },
    {
      name: "Featured Ranking + Leads + Spotlight",
      price: "₹3,999",
      period: "/Month",
      features: [
        "Ranking boost",
        "Top 10 visibility",
        "Spotlight badge",
        "Leads priority",
      ],
      highlighted: true,
      badge: "Recommended",
    },
    {
      name: "Premium Plan",
      price: "₹5,999",
      period: "/Month",
      features: [
        "Guaranteed leads volume",
        "Audience insights",
        "Student targeting",
        "Monthly strategy call",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} currentPage="for-colleges" onBack={onBack} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-6">
            Get more admissions without spending lakhs.
          </h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto">
            We help small private colleges grow without competing against giant brands.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why join HiddenGems?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with students who are actively looking for quality, affordable education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign size={32} className="text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Affordable yearly cost</h3>
              <p className="text-gray-600">
                No lakhs spent on billboards or newspaper ads. Get quality leads at a fraction of traditional marketing costs.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Targeted students</h3>
              <p className="text-gray-600">
                Students on our platform are specifically looking for underrated, affordable colleges. They're your ideal audience.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-yellow-600" />
              </div>
              <h3 className="text-gray-900 mb-3">Unlimited enquiries</h3>
              <p className="text-gray-600">
                No caps on student enquiries. The more students discover you, the better your admissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your growth goals. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl transition-all duration-300 ${plan.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl scale-105 z-10 ring-1 ring-white/20'
                  : 'bg-white text-gray-900 shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-gray-100'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-6 py-2 rounded-full text-sm shadow-lg tracking-wide uppercase">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <h3 className={`text-xl font-semibold mb-4 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                      <span className={`text-5xl font-bold tracking-tight ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ml-2 ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5 mb-10">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${plan.highlighted ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                          }`}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className={`text-base ${plan.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const formSection = document.getElementById('application-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg ${plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-gray-900 mb-4">Apply for Listing</h2>
              <p className="text-gray-600">
                Fill out this form and we'll get back to you within 48 hours
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-green-900 mb-3">Application Submitted!</h3>
                <p className="text-green-700">
                  Thank you for your interest. Our team will review your application and contact you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">College Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter college name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="College city"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name of contact person"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: val });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="college@email.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
