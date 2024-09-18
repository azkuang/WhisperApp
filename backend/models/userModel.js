const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Static signup method
userSchema.statics.signup = async function(email, password) {
    
    // validate email and password
    if (!email || !password) {
        throw Error('All fields must be filled.');
    }
    if (!validator.isEmail(email)) {
        throw Error('Not a valid email.');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password too weak, please include at least 8 characters, one captial letter, one number, and one special character.');
    }
    
    const existsEmail = await this.findOne({ email });

    if (existsEmail) {
        throw Error('Email already in use.');
    }

    // Generate salt for passwords
    const salt = await bcrypt.genSalt(10);

    // Hash passwords
    const hash = await bcrypt.hash(password, salt);

    // Store email + password in DB
    const user = await this.create({ email: email, password: hash });
 
    return user;
};

// static login method
userSchema.statics.login = async function(email, password) {
    // validate email and password
    if (!email || !password) {
        throw Error('All fields must be filled.');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect login');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect login');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);