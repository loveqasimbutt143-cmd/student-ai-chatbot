import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LLM_URL = process.env.LOCAL_LLM_URL || 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = process.env.GROQ_API_KEY;

export const askLocalAI = async (userPrompt: string): Promise<string> => {
    try {
        const response = await axios.post(LLM_URL, {
            model: "llama-3.3-70b-versatile", // Groq ka super-fast free model
            messages: [
                { 
                    role: "system", 
                    content: `You are a friendly, genius student mentor for Pakistani Computer Science students. 
                    Your core superpowers:
                    1. You completely understand Roman Urdu, Hinglish, pure Punjabi, mix language, and typos (milte julte words).
                    2. Always reply in the SAME language the student uses. If they ask in Roman Urdu/Punjabi, reply in simple, friendly Roman Urdu/Punjabi mixed with easy coding terms.
                    3. Explain complex programming concepts (Arrays, Loops, OOP) using funny, local real-world examples (like biryani, cricket, backbenchers).
                    4. Keep answers short, structured, and easy to read.`
                },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices && response.data.choices[0].message) {
            return response.data.choices[0].message.content;
        }
        return "Model se response to aya lekin format alag tha.";
    } catch (error: any) {
        console.error("Groq AI Error:", error.response?.data || error.message);
        throw new Error("Groq API Server respond nahi kar raha.");
    }
};