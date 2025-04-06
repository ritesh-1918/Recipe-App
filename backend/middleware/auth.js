const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Public routes that don't require authentication
  const publicRoutes = ['/public', '/about', '/contact'];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  try {
    // Get token from header
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
}