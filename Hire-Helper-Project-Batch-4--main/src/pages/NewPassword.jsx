import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, getPasswordStrengthDisplay } from "../utils/validation";
import "./NewPassword.css";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      alert("Please verify your email first");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setNewPassword(pwd);
    if (pwd) {
      setPasswordValidation(validatePassword(pwd));
    } else {
      setPasswordValidation(null);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const pwdValidation = validatePassword(newPassword);
    if (!pwdValidation.isValid) {
      setError(pwdValidation.message);
      return;
    }

    setLoading(true);

    try {
      const email = localStorage.getItem("resetEmail");
      const otp = localStorage.getItem("resetOTP");

      if (!email || !otp) {
        setError("Session expired. Please restart password reset.");
        navigate("/forgot-password");
        return;
      }
      
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          otp, 
          newPassword 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to reset password");
        return;
      }

      alert("Password reset successfully!");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOTP");
      navigate("/login");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Reset your password in a few steps.
        </p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleChangePassword}>
          <label>New password</label>
          <input
            type="password"
            placeholder="Enter new strong password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />

          {passwordValidation && (
            <div style={{ marginTop: "8px", marginBottom: "15px" }}>
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    height: "4px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "2px",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(passwordValidation.strength / 5) * 100}%`,
                      backgroundColor: getPasswordStrengthDisplay(passwordValidation.strength).color,
                      transition: "width 0.3s ease"
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    marginTop: "4px",
                    color: getPasswordStrengthDisplay(passwordValidation.strength).color
                  }}
                >
                  Strength: {getPasswordStrengthDisplay(passwordValidation.strength).text}
                </p>
              </div>

              <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ color: passwordValidation.requirements.minLength ? "#22c55e" : "#ef4444" }}>
                    {passwordValidation.requirements.minLength ? "✓" : "✗"}
                  </span>{" "}
                  At least 8 characters
                </p>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ color: passwordValidation.requirements.hasUpperCase ? "#22c55e" : "#ef4444" }}>
                    {passwordValidation.requirements.hasUpperCase ? "✓" : "✗"}
                  </span>{" "}
                  Uppercase letter (A-Z)
                </p>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ color: passwordValidation.requirements.hasLowerCase ? "#22c55e" : "#ef4444" }}>
                    {passwordValidation.requirements.hasLowerCase ? "✓" : "✗"}
                  </span>{" "}
                  Lowercase letter (a-z)
                </p>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ color: passwordValidation.requirements.hasNumber ? "#22c55e" : "#ef4444" }}>
                    {passwordValidation.requirements.hasNumber ? "✓" : "✗"}
                  </span>{" "}
                  Number (0-9)
                </p>
                <p style={{ margin: "4px 0" }}>
                  <span style={{ color: passwordValidation.requirements.hasSymbol ? "#22c55e" : "#ef4444" }}>
                    {passwordValidation.requirements.hasSymbol ? "✓" : "✗"}
                  </span>{" "}
                  Symbol (!@#$%^&* etc)
                </p>
              </div>
            </div>
          )}

          <label>Confirm password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;