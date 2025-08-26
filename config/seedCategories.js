const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/Category");

// Load .env
dotenv.config();

// Debug: check if URI is loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

const seedCategories = async () => {
  try {
    // MongoDB connect
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected for Seeding");

    // Delete old categories
    await Category.deleteMany();

    // Insert new categories
    await Category.insertMany([
      { categoryName: "Hygiene" },
      { categoryName: "Security" },
      { categoryName: "Furniture" },
    ]);

    console.log("✅ Categories Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding categories:", err.message);
    process.exit(1);
  }
};

seedCategories();