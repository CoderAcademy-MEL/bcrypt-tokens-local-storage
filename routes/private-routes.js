// private routes go here
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secrets } = require('../controllers/private-controller');

const checkToken = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      next();
    }
  } catch(err) {
    return res.status(403).send('incorrect token');
  }
}

router.use(checkToken)

router.get('/secrets', secrets);

module.exports = router;