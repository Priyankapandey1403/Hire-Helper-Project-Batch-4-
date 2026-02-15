import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    const storedOTP = localStorage.getItem("resetOTP");

    if (otp === storedOTP) {
      alert("OTP verified successfully");
      navigate("/reset-password");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>Verify OTP</h2>
        <p>Please enter the OTP sent to your email</p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;