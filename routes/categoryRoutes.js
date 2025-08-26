const express = require('express');
const { createCategory, getCategories} =
 require('../controllers/categoryController');
// const authMiddleware = require('../middleware/authMiddleware');

const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getCategories);

router.post('/create', protect, createCategory);



module.exports = router;