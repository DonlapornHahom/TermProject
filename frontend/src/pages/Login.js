import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to login");
      }

      // Save the token in local storage or context
      localStorage.setItem("token", data.token);

      // Redirect to the home page or any other page
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <Link to="/">
          <div className="row-center">
            <img src={Logo} width={50} height={50} />
            <p>TERM PROJECT</p>
          </div>
        </Link>
      </header>
      <div className="main-content center-content">
        <div className="login-form">
          <form className="inside-form" onSubmit={handleLogin}>
            <h1 className="header-form">Sign In</h1>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="error">{error}</div>}
            </div>
            <button type="submit" className="form-button width-100">
              Login
            </button>
          </form>
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

export default Login;
