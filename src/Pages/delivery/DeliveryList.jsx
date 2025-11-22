import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../../Components/auth/dashboard/Navbar';
import DeliveryTable from './DeliveryTable';
import { deliveryService } from '../../services/deliveryService';

const DeliveryList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await deliveryService.getAll();
        setDeliveries(data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const filteredDeliveries = deliveries.filter(delivery => 
    delivery.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (delivery.deliverTo && delivery.deliverTo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* <Navbar /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... (Header and Search sections remain same as your code) ... */}
        
        {/* Content Area */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : viewMode === 'list' ? (
          <DeliveryTable deliveries={filteredDeliveries} />
        ) : (
          <KanbanView deliveries={filteredDeliveries} />
        )}

      </main>
    </div>
  );
};

// ... (Keep your existing KanbanView and KanbanCard components, just ensure they map the fields correctly: delivery.deliverTo instead of delivery.to)

export default DeliveryList;