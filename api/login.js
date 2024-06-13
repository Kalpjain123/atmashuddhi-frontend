// api/login.js
import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { mobileNumber, dateOfBirth } = req.body;

    try {
      const usersPath = path.join(process.cwd(), 'data', 'users.json');
      const usersData = await fs.readFile(usersPath, 'utf8');
      const users = JSON.parse(usersData);

      const user = users.find(user => 
        user.mobileNumber === mobileNumber && user.dateOfBirth === dateOfBirth
      );

      if (user) {
        res.status(200).json({ message: 'Login successful', userId: user.id });
      } else {
        res.status(401).json({ message: 'Invalid mobile number or date of birth' });
      }
    } catch (error) {
      console.error('Error reading users.json:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};
