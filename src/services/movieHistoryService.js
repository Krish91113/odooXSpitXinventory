import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust based on your backend URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const moveHistoryService = {
  // Get all move history
  getAll: async () => {
    const response = await api.get('/move-history'); // Matches your route
    return response.data;
  },
};