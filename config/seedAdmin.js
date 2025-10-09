const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin.js");

const seedAdmin = async () => {
  try {
    const email = "admin@example.com";
    const password = "Admin@123";

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await Admin.create({
        name: "Admin",
        email,
        password: hashedPassword,
      });

      console.log("✅ Seed admin created successfully!");
      console.log("➡️ Email:", email);
      console.log("➡️ Password:", password);
    } else {
      console.log("ℹ️ Admin already exists:", existingAdmin.email);
    }
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  }
};

module.exports = seedAdmin;
