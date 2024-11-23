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

// Fungsi untuk membuat token
const generateToken = (userId) => {
  // Periksa apakah JWT_SECRET sudah terdefinisi
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');  // Menambahkan pengecekan jika secret tidak ditemukan
  }
  
  // Buat token JWT dengan userId dan secret key
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1d' }); // Token akan kedaluwarsa dalam 1 hari
};

// Fungsi untuk memverifikasi token dan mengambil informasi user
const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, jwtSecret); // Dekode token dengan secret key
    return decoded; // Mengembalikan informasi user yang didekode
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };

