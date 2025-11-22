import React from 'react';
import Navbar from './Navbar';
import KPISection from './KPISection';
import StatsCard from './StatsCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2 font-light">
            Monitor your inventory operations in real-time
          </p>
        </motion.div>

        {/* KPI Overview */}
        <KPISection />

        {/* Operation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Operations Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <StatsCard 
              title="Receipt"
              badge="4 to receive"
              lateCount={1}
              totalOps={6}
              color="blue"
              onClick={() => navigate('/receipts')}
            />

            <StatsCard 
              title="Delivery"
              badge="4 to Deliver"
              lateCount={2}
              totalOps={6}
              color="orange"
              onClick={() => navigate('/delivery')}
            />

            {/* <StatsCard 
              title="Adjustment"
              badge="2 pending"
              lateCount={null}
              totalOps={3}
              color="green"
              onClick={() => navigate('/adjustment')}
            /> */}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-gray-900 rounded-full"></span>
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {[
              { user: "Amazing Viper", action: "created a Receipt", time: "2 minutes ago", type: "receipt" },
              { user: "Incomparable Walrus", action: "validated Delivery #1024", time: "15 minutes ago", type: "delivery" },
              { user: "Swift Barracuda", action: "adjusted Stock for SKU-4421", time: "1 hour ago", type: "adjustment" },
              { user: "Modern Mantis", action: "transferred 50 units to Warehouse B", time: "3 hours ago", type: "transfer" },
              { user: "Blissful Capybara", action: "marked Receipt #2041 as done", time: "5 hours ago", type: "receipt" },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`h-3 w-3 rounded-full ${
                  activity.type === 'receipt' ? 'bg-blue-500' :
                  activity.type === 'delivery' ? 'bg-orange-500' :
                  activity.type === 'adjustment' ? 'bg-green-500' :
                  'bg-purple-500'
                } animate-pulse`}></div>
                
                <div className="flex-1">
                  <p className="text-base text-gray-900">
                    <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition">
                      {activity.user}
                    </span>
                    <span className="text-gray-600"> {activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-500 font-light">{activity.time}</p>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;