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
      name: "Basic Listing",
      price: "₹2,999",
      period: "/year",
      features: [
        "College profile page",
        "Basic course listing",
        "Contact form access",
        "Up to 50 enquiries/year",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      price: "₹4,999",
      period: "/year",
      features: [
        "Everything in Basic",
        "Featured college badge",
        "Unlimited enquiries",
        "Priority listing",
        "Phone + Email support",
        "Analytics dashboard (coming soon)",
      ],
      highlighted: true,
      badge: "Recommended",
    },
    {
      name: "Premium",
      price: "₹9,999",
      period: "/year",
      features: [
        "Everything in Standard",
        "Top of search results",
        "Social media promotion",
        "Dedicated account manager",
        "Custom branding options",
        "WhatsApp support",
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600">
              Choose the plan that works for your college
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${plan.highlighted
                  ? 'bg-blue-600 text-white shadow-2xl scale-105 relative'
                  : 'bg-gray-50 text-gray-900'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`mb-4 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-end justify-center mb-2">
                    <span className={`${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm mb-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-200' : 'text-green-600'
                          }`}
                      />
                      <span className={`text-sm ${plan.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
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
                  className={`w-full py-3 rounded-lg transition-colors ${plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  Apply for Listing
                </button>
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91"
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
