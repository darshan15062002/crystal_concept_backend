const express = require('express')
const app = express();
app.use(express.json())
const errorMiddleware = require('./middleware/error')

// routes imports
const student = require('./routes/studentRoute.js')
app.use('/api/v1/', student)
app.use(errorMiddleware)


module.exports = app