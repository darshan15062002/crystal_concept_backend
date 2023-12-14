const { GoogleAuth } = require("google-auth-library");
const catchAsyncError = require("../middleware/catchAsyncError");
const Quiz = require("../model/quizModal");
const Submission = require("../model/submissionModal");
const { TextServiceClient } =
    require("@google-ai/generativelanguage").v1beta2;



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


exports.getAllGeneratedQuizzes = catchAsyncError(async (req, res, next) => {
    const pdfText = req.body.pdf_text;  // Correctly access the PDF text property
    ;
    const noQue = req.body.noque;
    const MODEL_NAME = "models/text-bison-001";
    const API_KEY = process.env.API_KEY;

    if (!pdfText || pdfText.length <= 500) {
        return res.status(200).json({
            success: true,
            message: "The provided text is not suitable."
        });
    }

    const client = new TextServiceClient({
        authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const prompt = `
    PDF Text: ${pdfText} 
    Generate 10 multiple-choice questions with four options each based on the provided PDF Text. 
    and fifth option is the possition of correct answers out of four options like 2
    Ensure the questions cover various aspects of the text.
    `

    client.generateText({
        model: MODEL_NAME,
        prompt: {
            text: prompt,
        },
    })
        .then((result) => {
            const generatedText = result[0]?.candidates[0]?.output || "No output available";

            // const inputText = generatedText.split(/\s{4,}\d+\.\s/).filter(Boolean);
            const questions = generatedText.split('\n').filter(Boolean);

            const array = [];
            for (let i = 0; i < questions.length; i += 6) {
                let doc = {
                    text: questions[i],
                    answers: [
                        questions[i + 1],
                        questions[i + 2],
                        questions[i + 3],
                        questions[i + 4]
                    ],
                    correctAnswer: questions[i + 5],
                };
                array.push(doc);
            }
            console.log(array);




            res.status(200).json({
                success: true,
                array
            });
        })

});
