import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Navbar from '../../Components/auth/dashboard/Navbar';
import ReceiptsTable from './ReceiptTable';
import { receiptService } from '../../services/receiptService';

const ReceiptsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all receipts
  useEffect(() => {
    const loadReceipts = async () => {
      try {
        const data = await receiptService.getAll();
        setReceipts(data);
      } catch (error) {
        console.error("Error loading receipts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadReceipts();
  }, []);

  // Client-side filtering
  const filteredReceipts = receipts.filter(receipt => 
    receipt.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (receipt.receiveFrom && receipt.receiveFrom.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (receipt.status && receipt.status.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

            <div className="flex items-center gap-3">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-sm"
                />
              </div>
              {/* View Toggles (List/Kanban) */}
              <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                </button>
                <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : viewMode === 'list' ? (
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
  const statuses = ['Draft', 'Ready', 'Done', 'Cancelled'];

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
              <KanbanCard key={receipt._id} receipt={receipt} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const KanbanCard = ({ receipt }) => {
  const navigate = useNavigate();
  const statusColors = {
    Draft: 'border-gray-200',
    Ready: 'border-blue-200 bg-blue-50/30',
    Done: 'border-green-200 bg-green-50/30',
    Cancelled: 'border-red-200'
  };

  return (
    <motion.div 
      onClick={() => navigate(`/receipts/${receipt._id}`)}
      whileHover={{ y: -4 }}
      className={`bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg cursor-pointer ${statusColors[receipt.status] || 'border-gray-100'}`}
    >
      <div className="flex justify-between mb-3">
        <span className="font-bold text-sm text-gray-900">{receipt.reference}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">
          {receipt.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{receipt.receiveFrom}</p>
      <p className="text-xs text-gray-400 border-t border-gray-100 pt-2">
        {new Date(receipt.scheduleDate).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default ReceiptsList;