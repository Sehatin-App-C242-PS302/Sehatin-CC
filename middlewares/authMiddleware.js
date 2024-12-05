const jwt = require('jsonwebtoken');
const { NO_TOKEN_PROVIDED, INVALID_TOKEN } = require('../constants/messages');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.error('No token provided in Authorization header');
    return res.status(401).json({ message: NO_TOKEN_PROVIDED });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT Payload:', decoded);

    if (!decoded.id) {
      console.error('Invalid token: ID not found in payload');
      return res.status(401).json({ message: INVALID_TOKEN });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(401).json({ message: INVALID_TOKEN });
  }
};
