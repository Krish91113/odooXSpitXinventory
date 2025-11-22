import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MoveHistoryTable = ({ moves }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const statusStyles = {
      Draft: 'bg-gray-100 text-gray-600 border-gray-200',
      Waiting: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Ready: 'bg-blue-50 text-blue-700 border-blue-200',
      Done: 'bg-green-50 text-green-700 border-green-200',
      Canceled: 'bg-red-50 text-red-700 border-red-200'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyles[status] || statusStyles.Draft}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
          status === 'Done' ? 'bg-green-500' : 
          status === 'Ready' ? 'bg-blue-500' : 
          status === 'Waiting' ? 'bg-yellow-500' : 'bg-gray-400'
        }`}></span>
        {status}
      </span>
    );
  };

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
              {['Type', 'Reference', 'Date', 'Contact', 'From', 'To', 'Product', 'Quantity', 'Status', 'Actions'].map((header, i) => (
                <th key={i} className={`px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider ${i === 9 ? 'text-right' : ''}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {moves.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-6 py-16 text-center text-gray-500">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>
                    <p className="text-sm font-medium">No move history found</p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              moves.map((move, index) => (
                <motion.tr 
                  key={move.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                  onClick={() => navigate(`/movehistory/${move.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {getTypeIndicator(move.type)}
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{move.type}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{move.reference}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 font-medium">{new Date(move.date).toLocaleDateString()}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-800">{move.contact}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <span className="text-sm font-medium">{move.from}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      <span className="text-sm font-medium">{move.to}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{move.product}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded inline-block">{move.quantity}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(move.status)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movehistory/${move.id}`);
                      }}
                      className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {moves.length > 0 && (
        <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{moves.length}</span> records
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Real-time data
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveHistoryTable;