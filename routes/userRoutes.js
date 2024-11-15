const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Routes for user registration and login
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, (req, res) => res.send(req.user));

module.exports = router;
