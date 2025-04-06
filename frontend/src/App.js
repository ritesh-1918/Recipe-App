import AppHeader from './component/AppHeader.jsx'
import Home from './pages/Home.jsx'
import AuthPage from './pages/AuthPage.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
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
