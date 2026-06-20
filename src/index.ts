import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes';

// Settings ko load karne ke liye
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares (Data reading aur cross-origin access ke liye)
app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);
// Pehla simple rasta (Route) check karne ke liye ke server chal raha hai ya nahi
app.get('/', (req, res) => {
    res.send('Zabardast! Aapka Student Chatbot Server Live Hai! 🚀');
});

// Server ko start karna
app.listen(PORT, () => {
    console.log(`Server running successfully on: http://localhost:${PORT}`);
});
export default app;