const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'User routes are working' });
});

// Simple registration route
router.post('/register', (req, res) => {
  try {
    console.log('Registration endpoint hit', req.body);
    res.json({
      message: 'Registration endpoint working',
      receivedData: req.body
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login route
router.post('/login', (req, res) => {
  try {
    console.log('Login endpoint hit', req.body);
    res.json({
      message: 'Login endpoint working',
      receivedData: req.body
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;