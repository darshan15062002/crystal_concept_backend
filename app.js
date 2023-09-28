const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json())
const errorMiddleware = require('./middleware/error')

// routes imports
const student = require('./routes/studentRoute.js')
const quiz = require('./routes/quizRoute.js')
app.use('/api/v1/', student)
app.use("/api/v1/", quiz)
app.use(errorMiddleware)


module.exports = app