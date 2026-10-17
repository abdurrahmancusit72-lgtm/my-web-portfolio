
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const username = process.env.ADMIN_USERNAME;
        const password = process.env.ADMIN_PASSWORD;

        if (!username || !password) {
            throw new Error(
                "ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env"
            );
        }

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log("This admin username already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.create({
            username,
            password: hashedPassword
        });

        console.log("Admin account created successfully!");
    } catch (error) {
        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
