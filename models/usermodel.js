const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    match: /^[a-zA-Z\s\-']+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
 
});

// TOKEN with role included
userschema.methods.generateAuthToken = function () {
  const payload = { 
    _id: this._id,
    email: this.email,
    name: this.name,
       // <--- NEW: Include role in token!
  };

  const token = jwt.sign(payload, config.get('jwtPrivateKey'), { expiresIn: '1h' });
  return token;
};

module.exports = mongoose.model('Tester', userschema);
