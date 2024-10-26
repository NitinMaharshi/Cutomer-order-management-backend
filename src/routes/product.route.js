const express = require('express');
const ProductController = require('../controller/product.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/add', authMiddleware, ProductController.create);
router.get('/', authMiddleware, ProductController.getAll);
router.get('/:id', authMiddleware, ProductController.getById);
router.patch('/:id', authMiddleware, ProductController.update);
router.delete('/:id', authMiddleware, ProductController.delete);

module.exports = router;
