import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/recipe';
import './Home.css';

// Default featured recipes to show when API fails or is empty
const defaultRecipes = [
  {
    id: 'default1',
    title: 'Creamy Garlic Parmesan Pasta',
    description: 'A rich and creamy pasta dish that\'s perfect for a quick weeknight dinner.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80',
    cookingTime: 25,
    servings: 4
  },
  {
    id: 'default2',
    title: 'Classic Margherita Pizza',
    description: 'Simple yet delicious pizza with fresh basil, mozzarella, and tomato sauce.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
    cookingTime: 35,
    servings: 2
  },
  {
    id: 'default3',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a gooey molten center.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
    cookingTime: 20,
    servings: 4
  },
  {
    id: 'default4',
    title: 'Grilled Salmon with Lemon Butter',
    description: 'Healthy and flavorful salmon with a zesty lemon butter sauce.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80',
    cookingTime: 15,
    servings: 2
  },
  {
    id: 'default5',
    title: 'Vegetable Stir Fry',
    description: 'Quick and nutritious stir fry loaded with colorful vegetables.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
    cookingTime: 20,
    servings: 3
  },
  {
    id: 'default6',
    title: 'Homemade Beef Tacos',
    description: 'Delicious tacos with seasoned ground beef and all the fixings.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80',
    cookingTime: 30,
    servings: 4
  }
];

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await getRecipes();
        
        // If we have recipes from the API, use them
        if (recipes && recipes.length > 0) {
          // Get 6 random recipes to feature
          const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 6);
          setFeaturedRecipes(randomRecipes);
        } else {
          // Otherwise use our default recipes
          setFeaturedRecipes(defaultRecipes);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        // Use default recipes if API fails
        setFeaturedRecipes(defaultRecipes);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {/* Hero Carousel Section */}
      <Carousel fade className="home-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
            alt="Delicious Food"
          />
          <Carousel.Caption>
            <h1>CulinaryCanvas</h1>
            <p>Discover, Create, and Share Amazing Recipes</p>
            <Link to="/register">
              <Button variant="success" size="lg" className="hero-button">Join Our Community</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80"
            alt="Cooking Experience"
          />
          <Carousel.Caption>
            <h1>Unleash Your Creativity</h1>
            <p>Share your culinary masterpieces with food enthusiasts worldwide</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
            alt="Food Community"
          />
          <Carousel.Caption>
            <h1>Connect With Chefs</h1>
            <p>Learn from others and improve your cooking skills</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Featured Recipes Section */}
      <Container className="py-5">
        <h2 className="section-title">Featured Recipes</h2>
        <div className="featured-recipes">
          {loading ? (
            <p className="text-center">Loading recipes...</p>
          ) : (
            <Row>
              {featuredRecipes.map(recipe => (
                <Col md={4} key={recipe._id || recipe.id} className="mb-4">
                  <div className="recipe-card">
                    <div className="recipe-image-container">
                      <img 
                        className="recipe-image"
                        src={recipe.image || 'https://via.placeholder.com/300x200?text=Recipe'} 
                        alt={recipe.title} 
                      />
                    </div>
                    <div className="recipe-content">
                      <h3>{recipe.title}</h3>
                      <p>{recipe.description || 'Delicious homemade recipe'}</p>
                      <div className="recipe-meta">
                        <span><i className="far fa-clock"></i> {recipe.cookingTime || '30'} mins</span>
                        <span><i className="fas fa-utensils"></i> {recipe.servings || '4'} servings</span>
                      </div>
                      <Link to={`/recipe/${recipe._id || recipe.id}`} className="view-recipe">
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>

      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <Container>
          <h2 className="section-title">How It Works</h2>
          <Row>
            <Col md={4}>
              <div className="step-card">
                <div className="step-icon">1</div>
                <h3 className="text-center">Create an Account</h3>
                <p className="text-center">Sign up for free and become part of our culinary community.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-card">
                <div className="step-icon">2</div>
                <h3 className="text-center">Share Your Recipes</h3>
                <p className="text-center">Upload your favorite recipes with photos and detailed instructions.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-card">
                <div className="step-icon">3</div>
                <h3 className="text-center">Discover & Connect</h3>
                <p className="text-center">Find new recipes and connect with other food enthusiasts.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;