const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ success: false, message: '[Server-Auth]: Access is denied.' });
        }

        const categories = await Category.find().populate('parent');
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
};

exports.createCategory = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: '[Server-Auth]: Access is denied.' });
        }

        const { name, parent } = req.body;

        const category = new Category({ name, parent });
        await category.save();

        res.status(201).json({ message: '[Server]: The category has been successfully created.', category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: '[Server-Auth]: Access is denied.' });
        }

        const { name, parent } = req.body;
        const category = new Category({ name });
        await category.deleteOne();

        res.status(201).json({ message: '[Server]: The category has been successfully removed.', category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
}