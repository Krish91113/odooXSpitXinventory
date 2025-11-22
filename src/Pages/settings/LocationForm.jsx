import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LocationForm = ({ warehouses, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', shortCode: '', warehouseId: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Location name is required';
    if (!formData.shortCode.trim()) newErrors.shortCode = 'Short code is required';
    else if (formData.shortCode.length > 10) newErrors.shortCode = 'Short code must be 10 characters or less';
    if (!formData.warehouseId) newErrors.warehouseId = 'Please select a warehouse';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const selectedWarehouse = warehouses.find(w => w.id === parseInt(formData.warehouseId));
      onAdd({ ...formData, warehouseId: parseInt(formData.warehouseId), warehouse: selectedWarehouse.shortCode });
      setFormData({ name: '', shortCode: '', warehouseId: '' });
      alert('Location added successfully!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8"
    >
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-black text-gray-900">Add New Location</h2>
        <p className="text-sm text-gray-500 mt-1 font-light">Create a location within a warehouse (room, rack, bin, etc.)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Location Name <span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Stock Room A" className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            <AnimatePresence>{errors.name && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-red-500 font-medium">{errors.name}</motion.p>}</AnimatePresence>
          </div>

          <div>
            <label htmlFor="shortCode" className="block text-sm font-bold text-gray-700 mb-1">Short Code <span className="text-red-500">*</span></label>
            <input type="text" id="shortCode" name="shortCode" value={formData.shortCode} onChange={handleChange} placeholder="e.g. SRA" className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.shortCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            <AnimatePresence>{errors.shortCode && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-red-500 font-medium">{errors.shortCode}</motion.p>}</AnimatePresence>
            <p className="mt-1 text-xs text-gray-400">Unique identifier for this location</p>
          </div>
        </div>

        <div>
          <label htmlFor="warehouseId" className="block text-sm font-bold text-gray-700 mb-1">Warehouse <span className="text-red-500">*</span></label>
          <select id="warehouseId" name="warehouseId" value={formData.warehouseId} onChange={handleChange} className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.warehouseId ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`}>
            <option value="">Select a warehouse</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.id} value={warehouse.id}>{warehouse.shortCode} - {warehouse.name}</option>
            ))}
          </select>
          <AnimatePresence>{errors.warehouseId && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-red-500 font-medium">{errors.warehouseId}</motion.p>}</AnimatePresence>
          {warehouses.length === 0 && <p className="mt-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg inline-block">⚠️ No warehouses available. Please create a warehouse first.</p>}
        </div>

        <div className="flex justify-end">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={warehouses.length === 0} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Location
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default LocationForm;