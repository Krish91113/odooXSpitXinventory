import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StockTable from './StockTable';
import Navbar from '../../Components/auth/dashboard/Navbar';

const StockList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Stock Data
  const stockData = [
    { id: 1, product: 'Desk', sku: 'DESK-001', category: 'Furniture', perUnitCost: 3000, onHand: 50, freeToUse: 45, warehouse: 'WH/Stock1', lastUpdated: '2024-01-20' },
    { id: 2, product: 'Table', sku: 'TBL-001', category: 'Furniture', perUnitCost: 3000, onHand: 50, freeToUse: 50, warehouse: 'WH/Stock1', lastUpdated: '2024-01-20' },
    { id: 3, product: 'Office Chair', sku: 'CHR-001', category: 'Furniture', perUnitCost: 1500, onHand: 120, freeToUse: 100, warehouse: 'WH/Stock2', lastUpdated: '2024-01-19' },
    { id: 4, product: 'Monitor Stand', sku: 'MNT-001', category: 'Accessories', perUnitCost: 800, onHand: 30, freeToUse: 25, warehouse: 'WH/Stock1', lastUpdated: '2024-01-18' },
    { id: 5, product: 'Filing Cabinet', sku: 'CAB-001', category: 'Storage', perUnitCost: 4500, onHand: 15, freeToUse: 12, warehouse: 'WH/Stock3', lastUpdated: '2024-01-17' }
  ];

  const filteredStock = stockData.filter(item => 
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Info Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">Warehouse Details & Locations</p>
              <p className="text-xs font-medium text-blue-700">
                Update stock quantities directly by clicking the edit icon in the table below.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Stock</h1>
            <p className="text-gray-500 mt-2 font-light">Manage inventory across all warehouses</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent shadow-sm transition-all duration-300 group-hover:shadow-md"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Products" value={stockData.length} icon={<BoxIcon />} color="blue" delay={0.3} />
          <StatCard label="Total Stock Value" value={`₹${(stockData.reduce((sum, item) => sum + (item.perUnitCost * item.onHand), 0)).toLocaleString()}`} icon={<CurrencyIcon />} color="green" delay={0.4} />
          <StatCard label="Total On Hand" value={stockData.reduce((sum, item) => sum + item.onHand, 0)} icon={<WarehouseIcon />} color="purple" delay={0.5} />
          <StatCard label="Free to Use" value={stockData.reduce((sum, item) => sum + item.freeToUse, 0)} icon={<CheckIcon />} color="orange" delay={0.6} />
        </div>

        {/* Stock Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StockTable stock={filteredStock} />
        </motion.div>

        {/* Bottom Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex items-center gap-3 bg-green-50/50 border border-green-100 p-4 rounded-xl text-green-700 text-sm font-medium"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Note: You can edit stock quantities directly in the table.</span>
        </motion.div>

      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, delay }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${colors[color]} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-black text-gray-900 mt-4 mb-1 tracking-tight">{value}</h3>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
    </motion.div>
  );
};

// Icons
const BoxIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const CurrencyIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const WarehouseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CheckIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default StockList;