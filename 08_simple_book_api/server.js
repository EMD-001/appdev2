const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];


app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js and Express');
});


app.get('/api/books', (req, res) => {
  res.json(books);
});


app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find(book => book.id === parseInt(id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});



app.post("/api/books", (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author are required" });

    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});


app.patch("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = books.find(book => book.id === parseInt(id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;

    res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === parseInt(id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    books = books.filter(book => book.id !== parseInt(id));
    res.json({ message: "Book deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
