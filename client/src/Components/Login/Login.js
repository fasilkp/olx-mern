import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [errMsg, setErrMsg]=useState(null)
  const {refresh, setRefresh}=useContext(authContext)
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === "" 
    ) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e){
    e.preventDefault();
      let {data}= await axios.post("/login", {
        email, password
      });
      if(!data.error){
        setRefresh(!refresh)
      }else{
        setErrMsg(data.message)
      }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <div className="logo">
        <img width="200px" height="200px" src={Logo}></img>
        </div>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            placeholder='email'
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          { errMsg &&
            <p style={{ color: "red" }}>{errMsg}</p>
          }
          <button disabled={validationErr()} onClick={handleSubmit}>Login</button>
        </form>
        <Link to='/signup' > Don't Have Account create one</Link>
      </div>
    </div>
  );
}

export default Login;
