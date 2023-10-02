const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const app = express();
dotenv.config({ path: "config/config.env" })
app.use(cors({
   credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2]
  }
))
app.use(express.json())
app.use(cookieParser());

const errorMiddleware = require('./middleware/error')

// routes imports
const student = require('./routes/studentRoute.js')
const quiz = require('./routes/quizRoute.js')
const user = require('./routes/userRoute.js')
app.use('/api/v1/', student)
app.use("/api/v1/", quiz)
app.use("/api/v1/", user)
app.use(errorMiddleware)


module.exports = app
