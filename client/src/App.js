import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useState } from "react";

import CollegeContext from './Context/CollegeContext';


import Home from "./components/Home";
import Dashboard from './components/Dashboard'


function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const login = (loggedInUser, navigate) => {
    setUser({...loggedInUser});
    setLoginStatus(true);
    navigate("/dashboard");
  }

  const logout = (navigate) => {
    setUser(null);
    setLoginStatus(false);
    setStudents([]);
    navigate("/");
  }

  return (
    <CollegeContext.Provider value={{
      loginStatus: loginStatus,
      user: user,
      setUser: setUser,
      students: students,
      login: login,
      logout: logout,
      setStudents: setStudents,
    }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="*" element={<h3>Error 404</h3>}></Route>
        </Routes>
      </Router>
    </CollegeContext.Provider>
    
  );
}

export default App;
