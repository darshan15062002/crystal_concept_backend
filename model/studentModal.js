const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter student name'],
        trime: true
    },
    email: {
        type: String,
        required: [true, 'please enter student email'],
    },
    standard: {
        type: Number,
        required: [true, 'please enter student standard']
    },

    // attendance: [{
    //     Atte: {
    //         type: Number,
    //         required: true,
    //         default: 0
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now()
    //     }
    // }],

    marks:
        [{
            m: {
                type: Number,
                required: true,
                default: 0,
            },
            outof: {
                type: Number,
                required: true,
                default: 0,
            },
            subject: {
                type: String,
                require: [true, "pleace enter subject"]
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }],
    // Image: {
    //     public_id: {
    //         type: String,
    //         required: true,
    //     },
    //     url: {
    //         type: String,
    //         required: true

    //     }

    // }

})
module.exports = mongoose.model('student', studentSchema)



// {
//     "name":"darshanjain",
//     "standard":10,
//     "attendance":[{"Atte":12}],
//     "marks":[{"m":12,"createdAt":"2023-07-09T14:46:17.975Z"},{"m":12,"createdAt":"2023-07-14T14:46:17.975Z"},{"m":12,"createdAt":"2023-08-10T14:46:17.975Z"},{"m":18,"createdAt":"2023-11-09T14:46:17.975Z"},{"m":12,"createdAt":"2023-11-29T14:46:17.975Z"},{"m":20,"createdAt":"2023-01-29T14:46:17.975Z"}],
//     "Image":{ "public_id":"student2",
//     "url":"student.jpg"}
//     }
