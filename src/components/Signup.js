import React, {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';


const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""});
    const [error, setError] = useState(""); // State for error message
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  //clere error msg
    try{
        const {name, fathername, mothername, email, phoneno, password, dob} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, fathername, mothername, email, phoneno, password, dob})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save the auth token and redirect
            // localStorage.setItem('token',json.authToken);
            props.showAlert("Account created Successfully", "success")
            history("/SuccessSignUp");
        }
        else{
            setError("Invalid detail.Please check the whole details and try again."); // Set error message
            props.showAlert("Invalid Details", "danger")
        }
      }catch (error) {
        setError("Something went wrong. Please try again later."); // Handle network errors
        }
      };

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
     }
     const handleEmailValidation = () => {
      const email = credentials.email;
      if (email !== email.toLowerCase()) {
        alert("Please enter the email in lowercase.");
        setCredentials({ ...credentials, email: email.toLowerCase() }); // Optionally, auto-correct
      }
    };
  return (
    <div className="container w-50 h-auto">
    <div className="d-flex flex-column align-items-center border border-dark bg-light p-3">
      <h2>Let's signup for notes</h2>
    {error && <p style={{ color: "red" }}>{error}</p>} {/*Error message*/}
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlhtmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="fathername" className="form-label">Father Name</label>
    <input type="text" className="form-control" id="fathername" name="fathername" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="mothername" className="form-label">Mother Name</label>
    <input type="text" className="form-control" id="mothername" name="mothername" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
    onBlur={handleEmailValidation}/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="email" className="form-label">Phone no.</label>
    <input type="text" className="form-control" id="phoneno" name="phoneno" onChange={onChange} aria-describedby="phoneno"/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="email" className="form-label">Date of Birth</label>
    <input type="date" className="form-control" id="dob" name="dob" onChange={onChange} aria-describedby="dob"/>
  </div>
  <div className="d-flex flex-column">
  <label className="form-check-label my-1" htmlhtmlFor="flexRadioDefault1">Gender</label>
  <div className="form-check form-check-inline my-1">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked/>
  <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
</div>
<div className="form-check form-check-inline my-1">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
  <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
</div>
</div>
  <div className="mb-3">
    <label htmlhtmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <div className='d-flex flex-column align-items-end'>
  <button type="submit" className="btn btn-primary">SingUp</button>
  <Link className="d-flex flex-coloum" to="/login" role="text">
    Go to Login
  </Link>
  </div>
</form>
    </div>
    </div>
  );
}

export default Signup;
