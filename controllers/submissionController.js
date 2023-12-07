const catchAsyncError = require("../middleware/catchAsyncError");
const Submission = require("../model/submissionModal");

exports.submitQuiz = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id
        const { quizId, quizTitle, answers, points } = req.body;

        const newSubmission = new Submission({
            userId,
            quizId,
            quizTitle,
            answers,
            points
        });

        await newSubmission.save();

        res.status(201).json({ success: true, message: 'Quiz submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

exports.getMySubmission = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user._id; // Replace with the actual location of user information in your request object

        // Query the database to retrieve the user's submission
        const submission = await Submission.find({ userId }).sort({ timestamp: -1 });

        if (!submission) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }

        // If the submission is found, send it in the response
        res.status(200).json({ success: true, data: submission });
    } catch (error) {
        console.error('Error getting user submission:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
)

exports.getMySingleSubmission = catchAsyncError(async (req, res, next) => {
    try {
        const quizId = req.params.id;
        const userId = req.user._id;
        const submission = await Submission.findOne({ quizId, userId });

        if (!submission || Object.keys(submission).length === 0) {
            return res.status(404).json({ success: false, message: 'Submission not found' });
        }

        // If the submission is found, send it in the response
        res.status(200).json({ success: true, data: submission });
    } catch (error) {
        console.error('Error getting user submission:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

