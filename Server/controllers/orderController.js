const Order = require('../models/orderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Logged in users only)
const createOrder = async (req, res) => {
    try {
        const { products, amount, address } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            userId: req.user._id, // Attached by the auth middleware
            products,
            amount,
            address
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not create order', error: error.message });
    }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch your orders' });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'id username email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch all orders' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not update order status', error: error.message });
    }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };