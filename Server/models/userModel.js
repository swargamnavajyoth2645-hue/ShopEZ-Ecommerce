const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false // Regular users are false, Admins will be set to true
    }
}, { timestamps: true }); // Automatically creates 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('User', userSchema);