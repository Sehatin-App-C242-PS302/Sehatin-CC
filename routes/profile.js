const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Mendapatkan profil pengguna
router.get('/', authMiddleware, getProfile);

// Memperbarui profil pengguna
router.put('/', authMiddleware, updateProfile);

module.exports = router;
