
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const passwordIsValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            success: true,
            message: "Login successful!",
            token
        });
    } catch (error) {
        console.error("Admin login error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
});

module.exports = router;
