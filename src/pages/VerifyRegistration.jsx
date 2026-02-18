import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerifyRegistration.css";

const VerifyRegistration = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    // ✅ Temporary OTP for registration
    const registrationOTP = "1234"; // Replace with your real OTP logic if needed

    if (otp === registrationOTP) {
      alert("OTP verified successfully! Welcome to Hire-a-Helper.");
      navigate("/dashboard"); // Redirect to Dashboard after successful registration OTP
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify Your Account</h2>
        <p>Enter the OTP sent to your email to verify your account.</p>

        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>

        <p className="info-text">
          Didn't receive OTP? <span className="resend">Resend OTP</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyRegistration;