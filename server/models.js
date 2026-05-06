// models.js
const mongoose = require('mongoose');

// 1. Author Schema
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String
});

// 2. Category Schema
const categorySchema = new mongoose.Schema({
  name: String
});

// 3. Book Schema (Highlighting Relationships)
const bookSchema = new mongoose.Schema({
  title: String,
  // ONE-TO-MANY: A book has one author, an author has many books
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author' 
  },
  // MANY-TO-MANY: A book has many categories, a category has many books
  categories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  }]
});

const Author = mongoose.model('Author', authorSchema);
const Category = mongoose.model('Category', categorySchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = { Author, Category, Book };