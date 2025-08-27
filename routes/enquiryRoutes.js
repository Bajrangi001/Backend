const express = require('express');
const {createEnquiry, getEnquiries} = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/authMiddleware');
    


const router = express.Router();

router.post('/', createEnquiry);
const protect = require('../middleware/authMiddleware');
router.get('/', protect, getEnquiries);

module.exports = router;