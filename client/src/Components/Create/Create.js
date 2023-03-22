import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { authContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState("")
  const [errMsg, setErrMsg] = useState(null)
  const { user } = useContext(authContext)
  const navigate = useNavigate()

  function validationErr() {
    if (
      name.replaceAll(" ", "") === "" ||
      category.replaceAll(" ", "") === "" ||
      description.replaceAll(" ", "") === "" ||
      !image

    ) {
      return true;
    }
    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let { data } = await axios.post('/add-product', { image, name, category, price, description, userId: user.details._id }, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    if (data.error) {
      setErrMsg(data.error.message);
    } else {
      navigate("/")
    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              placeholder='product name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              placeholder='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}

            />
            <br />
            <br />
            <label htmlFor="fname">Description</label>
            <br />
            <textarea name="" id="" cols="30" rows="4" value={description} placeholder="Description"
              onChange={(e) => setDescription(e.target.value)} ></textarea>
            <br />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
              type="number"
              id="fname"
              name="Price"
              placeholder='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <br />
            {image &&
              <img alt="Posts" width="200px" height="200px" style={{ objectFit: "contain" }} src={URL.createObjectURL(image)}></img>
            }
            <br />
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            <br />
            <br />
            {errMsg &&
              <p style={{ color: "red" }}>{errMsg}</p>
            }
            <button className="uploadBtn" disabled={validationErr()} onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
