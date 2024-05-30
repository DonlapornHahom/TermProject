import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../App.css";

function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productImage: "",
    productSize: "",
  });
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }

    if (
      !data.productName ||
      !data.productPrice ||
      !data.productDescription ||
      !image
    ) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      // Upload the image
      const formData = new FormData();
      formData.append("file", image);
      const uploadResponse = await Axios.post("/api/upload", formData);

      // Get the image path from the upload response
      const imagePath = uploadResponse.data.path;

      // Submit the product with the image path
      const productResponse = await Axios.post(
        "/api/product",
        {
          productName: data.productName,
          productPrice: data.productPrice,
          productDescription: data.productDescription,
          productSize: data.productSize,
          productImage: imagePath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product added:", productResponse.data);

      // Redirect to home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleFileChange = (e) => {
    const newimage = e.target.files[0];
    setImage(newimage);
  };

  return (
    <div className="app">
      <header className="header">
        <h2>Add Product</h2>
        <div className="nav-icon">
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
        </div>
      </header>
      <div className="content-center">
        <form className="content" onSubmit={submit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              className="form-control"
              onChange={handle}
              id="productName"
              value={data.productName}
              placeholder="Product's Name"
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              className="form-control"
              onChange={handle}
              id="productPrice"
              value={data.productPrice}
              placeholder="Product's Price"
              type="number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productSize">Size:</label>
            <select
              className="form-control"
              onChange={handle}
              id="productSize"
              value={data.productSize}
            >
              <option value="" disabled>
                Select Size
              </option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              className="form-control"
              onChange={handleFileChange}
              id="productImage"
              type="file"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              onChange={handle}
              id="productDescription"
              value={data.productDescription}
              placeholder="Product's Description"
            />
          </div>
          <button className="nav-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
        <p className="name">6309681531 มณสิชา วงษ์กราน</p>
        <p className="name">6309610027 ดลพร หาหอม</p>
      </footer>
    </div>
  );
}

export default Add;
