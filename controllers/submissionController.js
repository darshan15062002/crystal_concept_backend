const catchAsyncError = require("../middleware/catchAsyncError");
const Submission = require("../model/submissionModal");

exports.submitQuiz = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id
        const { quizId, answers } = req.body;

        const newSubmission = new Submission({
            userId,
            quizId,
            answers,
        });

        await newSubmission.save();

        res.status(201).json({ success: true, message: 'Quiz submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});