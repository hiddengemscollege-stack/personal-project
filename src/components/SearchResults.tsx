import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page, SearchParams } from '../types';
import { CollegeCard } from './CollegeCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { STATES, CITIES_BY_STATE, COURSES } from '../data/constants';
import { COLLEGES } from '../data/colleges';
import { trackEvent } from '../lib/analytics';

interface SearchResultsProps {
  onNavigate: (page: Page, params?: any) => void;
  onSelectCollege: (id: number) => void;
  initialFilters?: SearchParams;
  onBack?: () => void;
}

export function SearchResults({ onNavigate, onSelectCollege, initialFilters, onBack }: SearchResultsProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    state: initialFilters?.state || '',
    city: initialFilters?.city || '',
    minFees: 0,
    maxFees: 200000,
    courses: initialFilters?.course ? [initialFilters.course] : [] as string[],
    hostel: '',
    placement: '',
  });

  const [filters, setFilters] = useState(tempFilters);

  // Update filters if initialFilters change (though typically this component remounts)
  // Update filters if initialFilters change
  useEffect(() => {
    console.log('Initial filters received:', initialFilters);
    if (initialFilters) {
      let minFees = 0;
      let maxFees = 200000;

      if (initialFilters.budget) {
        const [min, max] = initialFilters.budget.split('-').map(Number);
        minFees = min || 0;
        maxFees = max || 200000;
      }

      const newFilters = {
        state: initialFilters.state || '',
        city: initialFilters.city || '',
        minFees,
        maxFees,
        courses: initialFilters.course ? [initialFilters.course] : [],
        hostel: '',
        placement: '',
      };
      setTempFilters(newFilters);
      setFilters(newFilters);

      trackEvent('search', {
        source: 'initial_load',
        filters: newFilters
      });
    }
  }, [initialFilters]);

  const toggleCourse = (course: string) => {
    setTempFilters(prev => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter(c => c !== course)
        : [...prev.courses, course]
    }));
  };

  const applyFilters = () => {
    console.log('Applying filters:', tempFilters);
    setFilters(tempFilters);
    setMobileFiltersOpen(false);

    trackEvent('search', {
      source: 'apply_filters',
      filters: tempFilters
    });
  };

  const clearFilters = () => {
    const resetFilters = {
      state: '',
      city: '',
      minFees: 0,
      maxFees: 200000,
      courses: [],
      hostel: '',
      placement: '',
    };
    setTempFilters(resetFilters);
    setFilters(resetFilters);
  };

  // Filter logic
  const filteredColleges = COLLEGES.filter(college => {

    if (filters.state && college.state !== filters.state) return false;
    if (filters.city && college.city !== filters.city) return false;
    if (college.feesValue > filters.maxFees) return false;
    if (college.feesValue < filters.minFees) return false;
    if (filters.courses.length > 0) {
      const hasCourse = filters.courses.some(c => college.courses.includes(c));
      if (!hasCourse) return false;
    }
    if (filters.hostel && filters.hostel !== '') {
      const wantsHostel = filters.hostel === 'yes';
      if (college.hostelAvailable !== wantsHostel) return false;
    }
    if (filters.placement && filters.placement !== '') {
      const wantsPlacement = filters.placement === 'yes';
      if (college.placementAssistance !== wantsPlacement) return false;
    }
    return true;
  });

  console.log('Filtered colleges count:', filteredColleges.length);

  const availableCities = tempFilters.state ? CITIES_BY_STATE[tempFilters.state] || [] : [];



  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} currentPage="search" onBack={onBack} />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-gray-900 mb-2">Find Your College</h1>
          <p className="text-gray-600">
            {filteredColleges.length} underrated colleges waiting to welcome you
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-3">Location</h3>
                  <select
                    value={tempFilters.state}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTempFilters({ ...tempFilters, state: e.target.value, city: '' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  >
                    <option value="">All States</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <select
                    value={tempFilters.city}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTempFilters({ ...tempFilters, city: e.target.value })}
                    disabled={!tempFilters.state}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">All Cities</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-3">Fees Range</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={tempFilters.maxFees}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, maxFees: Number(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span>₹{tempFilters.maxFees.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-3">Courses</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {COURSES.map((course) => (
                      <label key={course} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempFilters.courses.includes(course)}
                          onChange={() => toggleCourse(course)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-3">Hostel Available</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hostel-desktop"
                        value="yes"
                        checked={tempFilters.hostel === 'yes'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, hostel: e.target.value })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hostel-desktop"
                        value="no"
                        checked={tempFilters.hostel === 'no'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, hostel: e.target.value })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hostel-desktop"
                        value=""
                        checked={tempFilters.hostel === ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, hostel: e.target.value })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Any</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-900 mb-3">Placement Assistance</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="placement-desktop"
                        value="yes"
                        checked={tempFilters.placement === 'yes'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, placement: e.target.value })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="placement-desktop"
                        value="no"
                        checked={tempFilters.placement === 'no'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, placement: e.target.value })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="placement-desktop"
                        value=""
                        checked={tempFilters.placement === ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, placement: e.target.value })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Any</span>
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={applyFilters}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6 font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="w-full bg-white rounded-lg shadow-md px-4 py-3 flex items-center justify-center space-x-2 text-gray-700"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filters Modal */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X size={24} className="text-gray-700" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-900 mb-3">Location</h3>
                    <select
                      value={tempFilters.state}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTempFilters({ ...tempFilters, state: e.target.value, city: '' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    >
                      <option value="">All States</option>
                      {STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <select
                      value={tempFilters.city}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTempFilters({ ...tempFilters, city: e.target.value })}
                      disabled={!tempFilters.state}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">All Cities</option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-3">Fees Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="200000"
                        step="10000"
                        value={tempFilters.maxFees}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, maxFees: Number(e.target.value) })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>₹0</span>
                        <span>₹{tempFilters.maxFees.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-3">Courses</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {COURSES.map((course) => (
                        <label key={course} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempFilters.courses.includes(course)}
                            onChange={() => toggleCourse(course)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{course}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-3">Hostel Available</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hostel"
                          value="yes"
                          checked={tempFilters.hostel === 'yes'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, hostel: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hostel"
                          value="no"
                          checked={tempFilters.hostel === 'no'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, hostel: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hostel"
                          value=""
                          checked={tempFilters.hostel === ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, hostel: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Any</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-3">Placement Assistance</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="placement"
                          value="yes"
                          checked={tempFilters.placement === 'yes'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, placement: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="placement"
                          value="no"
                          checked={tempFilters.placement === 'no'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, placement: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="placement"
                          value=""
                          checked={tempFilters.placement === ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempFilters({ ...tempFilters, placement: e.target.value })}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Any</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={applyFilters}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onViewDetails={() => onSelectCollege(college.id)}
                  onEnquire={() => onSelectCollege(college.id)}
                />
              ))}
              {filteredColleges.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No colleges found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
