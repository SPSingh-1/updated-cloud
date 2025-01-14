import React from 'react'
import {Link} from 'react-router-dom';

const SuccessSignUp = () => {
  return (
    <div className="container w-70 h-auto">
    <div className='d-flex flex-column align-items-center border border-dark bg-light p-3'>
      <h2>You are Successfully Created an Account</h2>
      <Link className="d-flex flex-coloum" to="/login" role="text">
            Go to Login  
      </Link>
    </div>
    </div>
  )
}

export default SuccessSignUp
