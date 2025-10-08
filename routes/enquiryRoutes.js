const express = require('express');
const createEnquiry = require('../controllers/enquiryController');
const getEnquiries = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/authMiddleware');
  const protect = require('../middleware/authMiddleware');  


const router = express.Router();

router.post('/', createEnquiry);

router.get('/', protect, getEnquiries);

module.exports = router;