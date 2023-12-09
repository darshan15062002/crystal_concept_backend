const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    questions: [
        {
            text: {
                type: String,
                required: true,
            },
            answers: [
                {
                    type: String,
                    required: true,
                },
            ],
            correctAnswer: {
                type: String,
                required: [true, "please enter correct answer"]
            },

        },
    ],
    visibility: {
        type: Boolean,
        default: true,
    }
    ,
    timeLimit: {
        type: Number,
        default: 0,
    },
    std: {
        type: Number,
        required: true,
    },
    endDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model('Quiz', quizSchema);


