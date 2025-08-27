const express = require("express");
const {registerAdmin} = require("../controllers/adminController");
const {loginAdmin} = require("../controllers/adminController");

const router = express.Router();

// Register Route
router.post("/admin/register", registerAdmin);

// Login Route
router.post("/admin/login", loginAdmin);

// Example POST route
router.post('/admin', (req, res) => {
    res.send('Admin POST route working!');
});

// ...add other routes as needed...

module.exports = router;