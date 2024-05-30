import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { formatPrice } from "../utils";

function Product() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const hostName = window.location.origin;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch all products from the backend
        const response = await fetch(`/api/product`);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        // Parse the JSON data
        const products = await response.json();

        // Find the product with the matching ID
        const selectedProduct = products.find(
          (product) => product.productID.toString() === id
        );

        // Update the state with the fetched product data
        setProduct(selectedProduct);
      } catch (error) {
        // Handle any errors
        setError(error.message);
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div>Error fetching product: {error}</div>;
  }

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h2>{product.productName}</h2>
        <div className="nav-icon">
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
        </div>
      </header>
      <div className="product-detail">
        <h3>Product Detail</h3>
        <h2>{product.productName}</h2>
        <img
          src={`${hostName + "/api" + product.productImage}`}
          alt={product.productName}
        />
        <h4>Size : {product.productSize}</h4>
        <p>Price: {formatPrice(product.productPrice)} THB</p>
        <div style={{ width: "100%", textAlign: "center" }}>
          <p>{product.productDescription}</p>
        </div>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
        <p className="name">6309681531 มณสิชา วงษ์กราน</p>
        <p className="name">6309610027 ดลพร หาหอม</p>
      </footer>
    </div>
  );
}

export default Product;
