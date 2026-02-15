import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyCode.css";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("registerEmail");
    if (!email) {
      alert("Please register first");
      navigate("/register");
    }
  }, [navigate]);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("registerEmail");
      
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid code");
        return;
      }

      alert("Email verified successfully!");
      localStorage.removeItem("registerEmail");
      navigate("/login");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("registerEmail");
      
      const response = await fetch("/api/auth/resend-email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to resend code");
        return;
      }

      alert("Verification code sent to your email!");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h2>Verify Your Email</h2>
        <p className="subtitle">
          Enter the 6-digit code sent to your email.
        </p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleVerifyEmail}>
          <label>Verification code</label>
          <input
            type="text"
            placeholder="Enter code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "14px"
              }}
            >
              {resendLoading ? "Sending..." : "Resend code"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
