const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Route to create an order (User) and get all orders (Admin)
router.route('/')
    .post(protect, createOrder)
    .get(protect, admin, getAllOrders);

// Route for a user to get their own order history
router.route('/myorders')
    .get(protect, getMyOrders);

// Route for an admin to update the delivery status of an order
router.route('/:id/status')
    .put(protect, admin, updateOrderStatus);

module.exports = router;