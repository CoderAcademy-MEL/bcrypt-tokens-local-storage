const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User')

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

// auth post endpoint goes here
const register = (req, res) => {
  // object deconstruction to access username and password
  const { username, password, role } = req.body
  // search the database for the user with mongoose method like .findOne(), make sure the username doesn't already exist  
  console.log(username, password)
  if (username && password) {
    User.findOne({ name: username })
      .then((doc) => {
        if (doc) {
          console.log('hello')
          console.log(doc)
          return res.status(404).send('user already exists')
        }
        // create the new user using mongoose, method like .create()
        if (!doc) {
          const newUser = new User({
            name: username,
            password: password,
            role: role
          })
          newUser.save((err) => {
            if (err) {
              return res.status(400).send('incorrect credentials entered') 
            } else {
              console.log('user successfully created')
              // let payload = {
              //   username
              // }
              // const token = generateToken(payload)
              // return res.send({token: token})
            }
          })
        } else {
          // if the username does exist send an error response
          res.status(400).send('incorrect credentials (user exists)')
        }
      })
      .catch((err) => {
        res.status(400).send('incorrect credentials (no mongoose)')
      })
  } else {
    res.status(400).send('incorrect credentials')
  }
}

module.exports = {
  register
}