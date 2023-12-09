const express = require('express')
const { createQuiz, getAllQuiz, getSingleQuiz, updateQuiz, deleteQuiz, getAllVisibleQuiz } = require('../controllers/quizController');
const { isAdmin, isAuthenticated } = require('../middleware/auth');

const router = express.Router();


router.route('/quiz/new').post(isAuthenticated, isAdmin, createQuiz)
router.route('/quiz/all').get(isAuthenticated, getAllQuiz)
router.route('/quiz/visible/all').get(isAuthenticated, getAllVisibleQuiz)
router.route('/quiz/single/:id').get(getSingleQuiz).put(isAuthenticated, isAdmin, updateQuiz).delete(isAuthenticated, isAdmin, deleteQuiz);

module.exports = router