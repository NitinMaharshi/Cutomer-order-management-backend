const express = require('express');
const OrderController = require('../controller/order.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/add', authMiddleware, OrderController.create);
router.get('/', authMiddleware, OrderController.getAll);
router.get('/owned/orders', authMiddleware, OrderController.myOrders);
router.get('/:id', authMiddleware, OrderController.getById);
router.patch('/:id', authMiddleware, OrderController.update);
router.patch('/status/:id', OrderController.updateOrderStatus);
router.delete('/:id', authMiddleware, OrderController.delete);

module.exports = router;
