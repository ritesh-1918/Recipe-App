import api from './api';

export const userService = {
  login: async (credentials) => {
    const response = await api.post('/api/users/login', credentials);
    localStorage.setItem('userToken', response.data.token);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const token = localStorage.getItem('userToken');
    const response = await api.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  }
};