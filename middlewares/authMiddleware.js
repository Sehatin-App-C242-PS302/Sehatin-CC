const jwt = require('jsonwebtoken');
const { NO_TOKEN_PROVIDED, INVALID_TOKEN } = require('../constants/messages');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ success: false, message: NO_TOKEN_PROVIDED });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT Payload:', decoded); // Log isi payload token
    req.userId = decoded.id; // Simpan user ID dari token
    next();
  } catch (error) {
    console.error('Invalid token:', error.message);
    res.status(401).json({ success: false, message: INVALID_TOKEN });
  }
};
