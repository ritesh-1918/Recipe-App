const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    // Add proper validation
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    // Rest of your registration logic
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'User routes are working' });
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