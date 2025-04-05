import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createRecipe } from '../services/recipe';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/auth';

const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    servings: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Check if user is logged in
      if (!userService.getCurrentUser()) {
        setError('You must be logged in to create a recipe');
        return;
      }
      
      // Format ingredients as an array
      const ingredientsArray = recipeData.ingredients
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      // Create the recipe
      await createRecipe({
        title: recipeData.title,
        ingredients: ingredientsArray,
        instructions: recipeData.instructions,
        cookingTime: parseInt(recipeData.cookingTime),
        servings: parseInt(recipeData.servings)
      });
      
      setSuccess(true);
      
      // Redirect to home after successful creation
      // Increase the redirect timeout to give more time to see the success message
      setTimeout(() => {
        navigate('/dashboard'); // Change to redirect to dashboard instead of home
      }, 5000); // Increase from 2000ms to 5000ms (5 seconds)
      
    } catch (error) {
      console.error('Error creating recipe:', error);
      setError(error.message || 'Failed to create recipe. Please try again.');
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Create New Recipe</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Recipe created successfully! Redirecting to home...</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients, one per line"
            rows={4}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            placeholder="Enter step-by-step instructions"
            rows={6}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cooking Time (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="cookingTime"
            value={recipeData.cookingTime}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Servings</Form.Label>
          <Form.Control
            type="number"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRecipe;