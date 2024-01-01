const mongoose = require("mongoose");

const todoSchema = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

module.exports = Todo = mongoose.model('Todo',todoSchema);