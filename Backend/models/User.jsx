const mongoose = require("mongoose");

const userSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
};

module.exports = User = mongoose.model('User',userSchema);