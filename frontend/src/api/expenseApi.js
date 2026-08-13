import axios from 'axios';

const rawApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const normalizedBase = rawApiUrl ? rawApiUrl.replace(/\/api\/?$/, '') : '';

// In production, VITE_API_URL should be the backend origin (Render URL).
// In development, Vite proxies /api to the local backend on port 5000.
const API_BASE_URL = normalizedBase ? `${normalizedBase}/api/expenses` : '/api/expenses';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchExpenses = async (category = '') => {
  const url = category ? `?category=${category}` : '';
  const response = await api.get(url);
  return response.data;
};

export const addExpense = async (expenseData) => {
  const response = await api.post('/', expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/${id}`, expenseData);
  return response.data;
};
