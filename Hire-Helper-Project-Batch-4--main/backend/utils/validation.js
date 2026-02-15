// Backend Password Validation
const validatePassword = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const isStrong = Object.values(requirements).every(req => req);

  return {
    isValid: isStrong,
    requirements,
    message: getPasswordMessage(requirements, isStrong)
  };
};

const getPasswordMessage = (requirements, isStrong) => {
  if (isStrong) return "Strong password";
  
  const missing = [];
  if (!requirements.minLength) missing.push("at least 8 characters");
  if (!requirements.hasUpperCase) missing.push("uppercase letter");
  if (!requirements.hasLowerCase) missing.push("lowercase letter");
  if (!requirements.hasNumber) missing.push("number");
  if (!requirements.hasSymbol) missing.push("symbol");

  return `Password must contain: ${missing.join(", ")}`;
};

// Backend Phone Validation
const validatePhoneNumber = (phone) => {
  // Remove spaces, dashes, and other common separators
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  // Check if it's a valid 10-digit number
  const isValid = /^\d{10}$/.test(cleaned);
  
  return {
    isValid,
    cleaned,
    message: isValid ? "Valid phone number" : "Phone number must be exactly 10 digits"
  };
};

module.exports = {
  validatePassword,
  validatePhoneNumber
};
