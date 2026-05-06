const express = require('express');
const { registerUserController, loginUserController } = require('../controllers/user.controller');

const router = express.Router();

// register user
router.post('/register', registerUserController);

// login user
router.post('/login', loginUserController);

module.exports = router;
