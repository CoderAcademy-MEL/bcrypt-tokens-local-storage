const User = require('../models/User')
const { checkPassword, generateUser, generateToken } = require('../utils/auth-utils')

// register post endpoint
const register = async (req, res) => {
  const { username, password, role } = req.body
  if (username && password) {
    try {
      const query = await User.findOne({ name: username })
      if (query === null) {
        const user = await generateUser(username, password, role)
        const token = await generateToken(user)
        return res.send({ token })
      } else {
        return res.status(403).send('user already exists')
      }
    } catch(err) {
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('incorrect credentials')
  }
}

// login post endpoint
const login = async (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    try {
      const query = await User.findOne({ name: username })
      if (query !== null) {
        const result = await checkPassword(password, query.password)
        if (!result) {
          return res.status(403).send('incorrect credentials')
        } else {
          const token = await generateToken(query)
          return res.send({ token })
        }
      } else {
        return res.status(403).send('incorrect credentials')
      }
    } catch(err) {
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('incorrect credentials')
  }
}

module.exports = {
  register,
  login
}