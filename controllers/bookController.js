const Book = require('../models/book');
const sendEmail = require('../middlewares/send-email.middleware'); 

async function getAllBooks(req, res) {
  try {
    const books = await Book.find({ user: req.user.id }); 
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getBookById(req, res) {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createBook(req, res) {
  const { title, author, year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const book = new Book({
    title,
    author,
    year,
    user: req.user.id, 
  });

  try {
    const newBook = await book.save();

    
    await sendEmail({
      title: newBook.title,
      author: newBook.author,
      year: newBook.year,
    });

    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateBook(req, res) {
  const { title, author } = req.body;

  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found or unauthorized' });

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteBook(req, res) {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found or unauthorized' });

    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
