const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, 
  ref: 'User', required: true } 
});

module.exports = mongoose.model('Book', bookSchema);
