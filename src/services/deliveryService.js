import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust if needed

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const deliveryService = {
  // Get all deliveries
  getAll: async () => {
    const response = await api.get('/deliveries');
    return response.data;
  },

  // Get single delivery
  getById: async (id) => {
    const response = await api.get(`/deliveries/${id}`);
    return response.data;
  },

  // Create new delivery
  create: async (data) => {
    const response = await api.post('/deliveries', data);
    return response.data;
  },

  // Update delivery details
  update: async (id, data) => {
    const response = await api.patch(`/deliveries/${id}`, data);
    return response.data;
  },

  // Update status (TODO/VALIDATE/CANCEL)
  updateStatus: async (id, action) => {
    const response = await api.patch(`/deliveries/${id}/status`, { action });
    return response.data;
  },

  // Delete delivery
  delete: async (id) => {
    const response = await api.delete(`/deliveries/${id}`);
    return response.data;
  },
};