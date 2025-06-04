const Order = require('../models/order.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

exports.placeOrder = async (req, res) => {
  const { items, orderType, bulkOrder, deliveryAddress, paymentMethod, totalAmount } = req.body;

  try {
    const order = new Order({
      userId: req.user._id,  // Assuming user middleware sets req.user
      items,
      orderType,
      bulkOrder,
      deliveryAddress,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while placing order' });
  }
};