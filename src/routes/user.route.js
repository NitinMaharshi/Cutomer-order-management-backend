const express = require('express');
const UserController = require('../controller/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/add', UserController.create);
router.get('/', authMiddleware, UserController.getAll);
router.get('/:id', authMiddleware, UserController.getById);
router.patch('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.delete);
router.post('/login', UserController.login);
router.post('/logout', authMiddleware, UserController.logout);

module.exports = router;
