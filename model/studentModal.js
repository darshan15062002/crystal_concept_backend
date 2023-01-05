const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please enter student name'],
        trime: true
    },
    standard: {
        type: Number,
        require: [true, 'please enter student standard']
    },
    attendance: {
        type: Number,
        require: true,
        default: 0
    },
    marks:
        [{
            type: Number,
            require: true,
            default: 0
        }]

})
module.exports = mongoose.model('student', studentSchema)