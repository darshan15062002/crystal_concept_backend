const catchAsyncError = require("../middleware/catchAsyncError");
const Quiz = require("../model/quizModal");

exports.createQuiz = catchAsyncError(async (req, res, next) => {
    /* {
         "title":"maths",
        "questions": [
         {
             "text": "What is the capital of France?",
             "answers": ["London", "Paris", "Berlin"],
             "correctAnswer": 1
         },
         {
             "text": "What is the largest ocean?",
             "answers": ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean"],
             "correctAnswer": 0
         }
     ],
           "startDate":"2023-09-30T12:00:00.000Z",
       "endDate":  "2023-09-30T12:30:00.000Z"
     }*/
    console.log(req.body);
    const response = await Quiz.create(req.body);

    res.status(200).json({
        message: 'quiz created successfully',
        response: response
    })

})

exports.updateQuiz = catchAsyncError(async (req, res, next) => {

    const { id } = req.params
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ success: false, message: 'quiz not found' })

    const { title, questions, startDate, endDate } = req.body

    if (title) quiz.title = title
    if (questions) quiz.questions = questions
    if (startDate) quiz.startDate = startDate
    if (endDate) quiz.endDate = endDate

    const response = await quiz.save()
    res.status(200).json({
        success: true,
        response
    })
})


exports.getAllQuiz = catchAsyncError(async (req, res, next) => {

    const quizs = await Quiz.find({}).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        quizs
    })

})

exports.getSingleQuiz = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    const quiz = await Quiz.findById(id)

    res.status(200).json({
        success: true,
        quiz
    })

})

exports.deleteQuiz = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const quiz = await Quiz.findById(id)
    console.log(quiz);
    if (!quiz) return res.status(404).json({ success: false, message: 'quiz not found' })

    await Quiz.deleteOne({ _id: quiz._id })
    res.status(200).json({
        success: true,
        message: 'quiz deleted successfully'
    })

})
