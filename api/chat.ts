import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ⚠️ Path ka dhyan rakhna hai: Chunki yeh file 'api' folder me hai, 
// to 'src' folder me jaane ke liye '../src' use hoga.
import { askLocalAI } from '../src/services/aiService'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: '*' })); 
app.use(express.json());

// 1. Home route (Sirf check karne ke liye)
app.get('/', (req, res) => {
    res.send('Zabardast! Aapka Student Chatbot Server Live Hai! 🚀');
});

// 2. 🎯 Vercel Serverless Post Endpoint
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

// Local test karne ke liye (Vercel isay production me bypass kar deta hai)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running successfully on: http://localhost:${PORT}`);
    });
}

// Vercel ke liye sab se zaroori line:
export default app;