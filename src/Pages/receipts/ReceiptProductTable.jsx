import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReceiptProductTable = ({ products, setProducts, isEditable }) => {

  const handleAddProduct = () => {
    const newId = products.length + 1;
    setProducts([...products, { id: newId, name: '', sku: '', quantity: 1 }]);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleProductChange = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
            {isEditable && <th className="px-6 py-4 text-right"></th>}
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-100">
          <AnimatePresence>
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  {isEditable ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                      placeholder="Product Name"
                      className="w-full bg-transparent border-b border-transparent focus:border-blue-500 outline-none font-medium text-gray-900 placeholder-gray-300 transition-all"
                    />
                  ) : (
                    <span className="font-bold text-gray-900">{product.name}</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {isEditable ? (
                    <input
                      type="text"
                      value={product.sku}
                      onChange={(e) => handleProductChange(product.id, 'sku', e.target.value)}
                      placeholder="SKU"
                      className="w-full bg-transparent border-b border-transparent focus:border-blue-500 outline-none font-mono text-sm text-gray-600 placeholder-gray-300 transition-all"
                    />
                  ) : (
                    <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{product.sku}</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {isEditable ? (
                    <input
                      type="number"
                      value={product.quantity}
                      min="1"
                      onChange={(e) => handleProductChange(product.id, 'quantity', parseInt(e.target.value))}
                      className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-center font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <span className="font-bold text-gray-900">{product.quantity}</span>
                  )}
                </td>

                {isEditable && (
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>

      {isEditable && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddProduct}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ReceiptProductTable;