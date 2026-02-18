import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="HireHelper"
          />
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your Hire-a-Helper account</p>

        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <span
              className="forgot"
              onClick={() => navigate("/forgot-password")}
              style={{ cursor: "pointer", color: "#2563eb" }}
            >
              Forgot your password?
            </span>
          </div>

          <button type="submit">Sign in</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;