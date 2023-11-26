const { default: OpenAI } = require("openai");
const catchAsyncError = require("../middleware/catchAsyncError");
const { GoogleAuth } = require("google-auth-library");
const { TextServiceClient } =
    require("@google-ai/generativelanguage").v1beta2;

exports.getSummary = catchAsyncError(async (req, res) => {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const pdfText = req.body.pdf_text;
    const rows = req.body.rows;

    // Your prompt to ChatGPT for summarization
    const prompt = `Summarize the following text: ${pdfText}`;


    // Set up the data payload

    const messages = [
        { role: 'system', content: `You are a helpful assistant that covert the answer of qestion in more simple and easy to learn format in ${rows} rows only` },
        { role: 'user', content: prompt }
    ]

    try {



        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.5,
            max_tokens: 1024,
        });

        // Extract the model's reply

        const summary = response.choices[0].message.content;

        res.status(200).json({
            sucsses: true,
            message: summary
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})



exports.getSummaryGoogle = catchAsyncError((req, res) => {
    const pdfText = req.body.pdf_text;
    const rows = req.body.rows;
    const MODEL_NAME = "models/text-bison-001";
    const API_KEY = process.env.API_KEY;
    if (pdfText && pdfText.length <= 50) {
        res.status(200).json({
            sucsses: true,
            message: "The provided text is not suitable "
        })
    }
    const client = new TextServiceClient({
        authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const prompt = `You are a friendly study assistant. Can you help me simplify this text so that it's easier for students to remember? Here's the text for you to review: ${pdfText} , give me in proper formate`;

    client
        .generateText({
            model: MODEL_NAME,
            prompt: {
                text: prompt,
            },
        })
        .then((result) => {
            const generatedText = result[0]?.candidates[0]?.output || "No output available";
            console.log(generatedText, "generated");

            res.status(200).json({
                sucsses: true,
                message: generatedText
            })
        })



})