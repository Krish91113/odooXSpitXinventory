import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust based on your backend URL

// Create axios instance with credentials for session handling
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const receiptService = {
  // Get all receipts
  getAll: async () => {
    const response = await api.get('/receipts');
    return response.data;
  },

  // Get single receipt
  getById: async (id) => {
    const response = await api.get(`/receipts/${id}`);
    return response.data;
  },

  // Create new receipt
  create: async (data) => {
    const response = await api.post('/receipts', data);
    return response.data;
  },

  // Update receipt details
  update: async (id, data) => {
    const response = await api.patch(`/receipts/${id}`, data);
    return response.data;
  },

  // Update status (TODO/VALIDATE/CANCEL)
  updateStatus: async (id, action) => {
    const response = await api.patch(`/receipts/${id}/status`, { action });
    return response.data;
  },

  // Delete receipt
  delete: async (id) => {
    const response = await api.delete(`/receipts/${id}`);
    return response.data;
  },
};