import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes } from '../services/recipe';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div className="loading">Loading recipes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recipe-list-container">
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found. Be the first to add one!</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <img 
                src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={recipe.title} 
                className="recipe-image"
              />
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p>{recipe.description.substring(0, 100)}...</p>
                <Link to={`/recipe/${recipe._id}`} className="view-button">
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;