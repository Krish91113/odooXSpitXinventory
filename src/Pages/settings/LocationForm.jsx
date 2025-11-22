import React, { useState } from 'react';

const LocationForm = ({ warehouses, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    warehouseId: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Location name is required';
    }
    
    if (!formData.shortCode.trim()) {
      newErrors.shortCode = 'Short code is required';
    } else if (formData.shortCode.length > 10) {
      newErrors.shortCode = 'Short code must be 10 characters or less';
    }

    if (!formData.warehouseId) {
      newErrors.warehouseId = 'Please select a warehouse';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      const selectedWarehouse = warehouses.find(w => w.id === parseInt(formData.warehouseId));
      onAdd({
        ...formData,
        warehouseId: parseInt(formData.warehouseId),
        warehouse: selectedWarehouse.shortCode
      });
      // Reset form
      setFormData({ name: '', shortCode: '', warehouseId: '' });
      alert('Location added successfully!');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Add New Location</h2>
        <p className="text-sm text-gray-600 mt-1">Create a location within a warehouse (room, rack, bin, etc.)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Location Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Location Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Stock Room A"
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Short Code */}
        <div>
          <label htmlFor="shortCode" className="block text-sm font-medium text-gray-700 mb-1">
            Short Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="shortCode"
            name="shortCode"
            value={formData.shortCode}
            onChange={handleChange}
            placeholder="e.g. SRA"
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.shortCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.shortCode && <p className="mt-1 text-xs text-red-500">{errors.shortCode}</p>}
          <p className="mt-1 text-xs text-gray-500">Unique identifier for this location</p>
        </div>

        {/* Warehouse Selection */}
        <div>
          <label htmlFor="warehouseId" className="block text-sm font-medium text-gray-700 mb-1">
            Warehouse <span className="text-red-500">*</span>
          </label>
          <select
            id="warehouseId"
            name="warehouseId"
            value={formData.warehouseId}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.warehouseId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a warehouse</option>
            {warehouses.map(warehouse => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.shortCode} - {warehouse.name}
              </option>
            ))}
          </select>
          {errors.warehouseId && <p className="mt-1 text-xs text-red-500">{errors.warehouseId}</p>}
          {warehouses.length === 0 && (
            <p className="mt-1 text-xs text-yellow-600">⚠️ No warehouses available. Please create a warehouse first.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={warehouses.length === 0}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationForm;