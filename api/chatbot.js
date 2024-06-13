// api/chatbot.js
const fs = require('fs');
const path = require('path');

// Load questions from a JSON file
const questionsPath = path.join(__dirname, 'questions.json');
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

export default (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    const keywords = message.toLowerCase().split(' ').filter(Boolean);
    const results = questions.filter(q =>
      keywords.some(keyword => q.question.toLowerCase().includes(keyword))
    );
    res.status(200).json(results);
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};
