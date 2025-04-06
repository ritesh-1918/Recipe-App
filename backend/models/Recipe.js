const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add text indexing for search
RecipeSchema.index({
  title: 'text',
  ingredients: 'text',
  instructions: 'text'
});

module.exports = mongoose.model('Recipe', RecipeSchema);

// Add pagination to recipe routes
router.get('/recipes', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const recipes = await Recipe.find().skip(skip).limit(limit);
  res.json(recipes);
});