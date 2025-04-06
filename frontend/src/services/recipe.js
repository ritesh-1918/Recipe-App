import api from './api';
import { userService } from './auth';

// Recipe service functions
export const createRecipe = async (recipeData) => {
  try {
    // Make sure user is authenticated
    if (!userService.getCurrentUser()) {
      throw new Error('You must be logged in to create a recipe');
    }
    
    const response = await api.post('/api/recipes', recipeData);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

export const getUserRecipes = async () => {
  try {
    // Make sure user is authenticated
    if (!userService.getCurrentUser()) {
      throw new Error('You must be logged in to view your recipes');
    }
    
    const response = await api.get('/api/recipes/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await api.get(`/api/recipes/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipes = async () => {
  try {
    const response = await api.get('/api/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
