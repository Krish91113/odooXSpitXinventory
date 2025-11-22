import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { settingsService } from '../../services/settingService';


const WarehouseForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', shortCode: '', address: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Warehouse name is required';
    if (!formData.shortCode.trim()) newErrors.shortCode = 'Short code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await settingsService.createWarehouse(formData);
        onAdd(); // Trigger refresh in parent
        setFormData({ name: '', shortCode: '', address: '' });
        alert('Warehouse added successfully!');
      } catch (err) {
        alert("Failed to create warehouse: " + (err.response?.data?.error || err.message));
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
        <h2 className="text-xl font-black text-gray-900">Add New Warehouse</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Main Warehouse" className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Short Code <span className="text-red-500">*</span></label>
            <input type="text" name="shortCode" value={formData.shortCode} onChange={handleChange} placeholder="e.g. WH" className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all ${errors.shortCode ? 'border-red-500' : 'border-gray-200'}`} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} rows={2} placeholder="Warehouse address" className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 border-gray-200" />
        </div>

        <div className="flex justify-end">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2">
            {loading ? 'Adding...' : 'Add Warehouse'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default WarehouseForm;