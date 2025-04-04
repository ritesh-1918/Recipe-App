import api from './api';

export const getAllRecipes = async (page = 1) => {
  const response = await api.get(`/api/recipes?page=${page}`);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await api.get(`/api/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const token = localStorage.getItem('userToken');
  const response = await api.post('/api/recipes', recipeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateRecipe = async (id, recipeData) => {
  const token = localStorage.getItem('userToken');
  const response = await api.put(`/api/recipes/${id}`, recipeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteRecipe = async (id) => {
  const token = localStorage.getItem('userToken');
  const response = await api.delete(`/api/recipes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};