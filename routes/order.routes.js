const express = require('express');
const router = express.Router();
const { 
    // placeOrder,
    placeNormalOrder,
    placeBulkOrder,
    getAllOrders,
    getBulkOrders,
    getNormalOrders,
    getUserOrders,
    updateOrderStatus,
    deleteOrder,
    placeOrderFromCart,
    editOrder
} = require('../controlers/order.controller');
const userProtect = require('../middleware/auth.middleware');
const adminProtect = require('../middleware/admin.middleware');

//order routes for user
// router.post('/placeOrder', userProtect, placeOrder);
router.post('/placeNormalOrder', userProtect, placeNormalOrder);
router.post('/placeBulkOrder', userProtect, placeBulkOrder);
router.get('/getUserOrders', userProtect, getUserOrders);
router.delete('/deleteOrder/:id', userProtect, deleteOrder);
router.put('/editOrder/:id', userProtect, editOrder);
router.post('/placeOrderFromCart', userProtect, placeOrderFromCart);

//order routes for admin
router.get('/getNormalOrders', adminProtect, getNormalOrders);
router.get('/getBulkOrders', adminProtect, getBulkOrders);
router.get('/getAllOrders', adminProtect, getAllOrders);
router.patch('/updateOrderStatus/:id', adminProtect, updateOrderStatus);

module.exports = router;