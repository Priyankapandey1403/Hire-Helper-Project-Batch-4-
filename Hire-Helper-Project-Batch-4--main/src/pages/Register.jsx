import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword, validatePhoneNumber, getPasswordStrengthDisplay } from "../utils/validation";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [phoneValidation, setPhoneValidation] = useState(null);

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (pwd) {
      setPasswordValidation(validatePassword(pwd));
    } else {
      setPasswordValidation(null);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneNum = e.target.value;
    setPhone(phoneNum);
    if (phoneNum) {
      setPhoneValidation(validatePhoneNumber(phoneNum));
    } else {
      setPhoneValidation(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate password
    const pwdValidation = validatePassword(password);
    if (!pwdValidation.isValid) {
      setError(pwdValidation.message);
      setLoading(false);
      return;
    }

    // Validate phone if provided
    if (phone) {
      const phoneVal = validatePhoneNumber(phone);
      if (!phoneVal.isValid) {
        setError(phoneVal.message);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Save email for email verification
      localStorage.setItem("registerEmail", email);
      
      alert("Registration successful! Please verify your email.");
      navigate("/verify-email");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-icon">👤+</div>

        <h2>Create Account</h2>
        <p className="subtitle">Join Hire-a-Helper community</p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="name-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number (Optional)</label>
            <input
              type="text"
              placeholder="Enter your phone number (10 digits)"
              value={phone}
              onChange={handlePhoneChange}
              maxLength="15"
            />
            {phoneValidation && (
              <div
                style={{
                  marginTop: "5px",
                  fontSize: "12px",
                  color: phoneValidation.isValid ? "#22c55e" : "#ef4444"
                }}
              >
                {phoneValidation.message}
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            
            {passwordValidation && (
              <div style={{ marginTop: "8px" }}>
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

                <div style={{ fontSize: "12px", color: "#666" }}>
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
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;