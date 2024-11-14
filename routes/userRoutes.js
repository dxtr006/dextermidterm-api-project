//note-(adam) I was testing adding user stuff you guys can keep this stuff commented out or if u wanna mess with it go for it kinda works 

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
