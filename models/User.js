// user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User