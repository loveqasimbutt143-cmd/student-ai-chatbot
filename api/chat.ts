import type { VercelRequest, VercelResponse } from '@vercel/node';
import { askLocalAI } from '../src/services/aiService';

// Vercel Native Handler (No Express Jhanjhat!)
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers allow karna taake frontend block na ho
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Pre-flight request check
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json("Prompt input missing!");
        }

        // Call Groq AI Service
        const reply = await askLocalAI(prompt);
        return res.status(200).json(reply);

    } catch (err: any) {
        console.error("Vercel Runtime Error:", err.message);
        return res.status(500).json(`Server Error: ${err.message || 'Unknown'}`);
    }
}