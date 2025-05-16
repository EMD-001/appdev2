const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routers/bookRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js, Express, and MongoDB');
});

app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
