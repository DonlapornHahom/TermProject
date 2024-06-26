import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { formatPrice } from "../utils/index";

function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const hostName = window.location.origin;
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check for token in local storage
    setIsLoggedIn(!!token); // Update login status
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
    const sortedData = [...data].sort((a, b) => {
      if (e.target.value === "price") {
        return a.productPrice - b.productPrice;
      } else if (e.target.value === "name") {
        return a.productName.localeCompare(b.productName);
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleCheckboxChange = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDelete = async () => {
    try {
      // Create an array of objects containing both product ID and image name
      const productsToDelete = selectedProducts.map((id) => ({
        id,
        imageName: data.find((product) => product.productID === id)
          .productImage,
      }));

      await Axios.delete("/api/product", {
        data: { products: productsToDelete },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedProducts([]);
      const newData = data.filter(
        (product) => !selectedProducts.includes(product.productID)
      );
      setData(newData);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const filteredData = data.filter(
    (product) =>
      product.productName &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <div className="product-container">
      <h2 className="font-franc" style={{ margin: "10px 0 10px 0" }}>
        Product List
      </h2>

      <div className="controls">
        <input
          className="search-bar"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="sort-dropdown"
          onChange={handleSort}
          value={sortOption}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        {isLoggedIn && selectedProducts.length > 0 && (
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="product-list">
          {filteredData.map((product) => (
            <div key={product.productID} className="list_product_item">
              <Link
                to={`/product/${product.productID}`}
                className="product-link"
              >
                <img
                  className="product-img"
                  width={200}
                  height={250}
                  src={`${hostName + "/api" + product.productImage}`}
                />
                <div style={{ width: "100%" }}>
                  <h3>{product.productName}</h3>
                  <p>{formatPrice(product.productPrice)} THB</p>
                  <p className="description-box">
                    {truncateDescription(product.productDescription)}
                  </p>
                </div>
              </Link>
              {isLoggedIn && (
                <input
                  type="checkbox"
                  className="product-checkbox"
                  checked={selectedProducts.includes(product.productID)}
                  onChange={() => handleCheckboxChange(product.productID)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
