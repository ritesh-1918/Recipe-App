// If this file exists, we need to make sure it's not being imported in Dashboard.jsx
// or any other component that's rendered alongside AppHeader
import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* Simplified brand with direct styling */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img 
                src="https://img.icons8.com/fluency/48/000000/chef-hat.png" 
                alt="Logo" 
                width="40" 
                height="40"
                style={{marginRight: '10px'}}
              />
              <span style={{
                color: '#ff6b6b', 
                fontWeight: 'bold',
                fontSize: '24px'
              }}>CulinaryCanvas</span>
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/auth">Login/Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/create-recipe">Create Recipe</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar