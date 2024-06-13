// api/chatbot.js
import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const questionsPath = path.join(process.cwd(), 'data', 'questions.json');
      const questionsData = await fs.readFile(questionsPath, 'utf8');
      const questions = JSON.parse(questionsData);

      const { message } = req.body;
      const keywords = message.toLowerCase().split(' ').filter(Boolean);
      const results = questions.filter(q =>
        keywords.some(keyword => q.question.toLowerCase().includes(keyword))
      );

      res.status(200).json(results);
    } catch (error) {
      console.error('Error reading questions.json:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};
