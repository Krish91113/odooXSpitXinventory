import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Navbar from '../../Components/auth/dashboard/Navbar';
import MoveHistoryTable from './MoveHistoryTable';
import { moveHistoryService } from '../../services/movieHistoryService';


const MoveHistoryList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [moveHistory, setMoveHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await moveHistoryService.getAll();
        setMoveHistory(data);
      } catch (error) {
        console.error("Error fetching move history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter logic
  const filteredMoves = moveHistory.filter(move => 
    move.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (move.productId?.name && move.productId.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (move.source && move.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (move.destination && move.destination.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate Stats based on real data
  const stats = {
    total: moveHistory.length,
    in: moveHistory.filter(m => m.movementType === 'IN').length,
    out: moveHistory.filter(m => m.movementType === 'OUT').length,
    transfer: moveHistory.filter(m => m.movementType === 'TRANSFER').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Info Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">Move History Overview</p>
              <ul className="text-xs font-medium text-blue-700 space-y-1">
                <li>• Tracks all movements between locations (IN, OUT)</li>
                <li>• Automatically generated when Receipts or Deliveries are validated</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Header & Search */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Move History</h1>
          </motion.div>

          <div className="flex items-center gap-3">
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Moves" value={stats.total} icon={<MoveIcon />} color="blue" delay={0.3} />
          <StatCard label="Incoming (IN)" value={stats.in} icon={<InIcon />} color="green" delay={0.4} />
          <StatCard label="Outgoing (OUT)" value={stats.out} icon={<OutIcon />} color="red" delay={0.5} />
          <StatCard label="Transfers" value={stats.transfer} icon={<TransferIcon />} color="purple" delay={0.6} />
        </div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          {loading ? (
            <div className="text-center py-10">Loading history...</div>
          ) : viewMode === 'list' ? (
            <MoveHistoryTable moves={filteredMoves} />
          ) : (
            <KanbanView moves={filteredMoves} />
          )}
        </motion.div>

      </main>
    </div>
  );
};

// ... (Keep StatCard, KanbanView, KanbanCard components but update field names) ...
// KanbanCard field updates:
// move.reference -> same
// move.product -> move.productId?.name
// move.from -> move.source
// move.to -> move.destination
// move.type -> move.movementType

const KanbanView = ({ moves }) => {
  // Since MoveHistory doesn't have a "status", we can group by movementType or just list them
  // For Kanban, let's group by Movement Type
  const types = ['IN', 'OUT'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {types.map((type, i) => (
        <motion.div key={type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-gray-900">{type} Movements</h3>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">{moves.filter(m => m.movementType === type).length}</span>
          </div>
          <div className="space-y-3">
            {moves.filter(m => m.movementType === type).map(move => <KanbanCard key={move._id} move={move} />)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const KanbanCard = ({ move }) => {
  const typeColors = { IN: 'bg-green-100 text-green-700 border-green-300', OUT: 'bg-red-100 text-red-700 border-red-300' };
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer">
      <div className="flex justify-between mb-3">
        <span className="font-mono text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">{move.reference}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColors[move.movementType]}`}>{move.movementType}</span>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-1">{move.productId?.name || 'Unknown Product'}</p>
      <p className="text-xs text-gray-500 mb-3">{move.source} → {move.destination}</p>
      <p className="text-xs text-gray-400 pt-2 border-t border-gray-50 flex justify-between">
        <span>Qty: {move.quantity}</span>
        <span>{new Date(move.createdAt).toLocaleDateString()}</span>
      </p>
    </motion.div>
  );
};

// Icons... (Keep existing icons)
const MoveIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const InIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>;
const OutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const TransferIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>;
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

export default MoveHistoryList;