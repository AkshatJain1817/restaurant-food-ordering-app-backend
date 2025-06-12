const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, default: 1 },
  addOns: [String]
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);