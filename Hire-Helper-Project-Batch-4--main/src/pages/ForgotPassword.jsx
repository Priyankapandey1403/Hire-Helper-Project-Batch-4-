import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to send reset code");
        return;
      }

      // Store email for verification
      localStorage.setItem("resetEmail", email);
      alert("Reset code sent to your email");
      navigate("/verify-code");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p>Reset your password in a few steps.</p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <span className="back-link" onClick={() => navigate("/login")}>
          Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;