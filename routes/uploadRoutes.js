const express = require('express');
const router = express.Router();

const upload = require('../middleware/uploadMiddleware');
const { uploadFile } = require('../controllers/uploadController');
const path = require('path');


// Multer configuration
router.post('/upload', upload.single('image'), uploadFile);

module.exports = router;