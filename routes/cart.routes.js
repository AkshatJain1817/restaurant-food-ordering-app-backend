const express = require('express');
const router = express.Router();
const { addToCart, getCart, clearCart } = require('../controlers/cart.controller');
const userProtect = require('../middleware/auth.middleware');

router.post('/addToCart', userProtect, addToCart);
router.get('/getCart', userProtect, getCart);
router.delete('/clearCart', userProtect, clearCart);

module.exports = router;
