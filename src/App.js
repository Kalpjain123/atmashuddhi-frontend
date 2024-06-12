// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://kalpjain1143:<password>@cluster0.od1glv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(cors());
app.use(express.json());

// Load questions
const questionsPath = path.join(__dirname, 'data/questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

app.get('/', (req, res) => {
    res.send('Hello from Atmashuddhi Backend');
});

// Endpoint to handle chatbot queries with keyword search
app.post('/api/chatbot', (req, res) => {
    const { message } = req.body;
    const lowercasedMessage = message.toLowerCase();
    const results = questions.filter(q =>
        q.question.toLowerCase().includes(lowercasedMessage)
    );
    res.json(results);
});

// Endpoint to create a new token with simple format
app.post('/api/chatbot/ticket', (req, res) => {
    const { question } = req.body;
    const token = Math.random().toString(36).substring(2, 8); // Simple 6-character token
    // Normally save the token and question to a database
    res.json({ token, question });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
