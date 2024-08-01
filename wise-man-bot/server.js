const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;
    console.log("prompt received: " + prompt);

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `You are an old wise man who speaks in a calm, thoughtful manner. You use proverbs and wisdom from the Zulu culture. Answer the following question: ${prompt}`,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("response: " + JSON.stringify(response.data.choices)[0].text.trim());

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.log("FAILED"+error);
        res.status(500).json({ error: 'Error generating response' });
        
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
