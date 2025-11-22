import React from 'react';

const StatsCard = ({ title, badge, lateCount, totalOps, color = 'gray', onClick }) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-700 border-gray-300',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    green: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        
        {/* Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]}`}>
          {badge}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="space-y-1">
          {lateCount !== null && (
            <p className="text-red-600 font-medium">
              <span className="text-red-500">●</span> {lateCount} Late
            </p>
          )}
          <p className="text-gray-600">
            {totalOps} operations
          </p>
        </div>
        
        {/* Arrow Icon */}
        <button 
          className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-200 flex items-center justify-center group"
          onClick={(e) => {
            if (onClick) {
              e.stopPropagation();
              onClick();
            }
          }}
        >
          <svg className="w-5 h-5 text-gray-700 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatsCard;