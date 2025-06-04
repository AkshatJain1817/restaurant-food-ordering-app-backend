const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Starters', 'Main Course', 'Desserts', 'Beverages'], required: true },
    price: { type: Number, required: true },
    description: String,
    imageUrl: String,
    ingredients: [String],
    addOns: [String],
    createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = MenuItem;