import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../Components/auth/dashboard/Navbar';
import ReceiptProductTable from './ReceiptProductTable';
import { receiptService } from '../../services/receiptService';

const ReceiptForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    reference: 'New', // Backend generates this
    receiveFrom: '',
    scheduleDate: new Date().toISOString().split('T')[0],
    responsible: 'Current User', // You can fetch this from session if needed
    status: 'Draft',
    warehouseId: 'WH' // Required by your model
  });

  const [products, setProducts] = useState([]);

  // Fetch Data (Edit Mode)
  useEffect(() => {
    if (isEditMode) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await receiptService.getById(id);
          
          setFormData({
            reference: data.reference,
            receiveFrom: data.receiveFrom,
            scheduleDate: data.scheduleDate ? data.scheduleDate.split('T')[0] : '',
            responsible: data.responsible || 'Current User',
            status: data.status,
            warehouseId: data.warehouseId
          });

          // Map backend items to frontend table
          if (data.items) {
            setProducts(data.items.map((item, index) => ({
              id: index + 1,
              // Handle if populate was used or not
              productId: item.productId._id || item.productId, 
              name: item.productId.name || 'Unknown Product', 
              sku: item.productId.sku || 'N/A',
              quantity: item.quantity
            })));
          }
        } catch (err) {
          console.error("Failed to fetch receipt", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create / Update Receipt
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Prepare payload according to your Mongoose Schema
      const payload = {
        warehouseId: formData.warehouseId,
        receiveFrom: formData.receiveFrom,
        scheduleDate: formData.scheduleDate,
        items: products.map(p => ({
          productId: p.productId, // Must be a valid MongoDB ObjectId
          quantity: Number(p.quantity)
        }))
      };

      if (isEditMode) {
        await receiptService.update(id, payload);
        alert("Receipt updated!");
      } else {
        // Create new
        const created = await receiptService.create(payload);
        navigate(`/receipts/${created._id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save: " + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Status Changes
  const handleStatusAction = async (action) => {
    if (!isEditMode) return alert("Save the receipt first.");

    try {
      setIsLoading(true);
      const res = await receiptService.updateStatus(id, action); // Calls /:id/status
      setFormData(prev => ({ ...prev, status: res.updatedStatus }));
    } catch (err) {
      alert("Status update failed: " + err.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => window.print();

  const handleCancel = async () => {
    if (isEditMode && formData.status !== 'Done') {
      if (window.confirm("Cancel this receipt?")) {
        await handleStatusAction('CANCEL');
        navigate('/receipts');
      }
    } else {
      navigate('/receipts');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6"
        >
          <div className="flex gap-3 flex-wrap">
            {/* Logic for buttons based on your backend workflow */}
            
            {/* DRAFT State */}
            {formData.status === 'Draft' && (
              <>
                <button onClick={handleSave} disabled={isLoading} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                  Save Draft
                </button>
                {isEditMode && (
                  <button onClick={() => handleStatusAction('TODO')} disabled={isLoading} className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
                    Mark as Todo
                  </button>
                )}
              </>
            )}

            {/* READY State */}
            {formData.status === 'Ready' && (
              <button onClick={() => handleStatusAction('VALIDATE')} disabled={isLoading} className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all">
                Validate
              </button>
            )}

            {/* DONE State */}
            <button
              onClick={handlePrint}
              disabled={formData.status !== 'Done'}
              className={`px-6 py-2.5 border-2 font-bold rounded-xl transition-all ${
                formData.status === 'Done' 
                  ? 'border-gray-900 text-gray-900 hover:bg-gray-50' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Print
            </button>

            {/* Cancel Button */}
            {formData.status !== 'Done' && formData.status !== 'Cancelled' && (
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 font-bold rounded-xl hover:bg-red-100 transition-all"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Status Badge */}
          <div className="bg-white border border-gray-200 p-1.5 rounded-xl shadow-sm flex">
            {['Draft', 'Ready', 'Done'].map((step) => (
              <div
                key={step}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  formData.status === step
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'text-gray-400 bg-transparent'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="mb-8 border-b border-gray-100 pb-4">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              {formData.reference}
            </h1>
            <p className="text-gray-500 mt-1 font-medium">Receipt Reference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Receive From</label>
                <input 
                  type="text" 
                  name="receiveFrom"
                  value={formData.receiveFrom}
                  onChange={handleChange}
                  disabled={formData.status !== 'Draft'}
                  className="w-full px-0 py-2 border-b-2 border-gray-200 focus:border-gray-900 outline-none bg-transparent text-lg font-medium disabled:text-gray-500"
                  placeholder="Vendor Name"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Schedule Date</label>
                <input 
                  type="date" 
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  disabled={formData.status !== 'Draft'}
                  className="w-full px-0 py-2 border-b-2 border-gray-200 focus:border-gray-900 outline-none bg-transparent text-lg font-medium disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Responsible</label>
                <input 
                  type="text" 
                  value={formData.responsible}
                  disabled
                  className="w-full px-0 py-2 border-b-2 border-gray-200 bg-gray-50/50 text-gray-500 text-lg font-medium cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
            <ReceiptProductTable 
              products={products} 
              setProducts={setProducts} 
              isEditable={formData.status === 'Draft'}
            />
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default ReceiptForm;