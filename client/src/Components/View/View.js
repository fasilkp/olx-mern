import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'

import './View.css';
function View({ id }) {
  const [product, setProduct] = useState(null)
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/product/" + id);
      console.log(data)
      setProduct({ ...data.product, user: data.user })
    })()
  }, [])
  const baseImgUrl = "http://localhost:5000/uploads/"
  console.log(product)
  if (!product) {
    return null
  }
  return (

    <div className="viewParentDiv">
      <Container>
        <Row>
          <Col md={7} xs={12}>
            <div className="product-img">
              <img src={baseImgUrl + product.image.filename} alt="" />
            </div>
          </Col>
          <Col md={5} xs={12}>
            <div className="product-details-container">
              <div className="product-detail">
                <h2>₹ {product.price}</h2>
                <p>{product.name}</p>
                <div className="product-date">
                  <p>{product.category}</p>
                  <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="product-detail">
                <h4>Description</h4>
                <pre>{product.description}</pre>
              </div>
              <div className="product-detail">
                <b>Contact with seller</b>
                <h4>{product.user.name}</h4>
                <p>{product.user.mobile}</p>
                <a href={"tel:+91" + product.user.mobile}>
                  <Button>Call User</Button>
                </a>
              </div>
            </div>
          </Col>

        </Row>
      </Container>

    </div>
  );
}
export default View;
