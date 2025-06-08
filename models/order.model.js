const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, required: true },
        addOns: [String]
    }],
    orderType: { type: String, enum: ['Dine-in', 'Takeaway', 'Delivery'], required: true },
    bulkOrder: {
        isBulk: { type: Boolean, default: false },
        date: Date,
        time: String,
        numberOfGuests: Number,
        specialInstructions: String,
        confirmed: { type: Boolean, default: false }
    },
    status: { type: String, enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Pending' },
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'Online'], required: true },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});



const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;