const Order = require('../models/order.model');

exports.placeNormalOrder = async (req, res) => {
  const { items, orderType, deliveryAddress, paymentMethod, totalAmount } = req.body;

  try {
    const order = new Order({
      userId: req.user._id,
      items,
      orderType,
      paymentMethod,
      totalAmount,
      deliveryAddress,
      bulkOrder: { isBulk: false } // Ensure it's marked as non-bulk
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while placing normal order' });
  }
};

exports.placeBulkOrder = async (req, res) => {
  const { items, orderType, deliveryAddress, paymentMethod, totalAmount, bulkOrder } = req.body;

  try {
    const order = new Order({
      userId: req.user._id,
      items,
      orderType,
      deliveryAddress,
      paymentMethod,
      totalAmount,
      bulkOrder: {
        ...bulkOrder,
        isBulk: true,
        confirmed: false // Default, can be updated by admin later
      }
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while placing bulk order' });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'email') 
      // .populate('items.menuItemId', 'name price');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

exports.getNormalOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'bulkOrder.isBulk': false }).populate('userId items.menuItemId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching normal orders:', error);
    res.status(500).json({ message: 'Server error while fetching normal orders' });
  }
};

exports.getBulkOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'bulkOrder.isBulk': true }).populate('userId items.menuItemId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching bulk orders:', error);
    res.status(500).json({ message: 'Server error while fetching bulk orders' });
  }
}

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      // .populate('items.menuItemId', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating order status' });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: id, userId: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    await order.deleteOne();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting order' });
  }
};

exports.editOrder = async (req, res) => {
  const { id } = req.params;
  const {
    items,
    orderType,
    bulkOrder,
    deliveryAddress,
    paymentMethod,
    totalAmount
  } = req.body;

  try {
    const order = await Order.findOne({ _id: id, userId: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending orders can be edited' });
    }

    order.items = items || order.items;
    order.orderType = orderType || order.orderType;
    order.bulkOrder = bulkOrder || order.bulkOrder;
    order.deliveryAddress = deliveryAddress || order.deliveryAddress;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.totalAmount = totalAmount || order.totalAmount;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while editing order' });
  }
};