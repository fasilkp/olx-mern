import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [name, setName] = useState('')
  const [errMsg, setErrMsg] = useState(null)
  const {refresh , setRefresh}=useContext(authContext)
  function validationErr() {
    if (
      email.replaceAll(" ", "") === "" ||
      password.replaceAll(" ", "") === "" ||
      name.replaceAll(" ", "") === "" ||
      mobile.toString().length !== 10
    ) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let {data}=await axios.post("/register", {
      name, email, password, mobile
    });
    console.log(data)
    if(!data.error){
      setRefresh(!refresh)
    }else{
      setErrMsg(data.message)
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <div className="logo">
          <img width="200px" height="200px" src={Logo}></img>
        </div>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={mobile}
            placeholder='mobile'
            onChange={(e) => setMobile(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          { errMsg &&
            <p style={{ color: "red" }}>{errMsg}</p>
          }
          <button disabled={validationErr()} onClick={handleSubmit}>Signup</button>
        </form>
        <Link to="/login">Already have an accout? Login</Link>
      </div>
    </div>
  );
}
