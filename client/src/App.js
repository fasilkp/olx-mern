import React, { useContext, useEffect } from 'react';
import './App.css';
import Create from './Pages/Create'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ViewPost from './Pages/ViewPost'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'
import Home from './Pages/Home';
import { authContext } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Pages/Search';


function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
  const {setRefresh, refresh, user, setUser}=useContext(authContext)
  useEffect(()=>{
    (async function(){
      let { data } = await axios.get("/check-auth");
      setUser({ login: data.loggedIn, details:data.user })
    })()
  },[refresh])
  console.log(user)
  return (
    <div>

      <Router>
      {
          user.login === false &&
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sell' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:id' element={<ViewPost />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      }
      {
          user.login &&
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sell' element={<Create />} />
          <Route path='/login' element={<Navigate to='/' />} />
          <Route path='/signup' element={<Navigate to="/" />} />
          <Route path='/product/:id' element={<ViewPost />} />
          <Route path='/search' element={<Search />} />

        </Routes>
      }
      </Router>
      
    </div>
  );
}

export default App;
