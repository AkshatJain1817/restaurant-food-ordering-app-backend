const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controlers/order.controller');
const userProtect = require('../middleware/auth.middleware');
const adminProtect = require('../middleware/admin.middleware');

router.post('/placeOrder', userProtect, placeOrder);

module.exports = router;