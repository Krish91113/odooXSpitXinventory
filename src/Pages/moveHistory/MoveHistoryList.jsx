import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/auth/dashboard/Navbar';
import MoveHistoryTable from './MoveHistoryTable';


const MoveHistoryList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Move History Data
  const moveHistory = [
    {
      id: 1,
      reference: 'WH/IN/0001',
      date: '2024-01-12',
      contact: 'Azure Interior',
      from: 'Vendor',
      to: 'WH/Stock1',
      product: 'Desk',
      quantity: 50,
      status: 'Ready',
      type: 'IN'
    },
    {
      id: 2,
      reference: 'WH/OUT/0002',
      date: '2024-01-12',
      contact: 'Azure Interior',
      from: 'WH/Stock1',
      to: 'Customer',
      product: 'Table',
      quantity: 20,
      status: 'Ready',
      type: 'OUT'
    },
    {
      id: 3,
      reference: 'WH/OUT/0002',
      date: '2024-01-12',
      contact: 'Azure Interior',
      from: 'WH/Stock1',
      to: 'Customer',
      product: 'Chair',
      quantity: 30,
      status: 'Ready',
      type: 'OUT'
    },
    {
      id: 4,
      reference: 'WH/IN/0003',
      date: '2024-01-15',
      contact: 'Modern Furniture',
      from: 'Supplier Co',
      to: 'WH/Stock2',
      product: 'Office Chair',
      quantity: 120,
      status: 'Done',
      type: 'IN'
    },
    {
      id: 5,
      reference: 'WH/TRANSFER/0001',
      date: '2024-01-16',
      contact: 'Internal',
      from: 'WH/Stock1',
      to: 'WH/Stock2',
      product: 'Monitor Stand',
      quantity: 15,
      status: 'Done',
      type: 'TRANSFER'
    },
    {
      id: 6,
      reference: 'WH/OUT/0003',
      date: '2024-01-17',
      contact: 'Elite Designs',
      from: 'WH/Stock2',
      to: 'Customer',
      product: 'Filing Cabinet',
      quantity: 8,
      status: 'Waiting',
      type: 'OUT'
    },
    {
      id: 7,
      reference: 'WH/IN/0004',
      date: '2024-01-18',
      contact: 'Prime Interiors',
      from: 'Import Ltd',
      to: 'WH/Stock3',
      product: 'Desk Lamp',
      quantity: 75,
      status: 'Draft',
      type: 'IN'
    }
  ];

  // Filter moves based on search
  const filteredMoves = moveHistory.filter(move => 
    move.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    move.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    move.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    move.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    move.to.toLowerCase().includes(searchQuery.toLowerCase())
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
                When you click on Move History → By default, you land on List View
              </p>
              <ul className="text-xs text-blue-700 mt-2 space-y-1">
                <li>• Populate all moves done between the <strong>From → To</strong> location in inventory</li>
                <li>• If a single reference contains multiple products, it displays in multiple rows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Left Side - Title & New Button */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/movehistory/new')}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                NEW
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Move History</h1>
            </div>

            {/* Right Side - Search & View Toggles */}
            <div className="flex items-center gap-3">
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by reference or contact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  title="List View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded transition ${viewMode === 'kanban' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  title="Kanban View (Status-based)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-2">Track all inventory movements across warehouses</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Total Moves"
            value={moveHistory.length}
            icon={<MoveIcon />}
            color="blue"
          />
          <StatCard 
            label="Incoming (IN)"
            value={moveHistory.filter(m => m.type === 'IN').length}
            icon={<InIcon />}
            color="green"
          />
          <StatCard 
            label="Outgoing (OUT)"
            value={moveHistory.filter(m => m.type === 'OUT').length}
            icon={<OutIcon />}
            color="red"
          />
          <StatCard 
            label="Transfers"
            value={moveHistory.filter(m => m.type === 'TRANSFER').length}
            icon={<TransferIcon />}
            color="purple"
          />
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <MoveHistoryTable moves={filteredMoves} />
        ) : (
          <KanbanView moves={filteredMoves} />
        )}

        {/* Bottom Info Notes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-green-800">
                <span className="font-semibold">IN moves</span> are displayed with a green indicator
              </p>
            </div>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-800">
                <span className="font-semibold">OUT moves</span> are displayed with a red indicator
              </p>
            </div>
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
    red: 'bg-red-50 text-red-700 border-red-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
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

// Kanban View Component
const KanbanView = ({ moves }) => {
  const statuses = ['Draft', 'Waiting', 'Ready', 'Done'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statuses.map(status => (
        <div key={status} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{status}</h3>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {moves.filter(m => m.status === status).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {moves.filter(m => m.status === status).map(move => (
              <KanbanCard key={move.id} move={move} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const KanbanCard = ({ move }) => {
  const typeColors = {
    IN: 'bg-green-100 text-green-700 border-green-300',
    OUT: 'bg-red-100 text-red-700 border-red-300',
    TRANSFER: 'bg-purple-100 text-purple-700 border-purple-300'
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-semibold text-gray-900">{move.reference}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${typeColors[move.type]}`}>
          {move.type}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-1"><span className="font-medium">{move.product}</span></p>
      <p className="text-xs text-gray-600">{move.from} → {move.to}</p>
      <p className="text-xs text-gray-500 mt-2">Qty: {move.quantity} • {move.date}</p>
    </div>
  );
};

// Icons
const MoveIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const InIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

const OutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const TransferIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

export default MoveHistoryList;