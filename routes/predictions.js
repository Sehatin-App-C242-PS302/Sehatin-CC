const express = require('express');
const { getPredictionsByUserId } = require('../controllers/predictionsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rute untuk mendapatkan prediksi berdasarkan user_id
router.get('/user/:user_id', authMiddleware, getPredictionsByUserId);

module.exports = router;
