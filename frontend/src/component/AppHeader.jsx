import React from 'react'
import {Link} from 'react-router-dom'

const AppHeader = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
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
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-light me-2">Login/Register</Link>
              <Link to="/profile" className="btn btn-success">My Account</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppHeader