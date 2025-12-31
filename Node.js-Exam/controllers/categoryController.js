const Category = require('../models/Category');

// @desc    Create category
// @route   POST /categories
exports.createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.redirect('/tasks');
    } catch (err) {
        res.status(400).send('Error creating category');
    }
};
