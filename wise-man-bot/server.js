const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Error generating response' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
