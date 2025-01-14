import UserContext from "./userContext";
import { useState } from "react";

const UserProvider = (props) => {
  const host = "http://localhost:5000";
  const [user, setUser] = useState(null);// Default user to null
  const [loading, setLoading] = useState(true);// Add loading state

  // get User detail
  const getUser = async () => {
    setLoading(true);// Start loding
    //api call
    try{
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
      },
    });

    if(!response.ok){
      throw new Error(`http Error: ${response.status}`);
    }

    const json = await response.json();
    // console.log("Fetched user data:", json); // Debugging log
    setUser(json);// Update state
  } catch(error) {
    console.error("Error fetching user data:",error.message);
  } finally {
    setLoading(false); //stop lodaing
  }   
  };

    //Edit a User Details
    const editUser = async (id, name, fathername, mothername, phoneno, dob) => {
      //Api Call
      const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authToken":localStorage.getItem('token')
        },
        body: JSON.stringify({ name, phoneno, dob }),
      });
      const json = await response.json();
      console.log(json);
  
      let newUser = JSON.parse(JSON.stringify(user))//Make a deep copy
      //Logic to edit in client
      for (let index = 0; index < newUser.length; index++) {
        const element = newUser[index];
        if (element._id === id) {
          newUser[index].name = name;
          newUser[index].fathername = fathername;
          newUser[index].mothername = mothername;
          newUser[index].phoneno = phoneno;
          newUser[index].dob = dob;
          break;
        }
        
      }
      setUser(newUser);
    };
return (
  <UserContext.Provider
    value={{ user, getUser, loading, editUser }}
  >
    {props.children}
  </UserContext.Provider>
);
};

export default UserProvider;