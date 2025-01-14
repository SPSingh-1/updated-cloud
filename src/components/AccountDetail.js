import React, { useContext, useRef, useState } from 'react'
import MyAccount from './MyAccount'
import userContext from '../context/notes/userContext';

const AccountDetail = (props) => {
    const context = useContext(userContext);
    const{ editUser, getUser } = context;

      const ref = useRef(null)
      const refClose = useRef(null)
    
      //set the fome in update fome or when you click on edit button
      const [User, setUser] = useState({id:"", upname: "", upfathername: "", upmothername: "", upphoneno:"", email:"", updob:"" });

      const updateUser = (currentUser) => {
        if (!currentUser || !currentUser._id) {
          console.error("Invalid user data:", currentUser);
          props.showAlert("Invalid user data. Cannot edit.", "error");
          return;  
        } 

        ref.current.click(); // Trigger modal
        setUser({
          id: currentUser._id,
          upname: currentUser.name || "",
          upfathername: currentUser.fathername || "",
          upmothername: currentUser.mothername || "",
          upphoneno: currentUser.phoneno || "",
          updob: currentUser.dob || "",
          email: currentUser.email || "",
        });
      };

      const onChange = (e)=>{
        setUser({...User, [e.target.name]: e.target.value})
     }
      const handleUpdate = async ()=>{
        // console.log("Updating.user...",user)
        await editUser(User.id, User.upname, User.upfathername, User.upmothername, User.upphoneno, User.updob )
        refClose.current.click();
        props.showAlert("user Updated successfully", "success")
        getUser();// Refresh user detail after update
      };
  return (
    <div>
      <MyAccount showAlert={props.showAlert} updateUser={updateUser} />
      {/* Hidden button to trigger modal*/}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editUserModal">
      Launch modal
    </button>

    {/* Modal*/}
    <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true" data-bs-backdrop="static"
        data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">Edit user</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

          <form className="my-3">
          <div className="mb-3">
            <label htmlFor="upname" className="form-label" >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="upname"
              name="upname"
              value={User.upname}
              onChange={onChange}         
            />
            <span id="upname-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="upfathername" className="form-label" >
              Father Name
            </label>
            <input
              type="text"
              className="form-control"
              id="upfathername"
              name="upfathername"
              value={User.upfathername}
              onChange={onChange}         
            />
            <span id="upfathername-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="upmothername" className="form-label" >
              Mother Name
            </label>
            <input
              type="text"
              className="form-control"
              id="upmothername"
              name="upmothername"
              value={User.upmothername}
              onChange={onChange}         
            />
            <span id="upmothername-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="updob" className="form-label" >
              Date of Birth
            </label>
            <input
              type="Date"
              className="form-control"
              id="updob"
              name="updob"
              value={User.updob}
              onChange={onChange}         
            />
            <span id="updob-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" >
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={User.email}
              readOnly // Prevent editing email
            />
            <span id="email-error"></span>
          </div>
          <div className="mb-3">
            <label htmlFor="upphoneno" className="form-label" >
              Phone No.
            </label>
            <input
              type="number"
              className="form-control"
              id="upphoneno"
              name="upphoneno"
              value={User.upphoneno}
              onChange={onChange}

            />
            <span id="upphoneno-error"></span>
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button  onClick={handleUpdate}
                type="button"
                className="btn btn-primary"
                disabled={!User.upname || User.upphoneno.length < 10}
                >
                  Update Details
                </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      </div>
    </div>
  )
}

export default AccountDetail
