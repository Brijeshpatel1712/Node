const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/mycruddb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
