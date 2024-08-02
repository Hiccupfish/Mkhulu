const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv'); // This is not needed anymore as we're hardcoding the API Key


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

app.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;
    console.log("Prompt received: " + prompt);
    console.log("API Key: " + HUGGINGFACE_API_KEY); 

    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/openai-community/gpt2', {
            inputs: `You are an old wise man who speaks in a calm, thoughtful manner. You use proverbs and wisdom from the Zulu culture. Answer the following question: ${prompt}`
        }, {
            headers: {
                'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
    
        // Log the entire response to inspect its structure
        console.log("Full response: ", response.data);
    
        // Access the correct property based on the actual response structure
        const generatedText = response.data[0]?.generated_text; // Use optional chaining to handle undefined
        
        if (generatedText) {
            console.log("Response: " + generatedText.trim());
            res.json({ response: generatedText.trim() });
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
