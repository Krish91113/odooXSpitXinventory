import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MoveHistoryTable = ({ moves }) => {
  // No navigate needed as history items might not have detail pages in this simple version
  // Or navigate to the related Receipt/Delivery

  const getTypeIndicator = (type) => {
    const typeStyles = {
      IN: 'bg-green-500 shadow-green-200',
      OUT: 'bg-red-500 shadow-red-200',
      TRANSFER: 'bg-purple-500 shadow-purple-200'
    };
    return <div className={`h-2.5 w-2.5 rounded-full shadow-sm ${typeStyles[type]}`} title={type}></div>;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Type', 'Reference', 'Date', 'From', 'To', 'Product', 'Quantity'].map((header, i) => (
                <th key={i} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {moves.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center text-gray-500">
                  <p className="text-sm font-medium">No move history found</p>
                </td>
              </tr>
            ) : (
              moves.map((move, index) => (
                <motion.tr 
                  key={move._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Type */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {getTypeIndicator(move.movementType)}
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {move.movementType}
                      </span>
                    </div>
                  </td>

                  {/* Reference */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-bold text-gray-900">
                      {move.reference}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-medium">
                      {new Date(move.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-600">
                      {move.source || '-'}
                    </div>
                  </td>

                  {/* Destination */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-600">
                      {move.destination || '-'}
                    </div>
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {move.productId?.name || 'Unknown Product'}
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded inline-block">
                      {move.quantity}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoveHistoryTable;