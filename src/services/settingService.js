import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const settingsService = {
  // --- WAREHOUSE ---
  getWarehouses: async () => {
    const response = await api.get('/warehouses');
    return response.data;
  },

  createWarehouse: async (data) => {
    const response = await api.post('/warehouses', data);
    return response.data;
  },

  deleteWarehouse: async (id) => {
    const response = await api.delete(`/warehouses/${id}`);
    return response.data;
  },

  // --- LOCATION ---
  getLocations: async () => {
    const response = await api.get('/locations');
    return response.data;
  },

  createLocation: async (data) => {
    const response = await api.post('/locations', data);
    return response.data;
  },

  deleteLocation: async (id) => {
    const response = await api.delete(`/locations/${id}`);
    return response.data;
  }
};