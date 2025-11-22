import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Navbar from '../../Components/auth/dashboard/Navbar';
import { deliveryService } from '../../services/deliveryService';

const DeliveryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    reference: 'New',
    deliverTo: '', // Changed from deliveryAddress to match model
    scheduleDate: new Date().toISOString().split('T')[0],
    responsible: 'Current User',
    operation: 'OUT', // Default from model
    status: 'Draft',
    warehouseId: 'WH' // Required by model
  });

  const [products, setProducts] = useState([]);

  // Fetch Data if Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data = await deliveryService.getById(id);
          
          setFormData({
            reference: data.reference,
            deliverTo: data.deliverTo,
            scheduleDate: data.scheduleDate ? data.scheduleDate.split('T')[0] : '',
            responsible: data.responsible || 'Current User',
            status: data.status,
            operation: data.operation,
            warehouseId: data.warehouseId
          });

          // Map items
          if (data.items) {
            setProducts(data.items.map((item, index) => ({
              id: index + 1,
              productId: item.productId._id || item.productId, 
              name: item.productId.name || 'Unknown Product',
              sku: item.productId.sku || 'N/A',
              quantity: item.quantity,
              // In a real app, you'd fetch current stock here to show 'inStock'
              inStock: 100 // Placeholder
            })));
          }
        } catch (err) {
          console.error("Failed to fetch delivery", err);
          alert("Error loading delivery details");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      // Initialize with one empty row
      setProducts([{ id: 1, productId: '', name: '', sku: '', quantity: 1, inStock: 0 }]);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Product Table Handlers
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, productId: '', name: '', sku: '', quantity: 1, inStock: 0 }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Save / Create
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Validate products have IDs (in real app)
      // const validProducts = products.filter(p => p.productId);

      const payload = {
        warehouseId: formData.warehouseId,
        deliverTo: formData.deliverTo,
        scheduleDate: formData.scheduleDate,
        items: products.map(p => ({
          productId: p.productId || "650...", // Replace with real ID logic
          quantity: Number(p.quantity)
        }))
      };

      if (isEditMode) {
        await deliveryService.update(id, payload);
        alert("Delivery updated!");
      } else {
        const created = await deliveryService.create(payload);
        navigate(`/delivery/${created._id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save: " + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  // Status Workflow
  const handleStatusAction = async (action) => {
    if (!isEditMode) return alert("Please save first.");

    try {
      setIsLoading(true);
      const res = await deliveryService.updateStatus(id, action);
      setFormData(prev => ({ ...prev, status: res.updatedStatus }));
      if (action === 'VALIDATE') alert("Delivery Validated & Stock Updated!");
    } catch (err) {
      alert("Status update failed: " + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => window.print();

  const handleCancel = async () => {
    if (isEditMode && formData.status !== 'Done' && formData.status !== 'Cancelled') {
      if (window.confirm("Cancel this delivery?")) {
        await handleStatusAction('CANCEL');
        navigate('/delivery');
      }
    } else {
      navigate('/delivery');
    }
  };

  if (isLoading && !formData.reference) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* <Navbar /> */}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/delivery')}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {formData.reference}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            
            {formData.status === 'Draft' && (
              <>
                <button onClick={handleSave} disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Save Draft</button>
                {isEditMode && (
                  <button onClick={() => handleStatusAction('TODO')} disabled={isLoading} className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">Mark as Todo</button>
                )}
              </>
            )}

            {formData.status === 'Ready' && (
              <button onClick={() => handleStatusAction('VALIDATE')} disabled={isLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Validate</button>
            )}

            <button 
              onClick={handlePrint}
              disabled={formData.status !== 'Done'}
              className={`px-4 py-2 border rounded-lg font-medium transition flex items-center gap-2 ${formData.status === 'Done' ? 'bg-white text-gray-900 hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>

            {formData.status !== 'Done' && formData.status !== 'Cancelled' && (
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
          
          {/* Status Tabs */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold text-gray-900">Delivery Details</h2>
            <div className="flex gap-2">
              {['Draft', 'Ready', 'Done', 'Cancelled'].map(status => (
                <div
                  key={status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    formData.status === status
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Reference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
              <input type="text" value={formData.reference} disabled className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm" />
            </div>

            {/* Schedule Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
              <input 
                type="date" 
                name="scheduleDate" 
                value={formData.scheduleDate} 
                onChange={handleChange} 
                disabled={formData.status !== 'Draft'}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900" 
              />
            </div>

            {/* Deliver To (Address/Customer) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deliver To</label>
              <input 
                type="text" 
                name="deliverTo" 
                value={formData.deliverTo} 
                onChange={handleChange} 
                disabled={formData.status !== 'Draft'}
                placeholder="Customer Name or Address"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900" 
              />
            </div>

            {/* Responsible */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsible</label>
              <input type="text" value={formData.responsible} disabled className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm" />
            </div>

            {/* Operation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
              <input type="text" value={formData.operation} disabled className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>

          {/* Products Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Products</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    {formData.status === 'Draft' && <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={product.sku}
                          onChange={(e) => handleProductChange(index, 'sku', e.target.value)}
                          disabled={formData.status !== 'Draft'}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-transparent disabled:border-none"
                          placeholder="SKU"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                          disabled={formData.status !== 'Draft'}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-transparent disabled:border-none"
                          placeholder="Name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          disabled={formData.status !== 'Draft'}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-transparent disabled:border-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {product.quantity > product.inStock ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Low Stock</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Available</span>
                        )}
                      </td>
                      {formData.status === 'Draft' && (
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => removeProduct(index)} className="text-red-600 hover:text-red-900">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {formData.status === 'Draft' && (
              <button onClick={addProduct} className="mt-3 text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add new product
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default DeliveryForm;