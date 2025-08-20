// routes/userRoutes.js
const express = require('express');
const {
  createUser,
  loginUser,
  authenticate,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Auth routes (public)
router.post('/register', createUser);
router.post('/login', loginUser);

// Protected CRUD routes
router.get('/users', authenticate, getUsers);
router.get('/users/:id', authenticate, getUserById);
router.put('/users/:id', authenticate, updateUser);
router.delete('/users/:id', authenticate, deleteUser);

module.exports = router;
