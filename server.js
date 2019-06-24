const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')

const app = new express();

// database connection
mongoose.connect('mongodb://localhost:27017/whatver-you-want-to-call-it', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('mongodb not on')
  } else {
    console.log('mongodb connected')
  }
})

// cors
app.use(cors())

// connect to router
app.use(require('./routes'))

// listen on port 3000
app.listen(5000, () => console.log('listening on port 5000'))