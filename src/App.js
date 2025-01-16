import './App.css';
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signup from './components/Signup';
import Front from './components/FrontPage/Front';
import AccountDetail from './components/AccountDetail';
import SuccessSignUp from './components/SuccessSignUp';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(() => {
       setAlert(null);
    }, 1500);
  }
  return (
    <>
     <NoteState>
        <Router>
          <Navbar/>
          <Alerts alert={alert}/>
          <div className="container">
            <Routes>
                <Route path="/Updated-cloud"
                  element={<Front showAlert={showAlert}/>}
                />
                <Route path="/home"
                  element={<Home showAlert={showAlert}/>}
                />
                <Route path="/about"
                  element={<About showAlert={showAlert}/>}
                />
                <Route path="/account"
                  element={<AccountDetail showAlert={showAlert}/>}
                />
                <Route path="/login"
                  element={<Login showAlert={showAlert}/>}
                />
                <Route path="/signup"
                  element={<Signup showAlert={showAlert}/>}
                />
                <Route path="/successsignup"
                  element={<SuccessSignUp/>}
                />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
