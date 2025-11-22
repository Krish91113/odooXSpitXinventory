import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../Components/auth/dashboard/Navbar';
import ReceiptProductTable from './ReceiptProductTable';


const ReceiptForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Form State
  const [formData, setFormData] = useState({
    reference: 'WH/IN/0001',
    receiveFrom: '',
    scheduleDate: new Date().toISOString().split('T')[0],
    responsible: 'Current User (Auto)',
    status: 'Draft', // Draft -> Ready -> Done
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'Desk', sku: 'DESK001', quantity: 6 }
  ]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (newStatus) => {
    setFormData({ ...formData, status: newStatus });
  };

  const handleValidate = () => {
    if (formData.status === 'Draft') handleStatusChange('Ready');
    else if (formData.status === 'Ready') handleStatusChange('Done');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
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
          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleValidate}
              className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-lg transition-all ${
                formData.status === 'Done' ? 'bg-green-600 cursor-not-allowed opacity-50' : 'bg-gray-900 hover:bg-gray-800'
              }`}
              disabled={formData.status === 'Done'}
            >
              {formData.status === 'Draft' ? 'Mark as Todo' : formData.status === 'Ready' ? 'Validate' : 'Validated'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              disabled={formData.status !== 'Done'}
              className={`px-6 py-2.5 border-2 font-bold rounded-xl transition-all ${
                formData.status === 'Done' 
                  ? 'border-gray-900 text-gray-900 hover:bg-gray-50' 
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Print
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 font-bold rounded-xl hover:bg-red-100 transition-all"
            >
              Cancel
            </motion.button>
          </div>

          {/* Status Tabs */}
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

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>

          {/* Title */}
          <div className="mb-8 border-b border-gray-100 pb-4">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{formData.reference}</h1>
            <p className="text-gray-500 mt-1 font-medium">Receipt Reference</p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
            
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Receive From</label>
                <input 
                  type="text" 
                  name="receiveFrom"
                  value={formData.receiveFrom}
                  onChange={handleChange}
                  placeholder="e.g. Vendor Name"
                  className="w-full px-0 py-2 border-b-2 border-gray-200 focus:border-gray-900 outline-none bg-transparent text-lg font-medium transition-colors placeholder-gray-300"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Schedule Date</label>
                <input 
                  type="date" 
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  className="w-full px-0 py-2 border-b-2 border-gray-200 focus:border-gray-900 outline-none bg-transparent text-lg font-medium transition-colors text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Responsible</label>
                <input 
                  type="text" 
                  name="responsible"
                  value={formData.responsible}
                  disabled
                  className="w-full px-0 py-2 border-b-2 border-gray-200 bg-gray-50/50 text-gray-500 text-lg font-medium cursor-not-allowed"
                />
                <p className="text-xs text-blue-500 mt-1 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Auto-filled with current user
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-500 rounded-full"></span>
              Products
            </h2>
            
            <ReceiptProductTable
              products={products} 
              setProducts={setProducts} 
              isEditable={formData.status !== 'Done'}
            />
          </div>

        </motion.div>

        {/* Floating Notes (Desktop Only) */}
        <div className="hidden xl:block">
          {/* Left Note */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed left-10 top-1/3 w-64 p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <h3 className="font-black text-gray-900 mb-3">Workflow Guide</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Draft: Initial creation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Ready: Click "Mark as Todo"
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Done: Click "Validate"
              </li>
            </ul>
          </motion.div>

          {/* Right Note */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="fixed right-10 top-1/3 w-64 p-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/50 backdrop-blur-sm"
          >
            <h3 className="font-black text-blue-900 mb-2">Tip</h3>
            <p className="text-sm text-blue-700 font-medium leading-relaxed">
              You can only print the receipt once the status is <strong>Done</strong>.
            </p>
          </motion.div>
        </div>

      </main>
    </div>
  );
};

export default ReceiptForm;