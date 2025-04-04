const express = require('express');
const router = express.Router();

// Get all recipes
router.get('/', (req, res) => {
  res.json({ message: 'Get all recipes endpoint' });
});

// Get one recipe
router.get('/:id', (req, res) => {
  res.json({ message: `Get recipe with id ${req.params.id}` });
});

// Create recipe
router.post('/', (req, res) => {
  res.json({ message: 'Create recipe endpoint', data: req.body });
});

// Update recipe
router.put('/:id', (req, res) => {
  res.json({ message: `Update recipe with id ${req.params.id}`, data: req.body });
});

// Delete recipe
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete recipe with id ${req.params.id}` });
});

module.exports = router;