const express = require('express')
const app = express();
app.use(express.json())

// routes imports
const student = require('./routes/studentRoute.js')
app.use('/api/v1/', student)


module.exports = app