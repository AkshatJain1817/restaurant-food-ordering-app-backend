const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} = require('../controlers/menu.controller');
const adminProtect = require('../middleware/admin.middleware');

// Menu routes for public
router.get('/getMenuItems', getAllMenuItems);
router.get('/getMenuItem/:id', getMenuItemById);

// Menu routes for admin
router.post('/createMenuItem', adminProtect, upload.single('image'), createMenuItem);
router.put('/updateMenuItem/:id', adminProtect, updateMenuItem);
router.delete('/deleteMenuItem/:id', adminProtect, deleteMenuItem);

module.exports = router;