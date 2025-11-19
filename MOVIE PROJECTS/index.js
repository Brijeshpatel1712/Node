const express = require('express');
const { User } = require('./db');
const app = express();
const PORT = 2020;

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(users);
  } catch (err) {
    res.status('Error fetching users');
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.status('User created', user );
  } catch (err) {
    res.status( 'Error creating user' );
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status('User deleted');
  } catch (err) {
    res.status('Error deleting user');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
