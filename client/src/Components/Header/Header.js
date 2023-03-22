import React, { useContext, useEffect, useRef, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext';
import { Dropdown, Form } from 'react-bootstrap';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { FormControl, MenuItem, Select } from '@mui/material';
function Header() {
  const { user, setRefresh, refresh, search, setSearch, category, setCategory } = useContext(authContext);


  async function handleLogout() {
    if (window.confirm("Are you sure logout ")) {
      await axios.get('/logout')
      setRefresh(!refresh)
    }
  }
  console.log(category)
  const navigate = useNavigate()
  const location = useLocation();
  const inputRef = useRef()

  const [categories, setCategories]=useState([])

  async function handleSearch(e) {
    e.preventDefault();
    setSearch(inputRef.current.value)
    if (location.pathname != "/search") {
      navigate("/search")
    }
  }
  function handleCategory(e){
    setCategory(e.target.value)
    if (location.pathname != "/search") {
      navigate("/search")
    }
  }
  useEffect(()=>{
    (async function(){
      let {data}= await axios.get("/categories");
      if(!data.error){
        setCategories(data.categories)
      }
    })()
  },[])
  return (
    <div className="headerParentDiv">
      <Container>

        <div className="headerChildDiv">
          <Link to="/">
            <div className="brandName">
              <OlxLogo></OlxLogo>
            </div>
          </Link>
          <div className="placeSearch">
            {/* <Search></Search>
          <Form.Select id="disabledSelect">
            <option>Disabled select</option>
          </Form.Select> */}
          <Search></Search>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder='Select category'
                value={category}
                onChange={handleCategory}
              >
                <MenuItem value=" ">All Category</MenuItem>
                {
                  categories.map((item, index)=>{
                    return (
                <MenuItem value={item._id}>{item._id}</MenuItem>

                    )
                  })
                }
              </Select>
            </FormControl>

            {/* <Arrow></Arrow> */}
          </div>

          <form onSubmit={handleSearch} className="productSearch">
            <div className="input">
              <input
                type="text"
                defaultValue={search}
                placeholder="Find car,mobile phone and more..."
                ref={inputRef}
              />
            </div>
            <div className="searchAction" onClick={handleSearch}>
              <Search color="#ffffff"></Search>
            </div>
          </form>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow></Arrow>
          </div>
          <div className="loginPage">
            {
              user.login ?
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdownBtnEmpty'>
                    {user.details.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                :
                <Link to="/login">
                  <span>Login</span>
                </Link>
            }
            <hr />
          </div>
          <Link to="/sell">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>
        </div>
      </Container>

    </div>
  );
}

export default Header;
