const User = require('../models/userModel');

// login user
const loginUser = async (req, res) => {
    res.status(200).json({ message: 'login user' });
};

// signup user
const signupUser = async (req, res) => {
    res.status(200).json({ message: 'signup user' });
};

module.exports = { loginUser, signupUser };