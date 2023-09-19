const express = require('express');
const AuthController = require('../controllers/AuthController');
const ac = new AuthController()

const router = express.Router();

router.post('/signup', ac.signUp);
router.post('/login', ac.login);
router.get('/getCurrentUser', ac.getCurrentUser);

module.exports = router;
