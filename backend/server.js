
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running Successfully!");
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio API is working!"
    });
});

// API routes
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
