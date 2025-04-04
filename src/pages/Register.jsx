import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { userService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.register(formData);
      if(response.data) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" 
               onChange={e => setFormData({...formData, username: e.target.value})} />
    <input type="email" placeholder="Email"  />
    <input type="password" placeholder="Password"  />
    <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register