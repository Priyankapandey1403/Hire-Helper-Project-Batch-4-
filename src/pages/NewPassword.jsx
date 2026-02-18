import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPassword.css";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(""); // Email input to identify user
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();

    // Get all users from localStorage (or empty array)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      // Update password
      users[userIndex].password = newPassword;

      // Save back to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Password changed successfully!");
      navigate("/login");
    } else {
      alert("Email not found!");
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">Reset your password in a few steps.</p>

        <form onSubmit={handleChangePassword}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>New password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;