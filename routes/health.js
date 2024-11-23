const express = require('express');
const {
  createHealthProfile,
  getHealthProfileById,
  updateHealthProfile,
  getHealthProfilesByUserId, // Import method baru
} = require('../controllers/healthController');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware'); // Import authMiddleware
const { healthProfileSchema } = require('../validators/healthValidator');

const router = express.Router();

// Middleware untuk autentikasi di semua rute
router.use(authMiddleware);

// Routes for Health Profile
router.post('/', validate(healthProfileSchema), createHealthProfile); // Create
router.get('/:id', getHealthProfileById);
router.put('/:id', validate(healthProfileSchema), updateHealthProfile);
router.get('/user/:userId', getHealthProfilesByUserId);

module.exports = router;
