// Add user service functions
export const userService = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/me')
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