import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/updated-cloud">
          My-Cloud
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav">
            {localStorage.getItem('token') && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-primary ${location.pathname === '/home' ? 'active' : ''}`}
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link text-primary ${location.pathname === '/about' ? 'active' : ''}`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </>
            )}
          </ul>
        <div className="collapse navbar-collapse d-flex justify-content-end " id="navbarNavDropdown">
            {localStorage.getItem('token') ? (
              <>
               <Link
                    className={`nav-link text-primary ${location.pathname === '/account' ? 'active' : ''}`}
                    to="/account"
                  >
                    <box-icon name='user' size="40px" color="white" className="mx-5" >
                    AccountDetail
                    </box-icon>
                  </Link>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
            ) : (
              <div className="d-flex justify-content-end ">
                <Link className="btn btn-primary mx-1" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">
                  Signup
                </Link>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;