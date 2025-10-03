const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '24h', 
  });
};

module.exports = { generateToken };