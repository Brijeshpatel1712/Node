const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const booksRouter = require('./routes/books');

// load env
dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/books', booksRouter);

// health
app.get('/', (req, res) => res.send({status: 'ok', message: 'Bookstore API'}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
