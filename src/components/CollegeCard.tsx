import { MapPin, GraduationCap } from 'lucide-react';
import { useLead } from '../context/LeadContext';

interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  badge: string;
  courses: string[];
  startingFees: string;
}

interface CollegeCardProps {
  college: College;
  onViewDetails: () => void;
  onEnquire: () => void;
}

export function CollegeCard({ college, onViewDetails, onEnquire }: CollegeCardProps) {
  const { checkAccess } = useLead();

  const handleViewDetails = () => {
    checkAccess('view', onViewDetails, college.id.toString());
  };

  const handleEnquire = () => {
    checkAccess('enquire', onEnquire, college.id.toString());
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Hidden Gem':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30';
      case 'Seats Available':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30';
      case 'New':
        return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
      {/* Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-[14px] py-[4px] rounded-[30px] text-sm font-semibold ${getBadgeColor(college.badge)}`}>
          {college.badge}
        </span>
      </div>

      {/* College Name */}
      <h3 className="text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">{college.name}</h3>

      {/* Location */}
      <div className="flex items-center text-gray-600 mb-5">
        <MapPin size={18} className="mr-2 text-blue-500" />
        <span className="text-sm font-medium">{college.city}, {college.state}</span>
      </div>

      {/* Courses */}
      <div className="mb-5">
        <div className="flex items-center text-gray-700 mb-3">
          <GraduationCap size={18} className="mr-2 text-blue-500" />
          <span className="text-sm font-semibold">Top Courses:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {college.courses.map((course, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div className="mb-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100 shadow-[inset_0_0_30px_rgba(0,0,255,0.05)]">
        <span className="text-gray-600 text-sm font-medium block mb-1">Starting from</span>
        <div className="text-blue-600 font-bold text-xl">{college.startingFees}</div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={handleViewDetails}
          className="flex-1 bg-white text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-gray-300 font-semibold"
        >
          View Details
        </button>
        <button
          onClick={handleEnquire}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold"
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
