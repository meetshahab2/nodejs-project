const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, try again later."
});

router.post('/create', authMiddleware, createLimiter, categoryController.create);
router.get('/list', authMiddleware, categoryController.getAll);
router.get('/:id', authMiddleware, categoryController.getById);
router.put('/:id', authMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, categoryController.delete);

module.exports = router;
