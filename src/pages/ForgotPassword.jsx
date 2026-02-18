import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
  e.preventDefault();

  // Get all users (ARRAY)
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user with entered email
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    const otp = "123456"; // demo OTP
    localStorage.setItem("resetOTP", otp);
    localStorage.setItem("resetEmail", email);

    console.log("Reset code sent (Demo OTP: 123456)");
    navigate("/verify-code");
  } else {
    alert("Email not registered");
  }
};
  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p>Reset your password in a few steps.</p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Code</button>
        </form>

        <span className="back-link" onClick={() => navigate("/login")}>
          Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;