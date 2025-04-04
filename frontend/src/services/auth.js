// Add to your frontend services
export const login = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/users/login', credentials);
  localStorage.setItem('userToken', response.data.token);
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('userToken');
  const response = await axios.get('http://localhost:5000/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};