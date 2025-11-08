const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookController');

// POST /api/books -> create
router.post('/', ctrl.createBook);

// GET /api/books -> list
router.get('/', ctrl.getBooks);

// GET /api/books/:id -> read
router.get('/:id', ctrl.getBook);

// PUT /api/books/:id -> update
router.put('/:id', ctrl.updateBook);

// DELETE /api/books/:id -> delete
router.delete('/:id', ctrl.deleteBook);

module.exports = router;
