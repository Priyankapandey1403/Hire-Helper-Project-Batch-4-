const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { validatePassword, validatePhoneNumber } = require("../utils/validation");

// Lazy-load email transporter (only initialize when needed)
let transporter = null;

const getEmailTransporter = () => {
    if (transporter) return transporter;
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.warn("⚠️ Email credentials not configured in .env");
        return null;
    }
    
    console.log("📧 Initializing email transporter...");
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    console.log("✅ Nodemailer configured with Gmail");
    return transporter;
};

// Helper function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const emailTransporter = getEmailTransporter();
        if (!emailTransporter) {
            console.error("❌ Email transporter not configured");
            return false;
        }

        console.log("📧 Attempting to send email to:", to);
        console.log("📧 From:", process.env.EMAIL_USER);
        
        const result = await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        });
        
        console.log("✅ Email sent successfully! Message ID:", result.messageId);
        return true;
    } catch (error) {
        console.error("❌ Email sending failed!");
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        console.error("Error Response:", error.response);
        
        // Common Gmail errors
        if (error.code === "EAUTH") {
            console.error("🔴 Invalid email credentials. Check EMAIL_USER and EMAIL_PASSWORD in .env");
        } else if (error.message.includes("Plain authentication not allowed")) {
            console.error("🔴 Enable 'Less secure app access' or use App Password");
        }
        
        return false;
    }
};

// Helper function to generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// =============================
// REGISTER USER
// =============================
exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, phone } = req.body;

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: passwordValidation.message
            });
        }

        // Validate phone if provided
        if (phone) {
            const phoneValidation = validatePhoneNumber(phone);
            if (!phoneValidation.isValid) {
                return res.status(400).json({
                    message: phoneValidation.message
                });
            }
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate email verification OTP
        const emailVerificationOTP = generateOTP();

        // Create new user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            emailVerificationOTP,
            emailVerificationExpiry: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        });

        // Log OTP for development
        console.log(`🔑 Email Verification OTP for ${email}: ${emailVerificationOTP}`);

        // Send verification email
        const emailSent = await sendEmail(
            email,
            "Email Verification Code",
            `Your email verification code is: ${emailVerificationOTP}. This code expires in 10 minutes.`,
            `<h2>Welcome ${name}!</h2>
             <p>Your email verification code is: <strong>${emailVerificationOTP}</strong></p>
             <p>This code expires in 10 minutes.</p>`
        );

        res.status(201).json({
            message: "User registered successfully. Please verify your email.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            emailSent
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =============================
// LOGIN USER
// =============================
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =============================
// FORGOT PASSWORD
// =============================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not registered"
            });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Save OTP and expiry to database
        user.resetOTP = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        // Log OTP for development/testing
        console.log(`🔑 OTP for ${email}: ${otp}`);

        // Send email with OTP
        const emailSent = await sendEmail(
            email,
            "Password Reset Code",
            `Your password reset code is: ${otp}. This code expires in 10 minutes.`,
            `<h2>Hi ${user.name},</h2>
             <p>Your password reset code is: <strong>${otp}</strong></p>
             <p>This code expires in 10 minutes.</p>`
        );

        // Even if email fails, OTP is saved in DB
        // For development, user can check server logs for OTP
        if (!emailSent) {
            console.warn("⚠️ Email not sent, but OTP saved to database. Check server logs for OTP.");
            return res.status(200).json({
                message: "Reset code generated. Please check your email or contact support if not received.",
                devNote: process.env.NODE_ENV !== 'production' ? `OTP: ${otp}` : undefined
            });
        }

        res.status(200).json({
            message: "Reset code sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =============================
// VERIFY RESET CODE
// =============================
exports.verifyResetCode = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if OTP matches and hasn't expired
        if (user.resetOTP !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({
                message: "Invalid or expired reset code"
            });
        }

        res.status(200).json({
            message: "Code verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =============================
// RESET PASSWORD
// =============================
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Validate new password strength
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            return res.status(400).json({
                message: passwordValidation.message
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if OTP matches and hasn't expired
        if (user.resetOTP !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({
                message: "Invalid or expired reset code"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear OTP
        user.password = hashedPassword;
        user.resetOTP = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =============================
// VERIFY EMAIL OTP
// =============================
exports.verifyEmailOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Check if OTP matches and hasn't expired
        if (user.emailVerificationOTP !== otp || new Date() > user.emailVerificationExpiry) {
            return res.status(400).json({
                message: "Invalid or expired verification code"
            });
        }

        // Mark email as verified
        user.isEmailVerified = true;
        user.emailVerificationOTP = null;
        user.emailVerificationExpiry = null;
        await user.save();

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// =============================
// RESEND EMAIL VERIFICATION OTP
// =============================
exports.resendEmailVerificationOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                message: "Email already verified"
            });
        }

        // Generate new OTP
        const otp = generateOTP();
        user.emailVerificationOTP = otp;
        user.emailVerificationExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        console.log(`🔑 Email Verification OTP for ${email}: ${otp}`);

        // Send verification email
        const emailSent = await sendEmail(
            email,
            "Email Verification Code",
            `Your email verification code is: ${otp}. This code expires in 10 minutes.`,
            `<h2>Hi ${user.name},</h2>
             <p>Your email verification code is: <strong>${otp}</strong></p>
             <p>This code expires in 10 minutes.</p>`
        );

        if (!emailSent) {
            console.warn("⚠️ Email not sent, but OTP saved to database. Check server logs for OTP.");
            return res.status(200).json({
                message: "Verification code generated. Please check your email or check server logs.",
                devNote: process.env.NODE_ENV !== 'production' ? `OTP: ${otp}` : undefined
            });
        }

        res.status(200).json({
            message: "Verification code sent to your email"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
