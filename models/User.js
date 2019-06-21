// user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User