import api from './api';

// Export as userService instead of authService to match imports in components
export const userService = {
  register: async (userData) => {
    try {
      console.log('Sending registration request:', userData);
      const response = await api.post('/api/users/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await api.post('/api/users/login', credentials);
      localStorage.setItem('userToken', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token ? true : false;
  }
};

// Add this method to your existing auth.js file
// This is just a sample implementation - you'll need to adjust based on your actual API

// Add this method to the userService object
updateProfile: async (userData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('You must be logged in to update your profile');
    }
    
    const response = await api.put('/api/users/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Update the stored user data
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const updatedUser = { 
      ...currentUser, 
      username: userData.username,
      email: userData.email
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}