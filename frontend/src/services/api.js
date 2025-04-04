import axios from 'axios';

// Add missing axios instance creation
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Update service exports to use the instance
export const recipeService = {
  getRecipes: () => api.get('/recipes'),
  submitRecipe: (recipeData) => api.post('/recipes', recipeData)
};

export const userService = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials)
};

// Add this error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('userToken');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);