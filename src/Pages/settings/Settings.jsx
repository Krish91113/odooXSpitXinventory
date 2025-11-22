import React, { useState } from 'react';
import Navbar from '../../Components/auth/dashboard/Navbar';
import WarehouseForm from './WarehouseForm';
import LocationForm from './LocationForm';



const Settings = () => {
  const [activeTab, setActiveTab] = useState('warehouse'); // 'warehouse' or 'location'

  // Sample Warehouse Data
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: 'Main Warehouse', shortCode: 'WH', address: 'Mumbai, Maharashtra' },
    { id: 2, name: 'Stock Warehouse 1', shortCode: 'WH1', address: 'Delhi, India' },
    { id: 3, name: 'Stock Warehouse 2', shortCode: 'WH2', address: 'Bangalore, Karnataka' },
    { id: 4, name: 'Stock Warehouse 3', shortCode: 'WH3', address: 'Pune, Maharashtra' }
  ]);

  // Sample Location Data
  const [locations, setLocations] = useState([
    { id: 1, name: 'Stock Room A', shortCode: 'SRA', warehouseId: 1, warehouse: 'WH' },
    { id: 2, name: 'Stock Room B', shortCode: 'SRB', warehouseId: 1, warehouse: 'WH' },
    { id: 3, name: 'Production Floor', shortCode: 'PF', warehouseId: 2, warehouse: 'WH1' },
    { id: 4, name: 'Loading Bay', shortCode: 'LB', warehouseId: 2, warehouse: 'WH1' },
    { id: 5, name: 'Storage Rack 1', shortCode: 'SR1', warehouseId: 3, warehouse: 'WH2' }
  ]);

  const handleWarehouseAdd = (warehouse) => {
    setWarehouses([...warehouses, { ...warehouse, id: warehouses.length + 1 }]);
  };

  const handleLocationAdd = (location) => {
    setLocations([...locations, { ...location, id: locations.length + 1 }]);
  };

  const handleWarehouseDelete = (id) => {
    if (window.confirm('Are you sure? This will also delete all associated locations.')) {
      setWarehouses(warehouses.filter(w => w.id !== id));
      setLocations(locations.filter(l => l.warehouseId !== id));
    }
  };

  const handleLocationDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage warehouses and locations for your inventory</p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">
                This section contains the warehouse details & location hierarchy
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Warehouses can contain multiple locations (rooms, racks, bins, etc.)
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('warehouse')}
            className={`pb-3 px-4 text-sm font-semibold transition border-b-2 ${
              activeTab === 'warehouse'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Warehouse
            </div>
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`pb-3 px-4 text-sm font-semibold transition border-b-2 ${
              activeTab === 'location'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </div>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'warehouse' ? (
          <div className="space-y-8">
            {/* Warehouse Form */}
            <WarehouseForm onAdd={handleWarehouseAdd} />

            {/* Warehouse List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Existing Warehouses</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Short Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Locations</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {warehouses.map(warehouse => (
                      <tr key={warehouse.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {warehouse.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                          {warehouse.shortCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {warehouse.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            {locations.filter(l => l.warehouseId === warehouse.id).length} locations
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => handleWarehouseDelete(warehouse.id)}
                            className="text-red-600 hover:text-red-900 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Location Form */}
            <LocationForm warehouses={warehouses} onAdd={handleLocationAdd} />

            {/* Location List */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Existing Locations</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Short Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {locations.map(location => (
                      <tr key={location.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {location.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                          {location.shortCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-sm text-gray-700">
                              {warehouses.find(w => w.id === location.warehouseId)?.name || location.warehouse}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => handleLocationDelete(location.id)}
                            className="text-red-600 hover:text-red-900 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-green-800">
                  Locations hold the multiple rooms, racks, bins, or zones within a warehouse. Each location must be assigned to a parent warehouse.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Settings;