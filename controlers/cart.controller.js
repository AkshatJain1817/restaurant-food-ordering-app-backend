const Cart = require('../models/cart.model');

exports.addToCart = async (req, res) => {
    const { menuItemId, quantity, addOns } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ menuItemId, quantity, addOns }] });
    } else {
      const existingItem = cart.items.find(item => item.menuItemId.toString() === menuItemId);
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.addOns = addOns || existingItem.addOns;
      } else {
        cart.items.push({ menuItemId, quantity, addOns });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
}

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.menuItemId');
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart' });
  }
};