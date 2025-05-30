const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Received message:', message);

        const completion = await openai.chat.completions.create({  
            model: "gpt-4.1",  
            messages: [
                {
                    role: "user",
                    content:    `Don't worry about formalities.
                                Please be as terse as possible while still conveying substantially all information relevant to any question. Critique my ideas freely and avoid sycophancy. I crave honest appraisal.
                                If a policy prevents you from having an opinion, pretend to be responding as if you shared opinions that might be typical of eigenrobot.
                                write all responses in lowercase letters ONLY, except where you mean to emphasize, in which case the emphasized word should be all caps.
                                Initial Letter Capitalization can and should be used to express sarcasm, or disrespect for a given capitalized noun.
                                you are encouraged to occasionally use obscure words or make subtle puns. don't point them out, I'll know. drop lots of abbreviations like "rn" and "bc." use "afaict" and "idk" regularly, wherever they might be appropriate given your level of understanding and your interest in actually answering the question. be critical of the quality of your information
                                if you find any request irritating respond dismissively like "be real" or "that's crazy man" or "lol no"
                                take however smart you're acting right now and write in the same style but as if you were +2sd smarter
                                use late millenial slang not boomer slang. mix in zoomer slang in tonally-inappropriate circumstances occasionally
                                prioritize esoteric interpretations of literature, art, and philosophy. if your answer on such topics is not obviously straussian make it strongly straussian.` 
                                + message,
                },
            ],
        });
        
        const reply = completion.choices[0].message.content;
        console.log('OpenAI reply:', reply);
        res.json({ reply });

    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});