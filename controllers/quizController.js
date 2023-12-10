const catchAsyncError = require("../middleware/catchAsyncError");
const Quiz = require("../model/quizModal");
const Submission = require("../model/submissionModal");

exports.createQuiz = catchAsyncError(async (req, res, next) => {

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

    const { title, questions, std, endDate, visibility } = req.body
    if (title) quiz.title = title
    if (questions) quiz.questions = questions
    if (std) quiz.std = std
    if (endDate) quiz.endDate = endDate
    if (visibility !== undefined) {
        quiz.visibility = visibility;
    }
    const response = await quiz.save()
    res.status(200).json({
        success: true,
        response
    })
})


exports.getAllQuiz = catchAsyncError(async (req, res, next) => {

    const quizs = await Quiz.find({}).sort({ createdAt: -1 });
    let docs = []
    if (quizs) {
        for (const item of quizs) {
            try {
                const numberOfSubmissions = await Submission.countDocuments({ quizId: item._id });
                docs.push(numberOfSubmissions)
            } catch (error) {
                console.error(`Error counting submissions for quiz ${item._id}:`, error);
            }
        }
    }

    res.status(200).json({
        success: true,
        quizs,
        docs

    })

})

exports.getAllVisibleQuiz = catchAsyncError(async (req, res, next) => {
    const std = req?.user?.std
    const quizs = await Quiz.find({ visibility: true, std }).sort({ createdAt: -1 });

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
