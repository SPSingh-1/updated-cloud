import React, { useContext, useEffect } from 'react'
import userContext from '../context/notes/userContext';

const MyAccount = (props) => {
    const { user, getUser, loading } = useContext(userContext);//Access Context
    const{updateUser} = props;

    useEffect(() => {
      getUser();// Fetch user details when the component mounts
      // eslint-disable-next-line
    }, []);
    // console.log("User in MyAccount:", user); // Debugging log

  return (
    <div className='container w-50 h-auto'>
      <div className=" border border-dark bg-light p-3 ">
      <div className="d-flex flex-column align-items-end">
        <button className='btn btn-primary '
                onClick={() => updateUser(user)} // Check if user exists before calling updateUser
                disabled={!user}// Disable button if user is undefined
        >
          Edit
        </button>
      </div>
      <h1>My Account Details</h1>
      {loading ? (
        <p>Loding user details...</p>
       ): user ? (
        <div>
            <p>Name: {user.name}</p>
            <p>Father Name: {user.fathername}</p>
            <p>Mother Name: {user.mothername}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Email: {user.email}</p>
            <p>Phone No.: {user.phoneno}</p>
            <p>Date: {user.Date}</p>
        </div>  
      ) : (<>
        <p>No user details available.</p>
        <p>Loding user details...</p>
        </>
      )}
      </div>
    </div>
  );
};

export default MyAccount
