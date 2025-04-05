import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/recipe';
import { userService } from '../services/auth';
import Navbar from '../component/Navbar';

const Dashboard = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const allRecipes = await getRecipes();
        // Filter recipes to only show the current user's recipes
        // This assumes your backend returns the user ID with each recipe
        const currentUser = userService.getCurrentUser();
        if (currentUser && currentUser.id) {
          const filteredRecipes = allRecipes.filter(recipe => 
            recipe.user === currentUser.id
          );
          setUserRecipes(filteredRecipes);
        } else {
          setUserRecipes([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user recipes:', err);
        setError('Failed to load your recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <h1 className="mb-4">My Dashboard</h1>
        
        <Row className="mb-4">
          <Col>
            <Card className="text-center p-4 bg-light">
              <Card.Body>
                <h2>{userRecipes.length}</h2>
                <p>My Recipes</p>
                <Link to="/create-recipe">
                  <Button variant="primary">Create New Recipe</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <h2 className="mb-3">My Recipes</h2>
        {loading ? (
          <p>Loading your recipes...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : userRecipes.length === 0 ? (
          <div className="text-center py-5">
            <p>You haven't created any recipes yet.</p>
            <Link to="/create-recipe">
              <Button variant="success">Create Your First Recipe</Button>
            </Link>
          </div>
        ) : (
          <Row>
            {userRecipes.map(recipe => (
              <Col md={4} key={recipe._id} className="mb-4">
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe+Image'} 
                    alt={recipe.title}
                  />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                      Cooking Time: {recipe.cookingTime} minutes<br/>
                      Servings: {recipe.servings}
                    </Card.Text>
                    <Link to={`/recipe/${recipe._id}`}>
                      <Button variant="outline-primary">View Recipe</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Dashboard;