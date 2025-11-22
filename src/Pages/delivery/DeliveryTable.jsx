import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryTable = ({ deliveries }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const statusStyles = {
      Draft: 'bg-gray-100 text-gray-700 border-gray-300',
      Waiting: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Ready: 'bg-blue-100 text-blue-700 border-blue-300',
      Done: 'bg-green-100 text-green-700 border-green-300',
      Cancelled: 'bg-red-100 text-red-700 border-red-300'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles.Draft}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  <p className="text-sm">No deliveries found</p>
                </td>
              </tr>
            ) : (
              // ✅ Ensure the iterator is named 'delivery'
              deliveries.map((delivery) => (
                <tr 
                  key={delivery._id || delivery.id} // Use _id from backend
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigate(`/delivery/${delivery._id || delivery.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-semibold text-gray-900">{delivery.reference}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">WH/Stock1</div> {/* Assuming fixed for now or add 'from' to model */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{delivery.deliverTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{delivery.responsible?.name || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {delivery.scheduleDate ? new Date(delivery.scheduleDate).toLocaleDateString() : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(delivery.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/delivery/${delivery._id || delivery.id}/edit`);
                      }}
                      className="text-gray-600 hover:text-gray-900 transition mr-3"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryTable;