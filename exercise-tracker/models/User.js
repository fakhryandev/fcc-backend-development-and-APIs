const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
  },
});

module.exports = mongoose.model("User", userSchema);
