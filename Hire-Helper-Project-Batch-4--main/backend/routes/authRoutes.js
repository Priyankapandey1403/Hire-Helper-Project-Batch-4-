const express = require("express");
const router = express.Router();

// Controllers
const { 
    registerUser, 
    loginUser, 
    forgotPassword, 
    verifyResetCode, 
    resetPassword,
    verifyEmailOTP,
    resendEmailVerificationOTP
} = require("../controllers/authController");

// Middleware
const protect = require("../middleware/authMiddleware");


// ===============================
// TEST ROUTE (for checking routes)
// ===============================
router.get("/test", (req, res) => {
    res.send("Auth route working");
});


// ===============================
// REGISTER USER
// ===============================
router.post("/register", registerUser);


// ===============================
// LOGIN USER
// ===============================
router.post("/login", loginUser);


// ===============================
// VERIFY EMAIL OTP
// ===============================
router.post("/verify-email", verifyEmailOTP);


// ===============================
// RESEND EMAIL VERIFICATION OTP
// ===============================
router.post("/resend-email-verification", resendEmailVerificationOTP);


// ===============================
// FORGOT PASSWORD
// ===============================
router.post("/forgot-password", forgotPassword);


// ===============================
// VERIFY RESET CODE
// ===============================
router.post("/verify-reset-code", verifyResetCode);


// ===============================
// RESET PASSWORD
// ===============================
router.post("/reset-password", resetPassword);


// ===============================
// PROTECTED ROUTE (JWT required)
// ===============================
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});


module.exports = router;
