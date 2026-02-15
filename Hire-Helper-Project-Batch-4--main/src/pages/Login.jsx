import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAuth", "true");
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
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

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

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

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;