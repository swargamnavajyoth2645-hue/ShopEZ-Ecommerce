const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// 1. Load Environment Variables
dotenv.config();

// 2. Import Your Models
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Cart = require('./models/cartModel');
const Order = require('./models/orderModel');

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding...'))
  .catch(err => console.error('Connection Error:', err));

const importData = async () => {
    try {
        // 4. Wipe the database clean to prevent duplicates
        await Order.deleteMany();
        await Cart.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // 5. Hash passwords for our test users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        // 6. Create Master Admin & Test Customer
        await User.insertMany([
            {
                username: 'Master Admin',
                email: 'admin@shopez.com',
                password: hashedPassword,
                isAdmin: true
            },
            {
                username: 'Test Customer',
                email: 'customer@shopez.com',
                password: hashedPassword,
                isAdmin: false
            }
        ]);

        // 7. Inject Premium High-Fidelity Products
        const sampleProducts = [
            {
                title: 'iPhone 14 Pro - 256GB Deep Purple',
                price: 999,
                discount: 10,
                stock: 45,
                category: 'Mobiles',
                image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600',
                description: 'The ultimate premium smartphone experience with Dynamic Island and a massive 48MP main camera.'
            },
            {
                title: 'Sony WH-1000XM5 ANC Headphones',
                price: 399,
                discount: 15,
                stock: 24,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600',
                description: 'Industry-leading noise cancellation optimized for your lifestyle. Exceptionally clear call quality.'
            },
            {
                title: 'Minimalist Onyx Leather Daypack',
                price: 149,
                discount: 0,
                stock: 12,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600',
                description: 'Handcrafted from full-grain Italian leather. Features a dedicated 15-inch laptop sleeve.'
            },
            {
                title: 'MRF Genius Grand Edition Cricket Bat',
                price: 180,
                discount: 20,
                stock: 8,
                category: 'Sports',
                image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=600',
                description: 'Premium English willow cricket bat for professional players, offering perfect balance and massive sweet spot.'
            },
            {
                title: 'Keychron Q1 Pro Mechanical Keyboard',
                price: 199,
                discount: 5,
                stock: 15,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600',
                description: 'A fully customizable 75% layout wireless custom mechanical keyboard with hot-swappable switches.'
            },
            {
                title: 'Fresh Organic Avocados (1kg)',
                price: 12,
                discount: 0,
                stock: 100,
                category: 'Groceries',
                image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=600',
                description: 'Locally sourced, farm-fresh organic avocados packed with healthy nutrients.'
            }
        ];

        await Product.insertMany(sampleProducts);

        console.log('✅ Master Database Successfully Seeded!');
        process.exit();
    } catch (error) {
        console.error('❌ Data Seeding Failed:', error);
        process.exit(1);
    }
};

importData();