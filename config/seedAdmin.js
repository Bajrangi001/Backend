// utils/seedAdmin.js
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db.js");
const Admin = require("../models/Admin.js");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    const pass = process.env.SEED_ADMIN_PASS || "Admin@123";

    let admin = await Admin.findOne({ email });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(pass, salt);
      admin = await Admin.create({ name: "Admin", email, password: hashed });
      console.log("✅ Admin created:", email, "password:", pass);
    } else {
      console.log("ℹ️ Admin already exists:", email);
    }

    process.exit(0);
  } catch (e) {
    console.error("❌ Seed error:", e.message);
    process.exit(1);
  }
};

seedAdmin();