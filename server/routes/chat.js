import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { auth } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const openaiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_key_here' ? process.env.OPENAI_API_KEY : null;
        const openrouterKey = process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'your_openrouter_key_here' ? process.env.OPENROUTER_API_KEY : null;

        if (!openaiKey && !openrouterKey) {
            return res.status(500).json({
                message: 'No valid API Key configured. Please add a real OPENAI_API_KEY or OPENROUTER_API_KEY to your .env file.'
            });
        }

        // Format history for OpenAI-compatible format
        const formattedHistory = (history || []).map(msg => ({
            role: msg.role === 'model' ? 'assistant' : msg.role,
            content: msg.parts[0].text
        }));

        let apiUrl, apiKey, model, headers;


        // OpenRouter Integration
        apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        apiKey = openrouterKey;
        model = 'meta-llama/llama-3.3-70b-instruct:free'; // Using a highly stable free model
        console.log(`Using OpenRouter with model: ${model}`);
        headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'NexusUI Chatbot'
        };


        const response = await axios.post(
            apiUrl,
            {
                model: model,
                messages: [
                    ...formattedHistory,
                    { role: 'user', content: message }
                ],
            },
            { headers }
        );

        const reply = response.data.choices[0].message.content;

        res.status(200).json({
            reply: reply,
            history: [
                ...(history || []),
                { role: 'user', parts: [{ text: message }] },
                { role: 'model', parts: [{ text: reply }] }
            ]
        });

    } catch (error) {
        const errorData = error.response?.data || error.message;
        console.error('Chat API Error:', errorData);
        res.status(500).json({
            message: 'Error while processing chat',
            error: error.response?.data?.error?.message || error.message
        });
    }
});

export default router;
