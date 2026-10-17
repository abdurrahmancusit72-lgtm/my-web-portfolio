
const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// Get all contact messages (admin only)
router.get("/messages", authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find()
            .sort({ createdAt: -1 })
            .select("name email message createdAt");

        res.json({
            success: true,
            count: messages.length,
            messages
        });
    } catch (error) {
        console.error("Fetch messages error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to load messages."
        });
    }
});

module.exports = router;
