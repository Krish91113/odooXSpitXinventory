import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/auth/dashboard/Navbar';
import ReceiptsTable from './ReceiptTable';
import { motion } from 'framer-motion';

const ReceiptsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); 
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data
  const receipts = [
    { id: 1, reference: 'WH/IN/0001', from: 'Vendor', to: 'WH/Stock1', contact: 'Azure Interior', scheduleDate: '2024-01-15', status: 'Ready' },
    { id: 2, reference: 'WH/IN/0002', from: 'Vendor', to: 'WH/Stock1', contact: 'Azure Interior', scheduleDate: '2024-01-16', status: 'Ready' },
    { id: 3, reference: 'WH/IN/0003', from: 'Supplier Co', to: 'WH/Stock2', contact: 'Modern Furniture', scheduleDate: '2024-01-17', status: 'Waiting' },
    { id: 4, reference: 'WH/IN/0004', from: 'Import Ltd', to: 'WH/Stock1', contact: 'Elite Designs', scheduleDate: '2024-01-18', status: 'Draft' },
    { id: 5, reference: 'WH/IN/0005', from: 'Vendor', to: 'WH/Stock3', contact: 'Prime Interiors', scheduleDate: '2024-01-19', status: 'Done' }
  ];

  const filteredReceipts = receipts.filter(receipt => 
    receipt.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Left Side - Title & New Button */}
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/receipts/new')}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                NEW
              </motion.button>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Receipts</h1>
            </div>

            {/* Right Side - Search & View Toggles */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent shadow-sm transition-all duration-300 group-hover:shadow-md"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'kanban' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p className="text-gray-500 mt-2 font-light ml-1">Manage incoming receipts and track vendor deliveries</p>
        </motion.div>

        {/* Reference Format Info Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-900 mb-1">Auto-Generated Reference Format</h3>
              <p className="text-sm text-blue-800 mb-2 font-medium">
                Example: <code className="bg-white px-2 py-1 rounded border border-blue-200 font-mono text-xs text-blue-700">WH/IN/0001</code>
              </p>
              <ul className="text-xs text-blue-600 space-y-1 font-medium">
                <li>• <span className="font-bold">WH</span> = Warehouse ID</li>
                <li>• <span className="font-bold">IN</span> = Operation (IN for receipts, OUT for deliveries)</li>
                <li>• <span className="font-bold">0001</span> = Auto-increment unique ID</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {viewMode === 'list' ? (
            <ReceiptsTable receipts={filteredReceipts} />
          ) : (
            <KanbanView receipts={filteredReceipts} />
          )}
        </motion.div>

      </main>
    </div>
  );
};

// Kanban View Component
const KanbanView = ({ receipts }) => {
  const statuses = ['Draft', 'Waiting', 'Ready', 'Done'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statuses.map((status, index) => (
        <motion.div 
          key={status} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">{status}</h3>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {receipts.filter(r => r.status === status).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {receipts.filter(r => r.status === status).map(receipt => (
              <KanbanCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const KanbanCard = ({ receipt }) => {
  const statusColors = {
    Draft: 'bg-gray-100 text-gray-600 border-gray-200',
    Waiting: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Ready: 'bg-blue-50 text-blue-700 border-blue-200',
    Done: 'bg-green-50 text-green-700 border-green-200'
  };

  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{receipt.reference}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[receipt.status]}`}>
          {receipt.status}
        </span>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-1">{receipt.contact}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <span>{receipt.from}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        <span>{receipt.to}</span>
      </div>
      <p className="text-xs text-gray-400 border-t border-gray-100 pt-2 mt-2">{receipt.scheduleDate}</p>
    </motion.div>
  );
};

export default ReceiptsList;