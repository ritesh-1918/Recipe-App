import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserRecipes } from '../services/recipe';
// Remove any import of Navbar here if it exists
import './Dashboard.css';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const userRecipes = await getUserRecipes();
        setRecipes(userRecipes || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  return (
    // Make sure there's no Navbar component being rendered here
    <Container className="dashboard-container py-4">
      <h1 className="mb-4">My Dashboard</h1>
      
      <div className="stats-card mb-5">
        <h2 className="text-center">{recipes.length}</h2>
        <p className="text-center">My Recipes</p>
        <div className="text-center mt-3">
          <Link to="/create-recipe">
            <Button variant="primary">Create New Recipe</Button>
          </Link>
        </div>
      </div>

      <h2 className="mb-4">My Recipes</h2>
      
      {loading ? (
        <p>Loading your recipes...</p>
      ) : recipes.length === 0 ? (
        <div className="text-center py-5">
          <p>You haven't created any recipes yet.</p>
          <Link to="/create-recipe">
            <Button variant="success">Create Your First Recipe</Button>
          </Link>
        </div>
      ) : (
        <Row>
          {recipes.map(recipe => (
            <Col md={4} key={recipe._id} className="mb-4">
              <div className="recipe-card">
                <img 
                  src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={recipe.title} 
                  className="recipe-image"
                />
                <div className="recipe-content">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description || recipe.instructions.substring(0, 100) + '...'}</p>
                  <div className="recipe-actions">
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-sm btn-primary">View</Link>
                    <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-sm btn-secondary">Edit</Link>
                    <Button variant="danger" size="sm">Delete</Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;