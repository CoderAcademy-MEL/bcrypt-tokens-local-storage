const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User')

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
}

// auth post endpoint goes here
const register = (req, res) => {
  // object deconstruction to access username and password
  const { username, password, role } = req.body
  // search the database for the user with mongoose method like .findOne(), make sure the username doesn't already exist  
  if (username && password) {
    User.findOne({ username })
      .then((doc) => {
        if (doc) {
          // if the username does exist send an error response
          res.status(400).send('incorrect credentials')
        } else {
          const newUser = new User({
            name: username,
            password: password,
            role: role
          })
          newUser.save((err) => {
            if (err) return res.status(400).send('incorrect credentials entered')
          })
          // create the new user using mongoose, method like .create()
          // req.body is new user
          const token = generateToken(req.body)
          return res.send({token: token})
        }
      })
      .catch((err) => {
        res.status(400).send('incorrect credentials')
      })
  } else {
    res.status(400).send('incorrect credentials')
  }
}

module.exports = {
  register
}