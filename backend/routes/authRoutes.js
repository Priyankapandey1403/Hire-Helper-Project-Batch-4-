const express = require("express");
const router = express.Router();

// Controllers
const { registerUser, loginUser } = require("../controllers/authController");

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
// PROTECTED ROUTE (JWT required)
// ===============================
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user
    });
});


module.exports = router;
