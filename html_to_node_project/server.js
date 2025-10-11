const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const data = { title: 'Home from Node', name: 'Arpit', items: ['apple', 'mango', 'yak'] };
  res.render('index', data);
});

app.post('/submit', (req, res) => {
  console.log('Submitted:', req.body);
  res.json({ status: 'ok', data: req.body });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
