import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AuthForms from '../components/AuthForms';
import '../pages/Auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img src="./img2.png" alt="FLAVORBook Logo" className="auth-logo" />
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to continue to FLAVORBook' : 'Join our community of food enthusiasts'}
          </p>
        </div>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        
        <AuthForms 
          isLogin={isLogin} 
          onSuccess={() => window.location = '/create-recipe'}
        />
      </div>
    </div>
  );
};

export default AuthPage;