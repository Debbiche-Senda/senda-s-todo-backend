const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  task: String,
  isCompleted: false
});

module.exports = mongoose.model('Todo', todoSchema);
