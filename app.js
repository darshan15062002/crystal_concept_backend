const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');


app.use(cors({
    origin: ['http://localhost:3000', "https://crystal-concept-a928f.web.app"], // specify the exact origin for requests with credentials
    credentials: true,
}));


app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());

const errorMiddleware = require('./middleware/error')

// routes imports
const studentInfoRoute = require('./routes/studentInfoRoute.js')
const quiz = require('./routes/quizRoute.js')
const user = require('./routes/userRoute.js')
const summarizer = require('./routes/summarizer.js')
const quizSubmission = require('./routes/submissionRoute.js')
const dashboard = require('./routes/dashboardRoute.js')
app.use("/api/v1/", quiz)
app.use("/api/v1/", dashboard)
app.use("/api/v1/", user)
app.use("/api/v1/", summarizer)
app.use("/api/v1/", quizSubmission)
app.use("/api/v1/", studentInfoRoute)
app.use(errorMiddleware)


module.exports = app