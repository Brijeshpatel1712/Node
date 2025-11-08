# Bookstore API (Node.js + Express + MongoDB)

## Overview
Simple RESTful API to manage bookstore details: create, read, update, delete books using MongoDB with Mongoose.

## Features
- Create book (title, author, isbn, publishedDate, pages, genre)
- Fetch list of books with basic search & pagination
- Get single book
- Update book
- Delete book

## Quickstart

1. Install dependencies
   ```bash
   npm install
   ```

2. Create `.env` (copy from `.env.example`) and set `MONGODB_URI`

3. Start MongoDB locally (or use Atlas). Default URI: `mongodb://127.0.0.1:27017/bookstore`

4. Run server
   ```bash
   npm run dev
   ```

5. API endpoints
   - `POST /api/books` - create book (JSON body: title, author, isbn, publishedDate (ISO), pages, genre)
   - `GET /api/books` - list books (query: page, limit, q, genre)
   - `GET /api/books/:id` - get book
   - `PUT /api/books/:id` - update book (JSON body with fields)
   - `DELETE /api/books/:id` - delete book

## Folder structure
```
bookstore_project/
├─ config/
│  └─ db.js
├─ controllers/
│  └─ bookController.js
├─ models/
│  └─ Book.js
├─ routes/
│  └─ books.js
├─ .env.example
├─ package.json
└─ server.js
```

## Notes
- ISBN uniqueness is enforced but sparse, so you can create books without ISBN.
- This project is intentionally small and meant as a starting point for a bookstore CRUD app.
