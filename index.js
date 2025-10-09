const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const SeedAdmin = require("./config/seedAdmin");

// Load environment variables immediately
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Debug: Log critical environment variables (remove in production)
console.log("--- Environment Variables Check ---");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ MISSING");
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET ? "✅ Loaded" : "❌ MISSING");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ MISSING");
console.log("------------------------------------");
// console.log("✅ Seed admin created successfully!");
// console.log("➡️ Email:", email);
// console.log("➡️ Password:", password);
console.log("SeedAdmin module:", SeedAdmin ? "✅ Loaded" : "❌ MISSING");


// Throw error if required secrets are missing
if (!process.env.JWT_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("❌ Critical error: JWT_SECRET or REFRESH_TOKEN_SECRET is missing in .env");
}

const app = express();




// Database connection
connectDB()
  .then(async () => {
    console.log("✅ Database connected");
    await SeedAdmin(); // call after DB connection
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const subSubcategoryRoutes = require("./routes/subSubcategoryRoutes");

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/subSubcategories", subSubcategoryRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something broke!" });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
