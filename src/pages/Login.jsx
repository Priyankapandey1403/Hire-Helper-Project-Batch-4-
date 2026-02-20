import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with correct password
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("isAuth", "true");

      // Save logged-in user data
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      navigate("/dashboard");
    }
  };

   return (
<>
    <img
      src={require("../assets/handshake.jpg")}
      alt="Background"
      className="background-image"
    />
    <div className="login-wrapper">

      
      <div className="login-left">

        <h1>Welcome to Hire-a-Helper</h1>

        <p>Please login to continue</p>

      </div>

      
      <div className="login-right">

        <form onSubmit={handleSubmit} className="login-form">

          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>

          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>

        </form>

      </div>

    </div>
</>
  );

};

export default Login;
