import axios from 'axios';

const API_URL = 'https://recipe-app-backend-new.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;