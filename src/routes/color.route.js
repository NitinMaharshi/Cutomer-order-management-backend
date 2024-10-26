const express = require('express');
const ColorController = require('../controller/color.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/add', authMiddleware, ColorController.createColor);
router.get('/', authMiddleware, ColorController.getAllColors);
router.get('/:id', authMiddleware,ColorController.getColor);
router.patch('/:id',authMiddleware, ColorController.updateColor);
router.delete('/:id', authMiddleware, ColorController.deleteColor);

module.exports = router;
