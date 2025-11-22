import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../Components/auth/dashboard/Navbar';
import WarehouseForm from './WarehouseForm';
import LocationForm from './LocationForm';
import { settingsService } from '../../services/settingService';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('warehouse');
  const [warehouses, setWarehouses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Initial Data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [whData, locData] = await Promise.all([
        settingsService.getWarehouses(),
        settingsService.getLocations()
      ]);
      setWarehouses(whData);
      setLocations(locData);
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers to refresh state after updates
  const refreshData = () => fetchData();

  const handleWarehouseDelete = async (id) => {
    if (window.confirm('Delete this warehouse? Associated locations might be affected.')) {
      try {
        await settingsService.deleteWarehouse(id);
        setWarehouses(prev => prev.filter(w => w._id !== id));
        setLocations(prev => prev.filter(l => l.warehouseId?._id !== id)); // Optimistic update
      } catch (err) {
        alert("Failed to delete warehouse");
      }
    }
  };

  const handleLocationDelete = async (id) => {
    if (window.confirm('Delete this location?')) {
      try {
        await settingsService.deleteLocation(id);
        setLocations(prev => prev.filter(l => l._id !== id));
      } catch (err) {
        alert("Failed to delete location");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Settings</h1>
          <p className="text-gray-500 mt-2 font-light">Manage warehouses and locations for your inventory</p>
        </motion.div>

        {/* Info Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">Warehouse & Location Hierarchy</p>
              <p className="text-xs font-medium text-blue-700">Warehouses can contain multiple locations (rooms, racks, bins, etc.)</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8 flex gap-6 border-b border-gray-200">
          {['warehouse', 'location'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 text-sm font-bold transition-all relative ${
                activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 capitalize">
                {tab}
              </div>
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode='wait'>
          {activeTab === 'warehouse' ? (
            <motion.div 
              key="warehouse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <WarehouseForm onAdd={refreshData} />

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">Existing Warehouses</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Name', 'Short Code', 'Address', 'Locations', 'Actions'].map((h, i) => (
                          <th key={i} className={`px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {warehouses.map((warehouse, i) => (
                        <motion.tr 
                          key={warehouse._id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{warehouse.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">{warehouse.shortCode}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{warehouse.address || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                            {/* Count locations that belong to this warehouse */}
                            {locations.filter(l => l.warehouseId?._id === warehouse._id || l.warehouseId === warehouse._id).length} locations
                          </span></td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button onClick={() => handleWarehouseDelete(warehouse._id)} className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <LocationForm warehouses={warehouses} onAdd={refreshData} />

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-900">Existing Locations</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {['Name', 'Short Code', 'Warehouse', 'Actions'].map((h, i) => (
                          <th key={i} className={`px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {locations.map((location, i) => (
                        <motion.tr 
                          key={location._id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{location.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">{location.code}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="text-sm font-medium">
                                {location.warehouseId?.name || 'Unknown Warehouse'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button onClick={() => handleLocationDelete(location._id)} className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default Settings;