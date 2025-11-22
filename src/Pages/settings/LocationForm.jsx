import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { settingsService } from '../../services/settingService';


const LocationForm = ({ warehouses, onAdd }) => {
  // Changed 'shortCode' to 'code' to match Mongoose Model
  const [formData, setFormData] = useState({ name: '', code: '', warehouseId: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Location name is required';
    if (!formData.code.trim()) newErrors.code = 'Short code is required';
    if (!formData.warehouseId) newErrors.warehouseId = 'Please select a warehouse';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await settingsService.createLocation(formData);
        onAdd(); // Refresh list
        setFormData({ name: '', code: '', warehouseId: '' });
        alert('Location added successfully!');
      } catch (err) {
        alert("Failed to create location: " + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
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
        <p className="text-sm text-gray-500 mt-1 font-light">Create a location within a warehouse</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Location Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Stock Room A" className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`} />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-bold text-gray-700 mb-1">Short Code <span className="text-red-500">*</span></label>
            <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="e.g. WH/Stock1" className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.code ? 'border-red-500' : 'border-gray-200'}`} />
            <p className="mt-1 text-xs text-gray-400">Format example: WH/Stock1</p>
          </div>
        </div>

        <div>
          <label htmlFor="warehouseId" className="block text-sm font-bold text-gray-700 mb-1">Warehouse <span className="text-red-500">*</span></label>
          <select name="warehouseId" value={formData.warehouseId} onChange={handleChange} className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.warehouseId ? 'border-red-500' : 'border-gray-200'}`}>
            <option value="">Select a warehouse</option>
            {warehouses.map(warehouse => (
              <option key={warehouse._id} value={warehouse._id}>{warehouse.shortCode} - {warehouse.name}</option>
            ))}
          </select>
          {warehouses.length === 0 && <p className="mt-2 text-xs text-yellow-600">⚠️ No warehouses found. Please add a warehouse first.</p>}
        </div>

        <div className="flex justify-end">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading || warehouses.length === 0} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Adding...' : 'Add Location'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default LocationForm;