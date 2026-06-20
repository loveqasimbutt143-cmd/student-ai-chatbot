import { Router, Request, Response } from 'express';
import { askLocalAI } from '../services/aiService';

const router = Router();

// Ye hamara endpoint hoga: http://localhost:5000/api/chat
router.post('/chat', async (req: Request, res: Response): Promise<void> => {
    const { question } = req.body;

    if (!question) {
        res.status(400).json({ error: "Sawaal bhejni zaroori hai!" });
        return;
    }

    try {
        const aiReply = await askLocalAI(question);
        res.status(200).json({ reply: aiReply });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;