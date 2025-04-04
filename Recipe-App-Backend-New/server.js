const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware
app.use(compression()); // Compress all responses
app.use(express.json());
app.use(cors({
  origin: '*', // For testing, allow all origins
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log('DB connected successfully...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Import routes
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Recipe API is running');
});

// Debug route to check if server is receiving requests
app.get('/debug', (req, res) => {
  res.json({
    message: 'Debug endpoint working',
    routes: {
      recipes: '/api/recipes',
      users: '/api/users',
      register: '/api/users/register'
    }
  });
});

// Add a direct registration route for testing
app.post('/direct-register', (req, res) => {
  res.json({
    message: 'Direct registration endpoint hit',
    body: req.body
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;