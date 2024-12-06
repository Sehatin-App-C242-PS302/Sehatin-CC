const express = require('express');
const { getPredictions } = require('../controllers/nutritionsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Endpoint untuk mendapatkan prediksi berdasarkan userId
router.get('/image', authMiddleware, getPredictions);

module.exports = router;
