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
const examSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    outOf: {
        type: Number,
        required: true
    }
});

const studentInfoSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
        unique: true
    },
    feesPaid: [paymentSchema],
    exams: [examSchema],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
       
    }],
    joiningDate: {
        type: Date,
        
    }
   
});



const StudentInfo = mongoose.model('StudentInfo', studentInfoSchema);

module.exports = StudentInfo;


