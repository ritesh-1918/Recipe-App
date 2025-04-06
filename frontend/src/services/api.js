import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:10000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;