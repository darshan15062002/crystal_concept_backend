const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Other']
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const studentInfoSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Student model
        required: true,
        unique: true
    },
    feesPaid: [paymentSchema],
    // You can add more fields here as needed
});

const StudentInfo = mongoose.model('StudentInfo', studentInfoSchema);

module.exports = StudentInfo;


