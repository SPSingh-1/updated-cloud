import React from "react";
import {Link, useNavigate} from "react-router-dom";
// import {Link,useLocation} from "react-router-dom";

const Navbar = () => {
  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);
  let history = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    history('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark ">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
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
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link active}`} aria-current="page" to="/home">
              {/* <Link className={`nav-link ${location.pathname==="/home"? "active": ""}`} aria-current="page" to="/home"> */}
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link }`} to="/about">
              {/* <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about"> */}
                About
              </Link>
            </li>
          </ul>
          </div>
          {!localStorage.getItem('token')?<form className="d-flex justify-content-end">

            <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>: <button onClick={handleLogout} className="btn btn-primary"> Logout</button>}
        
      </div>
    </nav>
  );
};

export default Navbar;
