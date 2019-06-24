const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const generateHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds)
}

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

const generateUser = async (username, password, role) => {
  const hash = await generateHash(password)
  const newUser = new User({
    name: username,
    password: hash,
    role: role
  })
  return await newUser.save()
}

const generateAccessToken = async ({ name }) => {
  return jwt.sign({ name }, process.env.JWT_SECRET, {expiresIn: '30s'});
} 

module.exports = {
  checkPassword,
  generateUser,
  generateAccessToken
}

// for meeting with jon

// access tokens 
// carry the necessary information to access a resource directly
// access tokens usually have an expiration date and are short-lived

// refresh tokens 
// carry the information necessary to get a new access token
// refresh tokens are usually subject to strict storage requirements to ensure they are not leaked
// they can also be blacklisted by the authorization server

// my thinking

// 1
// create both an access token and refresh token when user creates account
// access token has short time (30 mins)
// refresh token is long (4 weeks)
// can the access token just be another token, what kind of payload should it be, i feel like refresh token can then just be the same as what's already there

// 2
// when user makes subsequent requests we check for refresh token and access token
// if refresh token is okay and access token is expired we generate a new access token (just the access token?) and respond with that

// 3
// should both tokens be stored in local storage
// can we use cookies or do we send the tokens across as just plain old headers
// i feel like we need to use cookies as the custom headers can only be generated with an axios request 
// how does this all work?