import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/auth/dashboard/Navbar';
import DeliveryTable from './DeliveryTable';


const DeliveryList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Delivery Data
  const deliveries = [
    {
      id: 1,
      reference: 'WH/OUT/0001',
      from: 'WH/Stock1',
      to: 'Customer',
      contact: 'Azure Interior',
      scheduleDate: '2024-01-20',
      status: 'Ready',
      deliveryAddress: '123 Business Park, Mumbai',
      responsible: 'John Doe',
      products: [
        { sku: 'DESK001', name: 'Desk', quantity: 6, inStock: 50 }
      ]
    },
    {
      id: 2,
      reference: 'WH/OUT/0002',
      from: 'WH/Stock1',
      to: 'Customer',
      contact: 'Azure Interior',
      scheduleDate: '2024-01-21',
      status: 'Ready',
      deliveryAddress: '456 Commerce Street, Delhi',
      responsible: 'Jane Smith',
      products: [
        { sku: 'TBL001', name: 'Table', quantity: 10, inStock: 50 }
      ]
    },
    {
      id: 3,
      reference: 'WH/OUT/0003',
      from: 'WH/Stock2',
      to: 'Customer',
      contact: 'Modern Furniture',
      scheduleDate: '2024-01-22',
      status: 'Waiting',
      deliveryAddress: '789 Trade Center, Bangalore',
      responsible: 'Mike Johnson',
      products: [
        { sku: 'CHR001', name: 'Office Chair', quantity: 150, inStock: 120 }
      ]
    },
    {
      id: 4,
      reference: 'WH/OUT/0004',
      from: 'WH/Stock1',
      to: 'Customer',
      contact: 'Elite Designs',
      scheduleDate: '2024-01-23',
      status: 'Draft',
      deliveryAddress: '321 Industrial Area, Pune',
      responsible: 'Sarah Williams',
      products: [
        { sku: 'MNT001', name: 'Monitor Stand', quantity: 25, inStock: 30 }
      ]
    },
    {
      id: 5,
      reference: 'WH/OUT/0005',
      from: 'WH/Stock3',
      to: 'Customer',
      contact: 'Prime Interiors',
      scheduleDate: '2024-01-19',
      status: 'Done',
      deliveryAddress: '555 Corporate Hub, Hyderabad',
      responsible: 'David Brown',
      products: [
        { sku: 'CAB001', name: 'Filing Cabinet', quantity: 12, inStock: 15 }
      ]
    }
  ];

  // Filter deliveries based on search
  const filteredDeliveries = deliveries.filter(delivery => 
    delivery.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.from.toLowerCase().includes(searchQuery.toLowerCase())
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
                By default, you land on List View
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Populate all delivery orders for outgoing stock movements
              </p>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Left Side - Title & New Button */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/delivery/new')}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                NEW
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Delivery</h1>
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
          <p className="text-gray-600 mt-2">Manage outgoing deliveries and customer orders</p>
        </div>

        {/* Status Info Box */}
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-yellow-900 mb-2">Status Workflow</h3>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li><span className="font-semibold">Draft:</span> Initial state, can be edited</li>
                <li><span className="font-semibold">Waiting:</span> Waiting for stock availability</li>
                <li><span className="font-semibold">Ready:</span> Stock is available, ready to process</li>
                <li><span className="font-semibold">Done:</span> Delivered or dispatched</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <DeliveryTable deliveries={filteredDeliveries} />
        ) : (
          <KanbanView deliveries={filteredDeliveries} />
        )}

        {/* Stock Alert Info */}
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-800">
              <span className="font-semibold">Alert:</span> The system will notify you in red if a product is not in stock or if the requested quantity exceeds available inventory.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

// Kanban View Component
const KanbanView = ({ deliveries }) => {
  const statuses = ['Draft', 'Waiting', 'Ready', 'Done'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statuses.map(status => (
        <div key={status} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{status}</h3>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
              {deliveries.filter(d => d.status === status).length}
            </span>
          </div>
          
          <div className="space-y-3">
            {deliveries.filter(d => d.status === status).map(delivery => (
              <KanbanCard key={delivery.id} delivery={delivery} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const KanbanCard = ({ delivery }) => {
  const navigate = useNavigate();
  const statusColors = {
    Draft: 'bg-gray-100 text-gray-700 border-gray-300',
    Waiting: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Ready: 'bg-blue-100 text-blue-700 border-blue-300',
    Done: 'bg-green-100 text-green-700 border-green-300'
  };

  return (
    <div 
      onClick={() => navigate(`/delivery/${delivery.id}`)}
      className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-semibold text-gray-900">{delivery.reference}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${statusColors[delivery.status]}`}>
          {delivery.status}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Contact:</span> {delivery.contact}</p>
      <p className="text-xs text-gray-600">{delivery.from} → {delivery.to}</p>
      <p className="text-xs text-gray-500 mt-2">{delivery.scheduleDate}</p>
    </div>
  );
};

export default DeliveryList;