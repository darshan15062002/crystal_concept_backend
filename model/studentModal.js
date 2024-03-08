const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
    },
    std: {
        type: String,
        required: [true, 'Please provide a standard'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
    },
    joindate: {
        type: String,
        required: [true, 'Please provide a date'],
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false,
    },
    otp: Number,
    otp_expire: Date,
});

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

studentSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
};

module.exports = mongoose.model('Student', studentSchema); 
