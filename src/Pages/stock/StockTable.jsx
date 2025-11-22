import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stockService } from '../../services/stockService';

const StockTable = ({ stock, setStockData }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleEdit = (item) => {
    setEditingId(item._id); // Use _id from Mongoose
    setEditValues({
      onHand: item.onHand,
      available: item.available // Using 'available' from model
    });
  };

  const handleSave = async (id) => {
    try {
      // Optimistic UI update
      const updatedItem = await stockService.update(id, editValues);
      
      // Update parent state
      setStockData(prevData => 
        prevData.map(item => item._id === id ? updatedItem : item)
      );

      setEditingId(null);
      setEditValues({});
      // Optional: Toast notification here
    } catch (error) {
      alert("Failed to update stock");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  // Logic based on your model fields
  const getStockStatus = (onHand, available) => {
    const reserved = onHand - available;
    if (reserved === 0 && onHand > 0) return { label: 'All Available', color: 'green' };
    if (reserved > 0 && available > 0) return { label: `${reserved} Reserved`, color: 'yellow' };
    if (available === 0 && onHand > 0) return { label: 'Fully Reserved', color: 'red' };
    if (onHand === 0) return { label: 'Out of Stock', color: 'red' };
    return { label: 'Unknown', color: 'gray' };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Product', 'SKU', 'Unit Cost', 'On Hand', 'Available', 'Location', 'Status', 'Actions'].map((header, i) => (
                <th key={i} className={`px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 7 ? 'text-right' : ''}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {stock.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-16 text-center text-gray-500">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="bg-gray-100 p-4 rounded-full inline-block mb-3">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">No stock items found</p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              stock.map((item, index) => {
                const isEditing = editingId === item._id;
                // Access fields from populated productId object
                const product = item.productId || {}; 
                const status = getStockStatus(item.onHand, item.available);

                return (
                  <motion.tr 
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`transition-colors duration-200 ${isEditing ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                  >
                    {/* Product Name & Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{product.name || 'Unknown Product'}</div>
                        <div className="text-xs text-gray-500 font-medium">{product.category || 'Uncategorized'}</div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                        {product.sku || 'N/A'}
                      </div>
                    </td>

                    {/* Unit Cost */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">₹{(product.cost || 0).toLocaleString()}</div>
                    </td>

                    {/* On Hand (Editable) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <motion.input
                          initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                          type="number"
                          value={editValues.onHand}
                          onChange={(e) => setEditValues({...editValues, onHand: parseInt(e.target.value)})}
                          className="w-20 px-3 py-1.5 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-900">{item.onHand}</div>
                      )}
                    </td>

                    {/* Available (Editable) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <motion.input
                          initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                          type="number"
                          value={editValues.available}
                          onChange={(e) => setEditValues({...editValues, available: parseInt(e.target.value)})}
                          className="w-20 px-3 py-1.5 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                      ) : (
                        <div className="text-sm font-bold text-gray-900">{item.available}</div>
                      )}
                    </td>

                    {/* Location (from 'location' field in model) */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-xs font-bold">{item.location || 'N/A'}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                        status.color === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                        status.color === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        status.color === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          status.color === 'green' ? 'bg-green-500' :
                          status.color === 'yellow' ? 'bg-yellow-500' : 
                          status.color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></span>
                        {status.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <AnimatePresence mode='wait'>
                        {isEditing ? (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-end gap-2"
                          >
                            <button onClick={() => handleSave(item._id)} className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </button>
                            <button onClick={handleCancel} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => handleEdit(item)}
                            className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {stock.length > 0 && (
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{stock.length}</span> products
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Last sync: {new Date().toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTable;