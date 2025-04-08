const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Add this POST route!
router.post('/register', authController.register);

module.exports = router;