import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust to your backend port

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const stockService = {
  // Get all stock
  getAll: async () => {
    const response = await api.get('/stocks');
    return response.data;
  },

  // Update stock quantity (Manual adjustment)
  update: async (id, data) => {
    const response = await api.patch(`/stocks/${id}`, data);
    return response.data;
  }
};