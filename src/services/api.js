import axios from 'axios';

const API_URL = 'https://recipe-app-backend-new.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add the missing userService export
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

export default api;