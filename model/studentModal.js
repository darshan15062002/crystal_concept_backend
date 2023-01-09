const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter student name'],
        trime: true
    },
    standard: {
        type: Number,
        required: [true, 'please enter student standard']
    },
    attendance: [{
        Atte: {
            type: Number,
            required: true,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],
    marks:
        [{
            m: {
                type: Number,
                required: true,
                default: 0,
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
    Image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true

        }

    }

})
module.exports = mongoose.model('student', studentSchema)