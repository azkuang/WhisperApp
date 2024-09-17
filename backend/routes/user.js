const express = require('express');

// controller function
const { loginUser, signupUser } = require('../Controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// sign up route
router.post('/signup', signupUser);


module.exports = router;