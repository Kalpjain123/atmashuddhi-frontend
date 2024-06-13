// api/chatbot.js
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { message, feedback, user } = req.body;

    try {
      const questionsPath = path.join(process.cwd(), 'data', 'questions.json');
      const questionsData = await fs.readFile(questionsPath, 'utf8');
      const questions = JSON.parse(questionsData);

      if (feedback) {
        const ticketsPath = path.join(process.cwd(), 'data', 'tickets.json');
        const ticketsData = await fs.readFile(ticketsPath, 'utf8');
        const tickets = JSON.parse(ticketsData);

        const newTicket = {
          id: uuidv4(),
          question: feedback.question,
          user: user,
          status: 'open',
        };

        tickets.push(newTicket);
        await fs.writeFile(ticketsPath, JSON.stringify(tickets, null, 2));

        return res.status(200).json({ message: 'Ticket created', token: newTicket.id });
      }

      const keywords = message.toLowerCase().split(' ').filter(Boolean);
      const results = questions.filter(q =>
        keywords.some(keyword => q.question.toLowerCase().includes(keyword))
      );

      res.status(200).json(results);

    } catch (error) {
      console.error('Error reading JSON:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};
