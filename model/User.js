const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
