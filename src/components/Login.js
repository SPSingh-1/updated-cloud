import React, { useState } from "react";
import {useNavigate,Link} from 'react-router-dom';



const Login = (props) => {
const [credentials, setCredentials] = useState({email: "", password: ""});
const [error, setError] = useState(""); // State for error message
let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  //clere error msg

    try{
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email,password: credentials.password})
    });

    const json = await response.json();
    console.log("Login Response:",json);//Debugging

    if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        history("/home");
        props.showAlert("Logged in Successfully", "success")
    }
    else{
      setError("Invalid email or password. Please try again."); // Set error message
        props.showAlert("Invalid credentials", "danger")
    }
  }catch (error) {
    setError("Something went wrong. Please try again later."); // Handle network errors
    }
  }
  

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
 }

  return (
    <>
     <div className="container w-auto h-auto">
     <div className="d-flex flex-column align-items-center border border-dark bg-light p-3">
    <h2>Login for storing notes</h2>
    {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
      <form onSubmit={handleSubmit} className="w-30">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <div className="d-flex flex-column align-items-end">
        <button type="submit" className="btn btn-primary" >
          Login
        </button>
        <Link className="d-flex flex-coloum" to="/signup" role="text">
          Go to Signup
        </Link>
        </div>
      </form>
      </div>
      </div>
    </>
  );
};

export default Login;
