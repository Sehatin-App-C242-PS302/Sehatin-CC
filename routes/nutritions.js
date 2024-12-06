const express = require('express');
const { getUserNutritions } = require('../controllers/nutritionsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Endpoint untuk mendapatkan data nutrisi berdasarkan userId
router.get('/image', authMiddleware, getUserNutritions);

module.exports = router;
