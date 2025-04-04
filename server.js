const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Added missing CORS import
require('dotenv').config();

// Remove duplicate app declaration
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware fixes
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// MongoDB connection with error handling
mongoose.connect(process.env.MONGODB_ATLAS_URI) // Not MONGO_URL
app.listen(process.env.PORT || 3000)
.then(() => console.log("DB connected successfully..."))
.catch(err => console.error("MongoDB connection error:", err));

// ... rest of your existing routes remain unchanged ...