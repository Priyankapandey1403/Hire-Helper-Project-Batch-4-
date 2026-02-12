import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPassword.css";

const NewPassword = () => {
  console.log("NewPassword component loaded 🔥");

  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();

    console.log("Change password function running ✅");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      storedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));

      alert("Password changed successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Reset your password in a few steps.
        </p>

        <form onSubmit={handleChangePassword}>
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