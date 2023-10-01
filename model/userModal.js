const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please provide name']
    },
    email: {
        type: String,
        require: [true, 'please provide email'],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        require: [true, 'please provide password'],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", 'user'],
        default: 'user'
    },
    otp: Number,
    otp_expire: Date,
})

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

module.exports = mongoose.model('User', userSchema)