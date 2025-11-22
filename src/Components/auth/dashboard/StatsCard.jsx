import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, badge, lateCount, totalOps, color = 'gray', onClick }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600',
  };

  const bgColor = colorClasses[color] || 'from-gray-500 to-gray-600';

  return (
    <motion.div
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-gray-900 group-hover:text-gray-800 transition">
            {title}
          </h3>
          
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="p-3 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${bgColor} shadow-lg`}>
                {badge}
              </span>
            </div>
            
            {lateCount !== null && (
              <p className="text-red-600 font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">●</span> {lateCount} Late
              </p>
            )}
            <p className="text-gray-600 text-sm mt-2 font-medium">
              {totalOps} operations
            </p>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-900 opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl"></div>
    </motion.div>
  );
};

export default StatsCard;