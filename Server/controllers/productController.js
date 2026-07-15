const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch products' });
    }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Invalid Product ID' });
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { title, description, price, discount, category, image, stock } = req.body;

        const product = new Product({
            title,
            description,
            price,
            discount,
            category,
            image,
            stock
        });

        const createdProduct = await product.save();

        res.status(201).json(createdProduct);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Server Error: Could not create product',
            error: error.message
        });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {

    console.log("========== UPDATE API HIT ==========");
    console.log("Product ID:", req.params.id);
    console.log("Request Body:", req.body);

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            console.log("Product not found");
            return res.status(404).json({ message: "Product not found" });
        }

        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.category = req.body.category;
        product.image = req.body.image;
        product.stock = req.body.stock;

        const updatedProduct = await product.save();

        console.log("Product Updated Successfully");

        res.json(updatedProduct);

    } catch (error) {

        console.error("UPDATE ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct
};