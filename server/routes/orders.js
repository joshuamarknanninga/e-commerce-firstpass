// server/routes/orders.js
const express = require('express');
const { createOrder, getOrderById, getUserOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new order
router.post('/', authMiddleware, createOrder);

// Get order by ID
router.get('/:id', authMiddleware, getOrderById);

// Get orders for a specific user
router.get('/user/:userId', authMiddleware, getUserOrders);

module.exports = router;
