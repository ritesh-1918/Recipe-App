// Add text indexing for search
recipeSchema.index({
  title: 'text',
  ingredients: 'text',
  instructions: 'text'
});

// Add pagination to recipe routes
router.get('/recipes', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  
  const recipes = await Recipe.find().skip(skip).limit(limit);
  res.json(recipes);
});