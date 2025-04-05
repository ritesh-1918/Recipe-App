import AppHeader from './component/AppHeader'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import CreateRecipe from './pages/CreateRecipe'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css'

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App