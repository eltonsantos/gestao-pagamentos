import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchPayments = async (filters: any) => {
  try {
    const response = await api.get('/payments', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    return { payments: [], total_value: 0 };
  }
};