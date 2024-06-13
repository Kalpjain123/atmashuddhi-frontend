// api/register.js
import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, mobileNumber, address, pincode, email, dateOfBirth, whatsappNumber } = req.body;

    try {
      const usersPath = path.join(process.cwd(), 'data', 'users.json');
      const usersData = await fs.readFile(usersPath, 'utf8');
      const users = JSON.parse(usersData);

      const newId = `ASP-${users.length + 1}`;

      if (users.some(user => user.mobileNumber === mobileNumber)) {
        return res.status(400).json({ message: 'Mobile number already registered' });
      }

      const newUser = {
        id: newId,
        name,
        mobileNumber,
        address,
        pincode,
        email: email || '',
        dateOfBirth,
        whatsappNumber: whatsappNumber || mobileNumber,
      };

      users.push(newUser);

      await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

      res.status(201).json({ message: 'Registration successful', userId: newId });
    } catch (error) {
      console.error('Error processing registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
};
