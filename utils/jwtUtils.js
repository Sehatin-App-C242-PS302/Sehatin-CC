// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config');

// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1d' });
// };

// module.exports = { generateToken };

//===

const jwt = require('jsonwebtoken');

// Mengambil JWT_SECRET dari variabel lingkungan (.env)
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (userId) => {
  // Periksa apakah JWT_SECRET sudah terdefinisi
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');  // Menambahkan pengecekan jika secret tidak ditemukan
  }
  
  // Buat token JWT dengan userId dan secret key
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1d' }); // Token akan kedaluwarsa dalam 1 hari
};

module.exports = { generateToken };



// ====
// const jwt = require('jsonwebtoken');

// // Mengambil JWT_SECRET dari variabel lingkungan (.env)
// const jwtSecret = process.env.JWT_SECRET;

// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1d' }); // Token akan kedaluwarsa dalam 1 hari
// };

// module.exports = { generateToken };
