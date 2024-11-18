const express = require('express');
const { getRecommendations, addUserData } = require('../controllers/healthController');

const router = express.Router();

router.get('/recommendations', getRecommendations);
router.post('/user-data', addUserData);

module.exports = router;
