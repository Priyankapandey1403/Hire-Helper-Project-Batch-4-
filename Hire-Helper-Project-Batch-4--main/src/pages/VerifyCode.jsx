import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyCode.css";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      alert("Please enter your email first");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("resetEmail");
      
      const response = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid code");
        return;
      }

      // Save OTP to localStorage for next step
      localStorage.setItem("resetOTP", code);
      
      alert("Code verified successfully!");
      navigate("/new-password");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter the 6-digit code sent to your email.
        </p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

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

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;