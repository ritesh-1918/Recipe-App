const express = require('express');
const router = express.Router();

// Register user
router.post('/register', (req, res) => {
  res.json({ message: 'Register user', data: req.body });
});

// Login user
router.post('/login', (req, res) => {
  res.json({ message: 'Login user', data: req.body });
});

// Get current user
router.get('/me', (req, res) => {
  res.json({ message: 'Get current user' });
});

module.exports = router;