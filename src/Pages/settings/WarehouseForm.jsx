import React, { useState } from 'react';

const WarehouseForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    address: ''
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
      newErrors.name = 'Warehouse name is required';
    }
    
    if (!formData.shortCode.trim()) {
      newErrors.shortCode = 'Short code is required';
    } else if (formData.shortCode.length > 10) {
      newErrors.shortCode = 'Short code must be 10 characters or less';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onAdd(formData);
      // Reset form
      setFormData({ name: '', shortCode: '', address: '' });
      alert('Warehouse added successfully!');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Add New Warehouse</h2>
        <p className="text-sm text-gray-600 mt-1">Create a new warehouse entry for inventory management</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Warehouse Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Warehouse Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Main Warehouse"
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
            placeholder="e.g. WH"
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.shortCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.shortCode && <p className="mt-1 text-xs text-red-500">{errors.shortCode}</p>}
          <p className="mt-1 text-xs text-gray-500">Used in reference codes (e.g., WH/IN/0001)</p>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="Enter warehouse address"
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
};

export default WarehouseForm;