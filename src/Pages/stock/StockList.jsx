import React, { useState } from 'react';

import StockTable from './StockTable';
import Navbar from '../../Components/auth/dashboard/Navbar';


const StockList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Stock Data
  const stockData = [
    {
      id: 1,
      product: 'Desk',
      sku: 'DESK-001',
      category: 'Furniture',
      perUnitCost: 3000,
      onHand: 50,
      freeToUse: 45,
      warehouse: 'WH/Stock1',
      lastUpdated: '2024-01-20'
    },
    {
      id: 2,
      product: 'Table',
      sku: 'TBL-001',
      category: 'Furniture',
      perUnitCost: 3000,
      onHand: 50,
      freeToUse: 50,
      warehouse: 'WH/Stock1',
      lastUpdated: '2024-01-20'
    },
    {
      id: 3,
      product: 'Office Chair',
      sku: 'CHR-001',
      category: 'Furniture',
      perUnitCost: 1500,
      onHand: 120,
      freeToUse: 100,
      warehouse: 'WH/Stock2',
      lastUpdated: '2024-01-19'
    },
    {
      id: 4,
      product: 'Monitor Stand',
      sku: 'MNT-001',
      category: 'Accessories',
      perUnitCost: 800,
      onHand: 30,
      freeToUse: 25,
      warehouse: 'WH/Stock1',
      lastUpdated: '2024-01-18'
    },
    {
      id: 5,
      product: 'Filing Cabinet',
      sku: 'CAB-001',
      category: 'Storage',
      perUnitCost: 4500,
      onHand: 15,
      freeToUse: 12,
      warehouse: 'WH/Stock3',
      lastUpdated: '2024-01-17'
    }
  ];

  // Filter stock based on search
  const filteredStock = stockData.filter(item => 
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Info Banner */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">
                This page contains the warehouse details & location.
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Users can update stock quantities directly from this interface.
              </p>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Left Side - Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stock</h1>
              <p className="text-gray-600 mt-1">View and manage inventory across all warehouses</p>
            </div>

            {/* Right Side - Search & Actions */}
            <div className="flex items-center gap-3">
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stock Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Total Products"
            value={stockData.length}
            icon={<BoxIcon />}
            color="blue"
          />
          <StatCard 
            label="Total Stock Value"
            value={`₹${(stockData.reduce((sum, item) => sum + (item.perUnitCost * item.onHand), 0)).toLocaleString()}`}
            icon={<CurrencyIcon />}
            color="green"
          />
          <StatCard 
            label="Total On Hand"
            value={stockData.reduce((sum, item) => sum + item.onHand, 0)}
            icon={<WarehouseIcon />}
            color="purple"
          />
          <StatCard 
            label="Free to Use"
            value={stockData.reduce((sum, item) => sum + item.freeToUse, 0)}
            icon={<CheckIcon />}
            color="orange"
          />
        </div>

        {/* Stock Table */}
        <StockTable stock={filteredStock} />

        {/* Bottom Note */}
        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-green-800">
              <span className="font-semibold">Note:</span> Users can update stock quantities directly from this page. Click on any row to edit.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div className={`h-10 w-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-3">{value}</h3>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
};

// Icons
const BoxIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WarehouseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default StockList;