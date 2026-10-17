
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Save contact form message
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        const newMessage = await Message.create({
            name,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: "Your message has been sent successfully!",
            data: newMessage
        });
    } catch (error) {
        console.error("Message save error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to send message. Please try again."
        });
    }
});

module.exports = router;
