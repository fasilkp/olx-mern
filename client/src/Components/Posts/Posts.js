import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Heart from '../../assets/Heart';
import './Post.css';

function Posts({products}) {
  const baseImgUrl='http://localhost:5000/uploads/'

  return (
    <div className="postParentDiv">
      <Container>

      <div className="moreView">
        <div className="heading">
          <b>Products</b>
          {/* <span>View more</span> */}
        </div>
        <Row>

          
        {
            products.map((item, index) => {
              return (
                <Col md={3}>

                <Link to={"/product/"+item._id}>
                <div className="card mt-3" key={index} > 
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={baseImgUrl+item.image.filename} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {item.price}</p>
                    <span className="kilometer">{item.category}</span>
                    <p className="name">{item.name.toUpperCase()}</p>
                  </div>
                  <div className="date">
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                </Link>
                </Col>

              )
            })
          }

         
</Row>
        
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
      </Container>
    </div>
  );
}

export default Posts;
