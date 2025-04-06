const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Only keep this ONE cors import
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware
app.use(compression());
app.use(express.json());

// Update CORS configuration to allow both local and deployed frontend
app.use(cors({
    origin: ['http://localhost:3000', 'https://recipe-app-frontend.vercel.app'],
    credentials: true
}));

// Remove these comments about CORS
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

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
  console.log('Direct registration endpoint hit with data:', req.body);
  res.json({
    message: 'Direct registration endpoint hit',
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Add these headers before your routes
// Remove these duplicate CORS headers
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// Then add your existing routes
// Fix the health-check endpoint - it was incorrectly nesting the test-connection endpoint
app.get('/api/health-check', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is healthy'
    });
});

// Add a separate test-connection endpoint
app.get('/api/test-connection', (req, res) => {
    res.json({
        success: true,
        message: 'Backend connection successful',
        serverTime: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;