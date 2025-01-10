/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Erro de autenticação:', error);
    }
    return Promise.reject(error);
  }
);

export const fetchPayments = async (filters: any) => {
  try {
    const response = await api.get('/payments', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    return { payments: [], total_value: 0, sellers: [] };
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await api.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return [];
  }
};