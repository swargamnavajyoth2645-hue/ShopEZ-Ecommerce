const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js');

// Initialize the app
const app = express();
// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to parse JSON payloads
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Basic Test Route
app.get('/', (req, res) => {
    res.send('SHOPEZ Backend Server is running!');
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});