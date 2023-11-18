const { default: OpenAI } = require("openai");
const catchAsyncError = require("../middleware/catchAsyncError");

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