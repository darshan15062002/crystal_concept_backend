const express = require('express')
const { createQuiz, getAllQuiz, getSingleQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController');

const router = express.Router();


router.route('/quiz/new').post(createQuiz)
router.route('/quiz/all').get(getAllQuiz)
router.route('/quiz/single/:id').get(getSingleQuiz).put(updateQuiz).delete(deleteQuiz);

module.exports = router