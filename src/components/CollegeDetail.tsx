import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../types';
import { MapPin, GraduationCap, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { COLLEGE_DETAILS } from '../data/collegeDetails';
import { trackEvent } from '../lib/analytics';
import { useAuth } from '../context/AuthContext';

interface CollegeDetailProps {
  onNavigate: (page: Page) => void;
  collegeId: number;
  onBack?: () => void;
}

export function CollegeDetail({ onNavigate, onBack, collegeId }: CollegeDetailProps) {
  const { logSessionActivity } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'facilities' | 'placements'>('overview');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    percentage: '',
    course: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const collegeData = COLLEGE_DETAILS[collegeId];

  useEffect(() => {
    if (collegeData) {
      trackEvent('view_college', {
        college_id: collegeId,
        college_name: collegeData.name
      });
    }
  }, [collegeId, collegeData]);

  if (!collegeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header onNavigate={onNavigate} currentPage="search" onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">College Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the details for this college.</p>
          <button
            onClick={onBack || (() => onNavigate('search'))}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

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
        .from('student_enquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            percentage: formData.percentage,
            course: formData.course,
            source: 'college_detail',
            message: `Enquiry for ${collegeData.name}`
          }
        ]);

      if (error) throw error;

      // Log activity if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Master Log
        await supabase.from('user_activity').insert({
          user_id: user.id,
          action_type: 'submit_enquiry',
          details: {
            college_id: collegeId,
            college_name: collegeData.name,
            course: formData.course
          }
        });

        // Session Log
        await logSessionActivity({
          type: 'submit_enquiry',
          college_name: collegeData.name,
          course: formData.course
        });
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          percentage: '',
          course: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} currentPage="search" onBack={onBack} />

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white mb-2">{collegeData.name}</h1>
          <div className="flex items-center text-blue-100 mb-3">
            <MapPin size={18} className="mr-2" />
            <span>{collegeData.city}, {collegeData.state}</span>
          </div>
          <p className="text-blue-100">{collegeData.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 whitespace-nowrap transition-colors ${activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className={`px-6 py-4 whitespace-nowrap transition-colors ${activeTab === 'courses'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Courses & Fees
                  </button>
                  <button
                    onClick={() => setActiveTab('facilities')}
                    className={`px-6 py-4 whitespace-nowrap transition-colors ${activeTab === 'facilities'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Facilities
                  </button>
                  <button
                    onClick={() => setActiveTab('placements')}
                    className={`px-6 py-4 whitespace-nowrap transition-colors ${activeTab === 'placements'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    Placements
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-gray-900 mb-4">About College</h2>
                      <p className="text-gray-700 leading-relaxed">
                        {collegeData.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-gray-900 mb-4">Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {collegeData.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                  <div>
                    <h2 className="text-gray-900 mb-6">Available Courses</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-gray-700">Course Name</th>
                            <th className="px-4 py-3 text-left text-gray-700">Duration</th>
                            <th className="px-4 py-3 text-left text-gray-700">Annual Fees</th>
                            <th className="px-4 py-3 text-left text-gray-700">Seats</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {collegeData.courses.map((course, index) => (
                            <tr key={index}>
                              <td className="px-4 py-4 text-gray-900">{course.name}</td>
                              <td className="px-4 py-4 text-gray-700">{course.duration}</td>
                              <td className="px-4 py-4 text-blue-600">{course.fees}</td>
                              <td className="px-4 py-4 text-gray-700">{course.seats}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Facilities Tab */}
                {activeTab === 'facilities' && (
                  <div>
                    <h2 className="text-gray-900 mb-6">Campus Facilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {collegeData.facilities.map((facility, index) => {
                        const Icon = facility.icon;
                        return (
                          <div key={index} className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${facility.available ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                              <Icon size={28} className={facility.available ? 'text-green-600' : 'text-gray-400'} />
                            </div>
                            <div className="text-gray-900 text-sm">{facility.name}</div>
                            <div className={`text-xs mt-1 ${facility.available ? 'text-green-600' : 'text-gray-500'}`}>
                              {facility.available ? 'Available' : 'Not Available'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Placements Tab */}
                {activeTab === 'placements' && (
                  <div className="space-y-6">
                    <h2 className="text-gray-900 mb-6">Placement Statistics</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                        <div className="text-gray-600 mb-2 font-medium">Placement Percentage</div>
                        <div className="text-blue-700 text-2xl font-bold">{collegeData.placements.percentage}</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6">
                        <div className="text-gray-600 mb-2 font-medium">Average Package</div>
                        <div className="text-green-700 text-2xl font-bold">{collegeData.placements.averagePackage}</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-100 border border-purple-200 rounded-xl p-6">
                        <div className="text-gray-600 mb-2 font-medium">Highest Package</div>
                        <div className="text-purple-700 text-2xl font-bold">{collegeData.placements.highestPackage}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-900 mb-4">Recruiting Companies</h3>
                      <div className="flex flex-wrap gap-3">
                        {collegeData.placements.companies.map((company, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Enquiry Form */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="text-blue-600" size={24} />
                <h2 className="text-gray-900">Request Information</h2>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-600 text-4xl mb-3">✓</div>
                  <h3 className="text-green-900 mb-2">Thank you!</h3>
                  <p className="text-green-700 text-sm">
                    Your enquiry has been submitted. Our team will connect you with the college within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, phone: val });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">Class 12 Percentage</label>
                    <input
                      type="text"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 65%"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-sm">Interested Course *</label>
                    <select
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a course</option>
                      {collegeData.courses.map((course, index) => (
                        <option key={index} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Request Info
                  </button>

                  <p className="text-gray-500 text-xs text-center">
                    Leads will be manually connected by our team within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
