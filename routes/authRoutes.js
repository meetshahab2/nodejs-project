const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again later."
});

router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;
