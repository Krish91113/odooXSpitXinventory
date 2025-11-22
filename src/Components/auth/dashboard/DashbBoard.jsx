import React from 'react';
import Navbar from './Navbar';
import KPISection from './KPISection';
import StatsCard from './StatsCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor current statistics and operations</p>
        </div>

        {/* KPI Overview */}
        <KPISection />

        {/* Operation Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Operations Overview</h2>
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

            <StatsCard 
              title="Adjustment"
              badge="2 pending"
              lateCount={null}
              totalOps={3}
              color="green"
              onClick={() => navigate('/adjustment')}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem 
              user="Amazing Viper"
              action="created a Receipt"
              time="2 minutes ago"
              type="receipt"
            />
            <ActivityItem 
              user="Incomparable Walrus"
              action="validated Delivery #1024"
              time="15 minutes ago"
              type="delivery"
            />
            <ActivityItem 
              user="Swift Barracuda"
              action="adjusted Stock for SKU-4421"
              time="1 hour ago"
              type="adjustment"
            />
            <ActivityItem 
              user="Modern Mantis"
              action="transferred 50 units to Warehouse B"
              time="3 hours ago"
              type="transfer"
            />
            <ActivityItem 
              user="Blissful Capybara"
              action="marked Receipt #2041 as done"
              time="5 hours ago"
              type="receipt"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ user, action, time, type }) => {
  const typeColors = {
    receipt: 'bg-blue-500',
    delivery: 'bg-orange-500',
    adjustment: 'bg-green-500',
    transfer: 'bg-purple-500',
  };

  return (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
      <div className={`h-2 w-2 rounded-full ${typeColors[type]}`}></div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{user}</span>{' '}
          <span className="text-gray-600">{action}</span>
        </p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;