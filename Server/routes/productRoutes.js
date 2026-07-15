const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// Get all products & Create new product
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

// Get single product & Update product
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct);

module.exports = router;