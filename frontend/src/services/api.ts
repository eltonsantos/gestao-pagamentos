import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do seu back-end
});

export const fetchSellers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};