import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyCode.css";

const VerifyCode = () => {
  console.log("VerifyCode component loaded 🔥");

  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    console.log("Verify button clicked ✅");

    const storedOTP = localStorage.getItem("resetOTP");

    if (!storedOTP) {
      alert("No OTP found. Please request a new one.");
      return;
    }

    if (code === storedOTP) {
      alert("Code verified successfully!");
      navigate("/new-password");
    } else {
      alert("Invalid verification code");
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleVerify}>
          <label>Verification code</label>
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            required
          />

          <button type="submit">Verify Code</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;