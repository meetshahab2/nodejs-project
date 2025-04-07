const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');


router.post('/register', authController.register);


router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
