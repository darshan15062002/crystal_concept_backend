const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { submitQuiz, getMySubmission } = require('../controllers/submissionController');



const router = express.Router();

// router.post('/summarize', getSummary)
router.post('/quiz/submission', isAuthenticated, submitQuiz)
router.get('/quiz/submission/all', isAuthenticated, getMySubmission)



module.exports = router