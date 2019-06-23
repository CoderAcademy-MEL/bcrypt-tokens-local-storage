const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds)
}

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

const generateUser = async (username, password, role ) => {
  const hash = await generateHash(password)
  const newUser = new User({
    name: username,
    password: hash,
    role: role
  })
  return await newUser.save()
}

const generateToken = async ({ name }) => {
  return jwt.sign({ name }, process.env.JWT_SECRET);
} 

module.exports = {
  checkPassword,
  generateUser,
  generateToken
}