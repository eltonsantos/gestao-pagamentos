import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchPayments = async () => {
  try {
    const response = await api.get('/payments');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
  }
};