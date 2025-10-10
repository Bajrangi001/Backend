const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const SeedAdmin = require("./config/seedAdmin");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Debug: Log critical environment variables (remove in production)
console.log("--- Environment Variables Check ---");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ MISSING");
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET ? "✅ Loaded" : "❌ MISSING");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ MISSING");
console.log("PORT:", process.env.PORT || 5000);
console.log("------------------------------------");

// Throw error if required secrets are missing
if (!process.env.JWT_SECRET || !process.env.REFRESH_TOKEN_SECRET || !process.env.MONGO_URI) {
  throw new Error("❌ Critical error: Required environment variables are missing in .env");
}

// Initialize Express app
const app = express();

// Database connection
connectDB()
  .then(async () => {
    console.log("✅ Database connected");
    await SeedAdmin(); // Seed admin after DB connection
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
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

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Internal server error", error: process.env.NODE_ENV === "development" ? err.message : undefined });
});

// Server listen
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  server.close(() => process.exit(1));
});
