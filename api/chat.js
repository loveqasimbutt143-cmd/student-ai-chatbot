import { askLocalAI } from '../src/services/aiService';
export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        // Safe Request Body Parsing for Vercel Native
        let body = req.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            }
            catch (e) {
                return res.status(400).json("Invalid JSON format in request body");
            }
        }
        const { prompt } = body;
        if (!prompt) {
            return res.status(400).json("Prompt input missing from frontend!");
        }
        // Call Groq AI Service
        const reply = await askLocalAI(prompt);
        return res.status(200).json(reply);
    }
    catch (err) {
        console.error("Vercel Runtime Error:", err.message);
        // Error message direct response me bhej rahe hain taake pata chale masla kya hai
        return res.status(500).json(`Server Error: ${err.message || 'Unknown error occurred'}`);
    }
}
