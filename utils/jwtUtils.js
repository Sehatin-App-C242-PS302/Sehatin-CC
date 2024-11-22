const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1d' });
};

module.exports = { generateToken };
