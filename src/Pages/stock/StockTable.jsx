import React, { useState } from 'react';

const StockTable = ({ stock }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues({
      onHand: item.onHand,
      freeToUse: item.freeToUse
    });
  };

  const handleSave = (id) => {
    // Here you would typically make an API call to update the stock
    console.log('Saving stock update for ID:', id, editValues);
    setEditingId(null);
    setEditValues({});
    // Show success message
    alert('Stock updated successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const getStockStatus = (onHand, freeToUse) => {
    const reserved = onHand - freeToUse;
    if (reserved === 0) return { label: 'All Available', color: 'green' };
    if (reserved > 0 && freeToUse > 0) return { label: `${reserved} Reserved`, color: 'yellow' };
    if (freeToUse === 0) return { label: 'Fully Reserved', color: 'red' };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* Table Head */}
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Per Unit Cost
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                On Hand
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Free to Use
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Warehouse
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {stock.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-sm">No stock items found</p>
                  <p className="text-xs text-gray-400 mt-1">Add products to start tracking inventory</p>
                </td>
              </tr>
            ) : (
              stock.map((item) => {
                const isEditing = editingId === item.id;
                const status = getStockStatus(item.onHand, item.freeToUse);

                return (
                  <tr 
                    key={item.id} 
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Product */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.product}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-700">{item.sku}</div>
                    </td>

                    {/* Per Unit Cost */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">₹{item.perUnitCost.toLocaleString()}</div>
                    </td>

                    {/* On Hand */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.onHand}
                          onChange={(e) => setEditValues({...editValues, onHand: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <div className="text-sm font-semibold text-gray-900">{item.onHand}</div>
                      )}
                    </td>

                    {/* Free to Use */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValues.freeToUse}
                          onChange={(e) => setEditValues({...editValues, freeToUse: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                      ) : (
                        <div className="text-sm font-semibold text-gray-900">{item.freeToUse}</div>
                      )}
                    </td>

                    {/* Warehouse */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm text-gray-700">{item.warehouse}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        status.color === 'green' ? 'bg-green-100 text-green-800' :
                        status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {status.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleSave(item.id)}
                            className="text-green-600 hover:text-green-900 transition"
                            title="Save"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-900 transition"
                            title="Cancel"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleEdit(item)}
                          className="text-gray-600 hover:text-gray-900 transition"
                          title="Edit Stock"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {stock.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{stock.length}</span> product{stock.length !== 1 ? 's' : ''}
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTable;