// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Book, Author, Category } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/libraryDB');

// CREATE a Book
app.post('/api/books', async (req, res) => {
  const { title, authorName, categoryName } = req.body;
  
  try {
    // 1. Find or create the Author
    let author = await Author.findOne({ name: authorName });
    if (!author) {
      author = new Author({ name: authorName });
      await author.save();
    }

    // 2. Find or create the Category
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = new Category({ name: categoryName });
      await category.save();
    }

    // 3. Create the Book and link the ObjectIds
    const newBook = new Book({
      title: title,
      author: author._id,            // Linking the One-to-Many
      categories: [category._id]     // Linking the Many-to-Many
    });
    
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
});

// READ Books (Highlighting the relationships with .populate)
app.get('/api/books', async (req, res) => {
  const books = await Book.find()
    .populate('author')      // Replaces author ID with full Author object
    .populate('categories'); // Replaces category IDs with full Category objects
  res.json(books);
});

// UPDATE a Book
app.put('/api/books/:id', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
});

// DELETE a Book
app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));