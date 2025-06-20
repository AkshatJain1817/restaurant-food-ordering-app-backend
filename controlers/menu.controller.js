const MenuItem = require('../models/menu.model.js');

// exports.createMenuItem = async (req, res) => {
//   try {
//     const menuItem = new MenuItem(req.body);
//     const savedItem = await menuItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error while creating menu item' });
//   }
// };

// const MenuItem = require('../models/menuItem.model');

exports.createMenuItem = async (req, res) => {
  try {
    const menuItemData = {
      ...req.body,
      imageUrl: req.file?.path || '' 
    };

    const menuItem = new MenuItem(menuItemData);
    const savedItem = await menuItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Server error while creating menu item' });
  }
};


exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching menu items' });
  }
};

exports.getMenuItemsByCategory = async (req, res) => {
  try{
    const { category } = req.params;

    const menuItems = await MenuItem.find({ category});

    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category' });
    }

    res.status(200).json({
      message: `Items in category: ${category}`,
      data: menuItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching menu items by category' });
  }
}

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching menu item' });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating menu item' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting menu item' });
  }
};
