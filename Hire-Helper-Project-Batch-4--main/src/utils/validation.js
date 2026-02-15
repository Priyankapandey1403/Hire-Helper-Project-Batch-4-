// Password Validation Utility
export const validatePassword = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const isStrong = Object.values(requirements).every(req => req);
  const strength = Object.values(requirements).filter(req => req).length;

  return {
    isValid: isStrong,
    isStrong,
    strength, // 0-5
    requirements,
    message: getPasswordMessage(requirements, isStrong)
  };
};

const getPasswordMessage = (requirements, isStrong) => {
  if (isStrong) return "Strong password ✅";
  
  const missing = [];
  if (!requirements.minLength) missing.push("at least 8 characters");
  if (!requirements.hasUpperCase) missing.push("uppercase letter");
  if (!requirements.hasLowerCase) missing.push("lowercase letter");
  if (!requirements.hasNumber) missing.push("number");
  if (!requirements.hasSymbol) missing.push("symbol");

  return `Password must contain: ${missing.join(", ")}`;
};

// Phone Number Validation Utility
export const validatePhoneNumber = (phone) => {
  // Remove spaces, dashes, and other common separators
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  // Check if it's a valid 10-digit number
  const isValid = /^\d{10}$/.test(cleaned);
  
  return {
    isValid,
    cleaned,
    message: isValid ? "Valid phone number ✅" : "Phone number must be exactly 10 digits"
  };
};

// Get password strength indicator color and text
export const getPasswordStrengthDisplay = (strength) => {
  const levels = [
    { color: "#dc2626", text: "Very Weak", level: 1 },
    { color: "#f97316", text: "Weak", level: 2 },
    { color: "#eab308", text: "Fair", level: 3 },
    { color: "#84cc16", text: "Good", level: 4 },
    { color: "#22c55e", text: "Strong", level: 5 }
  ];
  
  return levels[strength - 1] || levels[0];
};
