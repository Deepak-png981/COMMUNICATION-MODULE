const express = require('express');
const UserController = require('../controllers/UserController');
const uc = new UserController();

const router = express.Router();

// Get users with pagination and public key
router.get('/', uc.getUsers);

// Get user profile by ID
router.get('/:id', uc.getUserProfile);

// Update user profile
router.put('/:id', uc.updateUserProfile);

// Search users
router.get('/search', uc.searchUsers);



module.exports = router;