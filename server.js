const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// CORS middleware 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // Allow requests from your React Native app's origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers   

    next();
});

app.use(express.json());

// Directly define the API key here (replace with your actual key)
const HUGGINGFACE_API_KEY = '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'; // Your Hugging Face API Key

// receive requests directed to /generate-response
app.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;
    console.log("Prompt received: " + prompt);
    console.log("API Key: " + HUGGINGFACE_API_KEY); 

    try {

        // make request to the external server through axios 
        const response = await axios.post('https://api-inference.huggingface.co/models/openai-community/gpt2', {
            inputs: `You are an old wise man who speaks in a calm, thoughtful manner. You use proverbs and wisdom from the Zulu culture. Answer the following question: ${prompt}`
        }, {
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const generatedText = response.data[0]?.generated_text; // Use optional chaining to handle undefined

        if (generatedText) {
            // Extract the part of the response after the initial prompt
            const extractedResponse = generatedText.split(`Answer the following question: ${prompt}`)[1]?.trim() || generatedText.trim();
            console.log("Extracted Response: " + extractedResponse);

            // Translate the response into Zulu using DeepL
            const translatedResponse = await axios.post('https://api-free.deepl.com/v2/translate', null, {
                params: {
                    auth_key: '2b9ad996-bfcb-41e8-9791-f0c2b8c6229b:fx',
                    text: generatedText.trim(),
                    target_lang: 'ZH' // Zulu language code
                }
            });

            const translation = translatedResponse.data.translations[0].text;
            res.json({ response: translation });
        } else {
            throw new Error("Generated text not found in response");
        }
    } catch (error) {
        console.error("Error: ", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error generating response' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
