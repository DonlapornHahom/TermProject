import React, { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
import "./styles/App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Add from "./pages/Add";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token is present in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    // Update state to reflect logout
    setLoggedIn(false);
    // Redirect to the home page or any other desired page
    navigate("/");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="row-center">
          <img src={Logo} width={50} height={50} />
          <p>DONCHA SHOP</p>
        </div>

        <div className="nav-icon">
          {/* Conditionally render Add Product and Logout buttons based on login status */}
          {loggedIn && (
            <Link to="/add">
              <button className="nav-button">Add Product</button>
            </Link>
          )}
          {loggedIn && (
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          )}
          {!loggedIn && (
            <Link to="/login">
              <button className="nav-button">Sign In</button>
            </Link>
          )}
          {!loggedIn && (
            <Link to="/signup">
              <button className="nav-button">Sign Up</button>
            </Link>
          )}
        </div>
      </header>
      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/add"
            element={loggedIn ? <Add /> : navigate("/login")}
          />
        </Routes>
      </div>
      <footer className="footer">
        <p>CS369 Group Project</p>
        <p className="name">6309681531 มณสิชา วงษ์กราน</p>
        <p className="name">6309610027 ดลพร หาหอม</p>
      </footer>
    </div>
  );
}

export default App;
