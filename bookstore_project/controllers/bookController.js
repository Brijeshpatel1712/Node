const Book = require('../models/Book');

// Create book
exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedDate, pages, genre } = req.body;
    const book = new Book({ title, author, isbn, publishedDate, pages, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    // duplicate key error for isbn
    if (err.code === 11000) {
      return res.status(400).json({ message: 'ISBN already exists' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all books (with simple filtering, pagination)
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, genre } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') },
        { isbn: new RegExp(q, 'i') }
      ];
    }
    if (genre) filter.genre = genre;
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Book.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(400).json({ message: 'ISBN already exists' });
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
