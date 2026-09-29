import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const submitLead = async (leadData) => {
  try {
    const res = await api.post('/leads', leadData);
    return res.data;
  } catch (err) {
    console.warn('API offline, returning local success for lead:', leadData);
    return { success: true, local: true, data: leadData };
  }
};

export const fetchStates = async (params = {}) => {
  try {
    const res = await api.get('/states', { params });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const fetchProducts = async () => {
  try {
    const res = await api.get('/products');
    return res.data;
  } catch (err) {
    return null;
  }
};

export default api;
