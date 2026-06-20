import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { askLocalAI } from './services/aiService'; // Direct import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: '*' })); // Har origin se access allow
app.use(express.json());

// 1. Home route (Check karne ke liye)
app.get('/', (req, res) => {
    res.send('Zabardast! Aapka Student Chatbot Server Live Hai! 🚀');
});

// 2. 🎯 DIRECT POST ROUTE (Vercel ke liye fail-proof)
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json("Prompt is required");
        }

        const reply = await askLocalAI(prompt);
        return res.json(reply);
    } catch (err: any) {
        console.error("Route Error:", err.message);
        return res.status(500).json(err.message || "Internal Server Error");
    }
});

// Server ko start karna (Only for local dev)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running successfully on: http://localhost:${PORT}`);
    });
}

export default app;