import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const salesAPI = {
  getOverview: (period = 'daily') => api.get('/sales/overview', { params: { period } }),
  getCategorySales: (period = 'daily') => api.get('/sales/categories', { params: { period } }),
  getTopProducts: (limit = 10) => api.get('/sales/top-products', { params: { limit } }),
  getPeakHours: () => api.get('/sales/peak-hours'),
  getDetailedReport: (period = 'daily') => api.get('/reports/detailed', { params: { period } }),
  
  // NEW METHODS
  getSizeAnalytics: () => api.get('/analytics/sizes'),
  getPaymentAnalytics: () => api.get('/analytics/payments'),
  getWeekdayAnalytics: () => api.get('/analytics/weekday'),
};

export default api;