import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const resetEmail = localStorage.getItem("resetEmail");

  const updatedUsers = users.map((user) => {
    if (user.email === resetEmail) {
      return { ...user, password: password };
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // clean temporary data
  localStorage.removeItem("resetEmail");
  localStorage.removeItem("resetOTP");

  alert("Password reset successful");
  navigate("/login");
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">🔒</div>

        <h2>Reset Password</h2>
        <p className="auth-subtext">
          Create a new password for your account
        </p>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword; 