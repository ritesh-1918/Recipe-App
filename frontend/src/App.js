import React from 'react'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// Remove unused import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Home />
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={ <Home /> } />
      </Routes>
    </Router>
  )
}

export default App

// Fix unused import warning
import { Navigate } from 'react-router-dom';  // Remove this if unused