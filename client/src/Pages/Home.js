import React, { useEffect, useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import axios from 'axios';

function Home(props) {
  const [products, setProducts]=useState([])
  useEffect(()=>{
    (async function(){
        let {data}= await axios.get("/products");
        setProducts(data.products)
        console.log("hai")
    })()
  },[])
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts products={products} />
      <Footer />
    </div>
  );
}

export default Home;
 
