const express = require('express');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { register, login } = require('../controllers/authController');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
