import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/auth/dashboard/Navbar';
import ReceiptsTable from './ReceiptTable';


const ReceiptsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data
  const receipts = [
    {
      id: 1,
      reference: 'WH/IN/0001',
      from: 'Vendor',
      to: 'WH/Stock1',
      contact: 'Azure Interior',
      scheduleDate: '2024-01-15',
      status: 'Ready'
    },
    {
      id: 2,
      reference: 'WH/IN/0002',
      from: 'Vendor',
      to: 'WH/Stock1',
      contact: 'Azure Interior',
      scheduleDate: '2024-01-16',
      status: 'Ready'
    },
    {
      id: 3,
      reference: 'WH/IN/0003',
      from: 'Supplier Co',
      to: 'WH/Stock2',
      contact: 'Modern Furniture',
      scheduleDate: '2024-01-17',
      status: 'Waiting'
    },
    {
      id: 4,
      reference: 'WH/IN/0004',
      from: 'Import Ltd',
      to: 'WH/Stock1',
      contact: 'Elite Designs',
      scheduleDate: '2024-01-18',
      status: 'Draft'
    },
    {
      id: 5,
      reference: 'WH/IN/0005',
      from: 'Vendor',
      to: 'WH/Stock3',
      contact: 'Prime Interiors',
      scheduleDate: '2024-01-19',
      status: 'Done'
    }
  ];

  // Filter receipts based on search
  const filteredReceipts = receipts.filter(receipt => 
    receipt.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
     <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Left Side - Title & New Button */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/receipts/new')}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                NEW
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Receipts</h1>
            </div>

            {/* Right Side - Search & View Toggles */}
            <div className="flex items-center gap-3">
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
          <p className="text-gray-600 mt-2">Manage incoming receipts and track vendor deliveries</p>
        </div>

        {/* Reference Format Info Box */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Auto-Generated Reference Format</h3>
              <p className="text-sm text-blue-800 mb-2">
                <code className="bg-blue-100 px-2 py-0.5 rounded font-mono text-xs">WH/IN/0001</code>
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li><span className="font-semibold">WH</span> = Warehouse ID</li>
                <li><span className="font-semibold">IN</span> = Operation (IN for receipts, OUT for deliveries)</li>
                <li><span className="font-semibold">0001</span> = Auto-increment unique ID</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <ReceiptsTable receipts={filteredReceipts} />
        ) : (
          <KanbanView receipts={filteredReceipts} />
        )}

      </main>
    </div>
  );
};

// Kanban View Component
const KanbanView = ({ receipts }) => {
  const statuses = ['Draft', 'Waiting', 'Ready', 'Done'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statuses.map(status => (
        <div key={status} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{status}</h3>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {receipts.filter(r => r.status === status).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {receipts.filter(r => r.status === status).map(receipt => (
              <KanbanCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const KanbanCard = ({ receipt }) => {
  const statusColors = {
    Draft: 'bg-gray-100 text-gray-700 border-gray-300',
    Waiting: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Ready: 'bg-blue-100 text-blue-700 border-blue-300',
    Done: 'bg-green-100 text-green-700 border-green-300'
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-semibold text-gray-900">{receipt.reference}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${statusColors[receipt.status]}`}>
          {receipt.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Contact:</span> {receipt.contact}</p>
      <p className="text-xs text-gray-600">{receipt.from} → {receipt.to}</p>
      <p className="text-xs text-gray-500 mt-2">{receipt.scheduleDate}</p>
    </div>
  );
};

export default ReceiptsList;