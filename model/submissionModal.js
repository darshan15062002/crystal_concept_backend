const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz model
        required: true,
    },
    quizTitle: {
        type: String,
        required: true,
    },
    answers: {
        type: [String], // Array of user's answers
        required: true,
    },
    points: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },

});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;