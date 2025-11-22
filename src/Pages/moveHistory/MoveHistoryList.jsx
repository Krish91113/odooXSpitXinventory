import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../Components/auth/dashboard/Navbar';
import MoveHistoryTable from './MoveHistoryTable';

const MoveHistoryList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data
  const moveHistory = [
    { id: 1, reference: 'WH/IN/0001', date: '2024-01-12', contact: 'Azure Interior', from: 'Vendor', to: 'WH/Stock1', product: 'Desk', quantity: 50, status: 'Ready', type: 'IN' },
    { id: 2, reference: 'WH/OUT/0002', date: '2024-01-12', contact: 'Azure Interior', from: 'WH/Stock1', to: 'Customer', product: 'Table', quantity: 20, status: 'Ready', type: 'OUT' },
    { id: 3, reference: 'WH/OUT/0002', date: '2024-01-12', contact: 'Azure Interior', from: 'WH/Stock1', to: 'Customer', product: 'Chair', quantity: 30, status: 'Ready', type: 'OUT' },
    { id: 4, reference: 'WH/IN/0003', date: '2024-01-15', contact: 'Modern Furniture', from: 'Supplier Co', to: 'WH/Stock2', product: 'Office Chair', quantity: 120, status: 'Done', type: 'IN' },
    { id: 5, reference: 'WH/TRANSFER/0001', date: '2024-01-16', contact: 'Internal', from: 'WH/Stock1', to: 'WH/Stock2', product: 'Monitor Stand', quantity: 15, status: 'Done', type: 'TRANSFER' },
    { id: 6, reference: 'WH/OUT/0003', date: '2024-01-17', contact: 'Elite Designs', from: 'WH/Stock2', to: 'Customer', product: 'Filing Cabinet', quantity: 8, status: 'Waiting', type: 'OUT' },
    { id: 7, reference: 'WH/IN/0004', date: '2024-01-18', contact: 'Prime Interiors', from: 'Import Ltd', to: 'WH/Stock3', product: 'Desk Lamp', quantity: 75, status: 'Draft', type: 'IN' }
  ];

  const filteredMoves = moveHistory.filter(move => 
    move.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    move.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    move.product.toLowerCase().includes(searchQuery.toLowerCase())
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">Move History Overview</p>
              <ul className="text-xs font-medium text-blue-700 space-y-1">
                <li>• Tracks all movements between locations (IN, OUT, TRANSFER)</li>
                <li>• Multiple products in one reference appear as separate rows</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Header & Search */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/movehistory/new')}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              NEW
            </motion.button>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Move History</h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="relative group w-full md:w-auto">
              <input
                type="text"
                placeholder="Search moves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-72 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-sm transition-all group-hover:shadow-md"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              </button>
              <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Moves" value={moveHistory.length} icon={<MoveIcon />} color="blue" delay={0.3} />
          <StatCard label="Incoming (IN)" value={moveHistory.filter(m => m.type === 'IN').length} icon={<InIcon />} color="green" delay={0.4} />
          <StatCard label="Outgoing (OUT)" value={moveHistory.filter(m => m.type === 'OUT').length} icon={<OutIcon />} color="red" delay={0.5} />
          <StatCard label="Transfers" value={moveHistory.filter(m => m.type === 'TRANSFER').length} icon={<TransferIcon />} color="purple" delay={0.6} />
        </div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          {viewMode === 'list' ? (
            <MoveHistoryTable moves={filteredMoves} />
          ) : (
            <KanbanView moves={filteredMoves} />
          )}
        </motion.div>

        {/* Color Legend */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.9 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-3 bg-green-50/50 border border-green-100 p-4 rounded-xl text-green-700 text-sm font-bold">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>IN moves shown with green indicator</span>
          </div>
          <div className="flex items-center gap-3 bg-red-50/50 border border-red-100 p-4 rounded-xl text-red-700 text-sm font-bold">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span>OUT moves shown with red indicator</span>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, delay }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
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
        <div className={`p-3 rounded-xl ${colors[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-black text-gray-900 mt-4 mb-1 tracking-tight">{value}</h3>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
    </motion.div>
  );
};

const KanbanView = ({ moves }) => {
  const statuses = ['Draft', 'Waiting', 'Ready', 'Done'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statuses.map((status, i) => (
        <motion.div key={status} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-gray-900">{status}</h3>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{moves.filter(m => m.status === status).length}</span>
          </div>
          <div className="space-y-3">
            {moves.filter(m => m.status === status).map(move => <KanbanCard key={move.id} move={move} />)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const KanbanCard = ({ move }) => {
  const typeColors = { IN: 'bg-green-100 text-green-700 border-green-300', OUT: 'bg-red-100 text-red-700 border-red-300', TRANSFER: 'bg-purple-100 text-purple-700 border-purple-300' };
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer">
      <div className="flex justify-between mb-3">
        <span className="font-mono text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">{move.reference}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColors[move.type]}`}>{move.type}</span>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-1">{move.product}</p>
      <p className="text-xs text-gray-500 mb-3">{move.from} → {move.to}</p>
      <p className="text-xs text-gray-400 pt-2 border-t border-gray-50 flex justify-between"><span>Qty: {move.quantity}</span><span>{move.date}</span></p>
    </motion.div>
  );
};

// Icons
const MoveIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const InIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>;
const OutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const TransferIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>;

export default MoveHistoryList;