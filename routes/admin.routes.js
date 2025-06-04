
const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controlers/admin.controller');
const adminProtect = require('../middleware/admin.middleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
