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

// Use routes
app.use('/api/recipes', recipeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Recipe API is running');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;