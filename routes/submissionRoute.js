const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { submitQuiz } = require('../controllers/submissionController');



const router = express.Router();

// router.post('/summarize', getSummary)
router.post('/quiz/submission', isAuthenticated, submitQuiz)



module.exports = router