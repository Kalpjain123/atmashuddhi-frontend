// api/books.js
const fs = require('fs');
const path = require('path');

// Load books from a JSON file
const booksPath = path.join(__dirname, 'books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

export default (req, res) => {
  res.status(200).json(books);
};
