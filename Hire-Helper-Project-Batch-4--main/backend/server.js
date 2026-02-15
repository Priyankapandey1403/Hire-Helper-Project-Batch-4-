const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
connectDB();

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("HireHelper Backend Running Successfully 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
