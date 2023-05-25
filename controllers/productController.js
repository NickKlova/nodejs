const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ success: false, message: '[Server-Auth]: Access is denied.' });
        }

        const products = await Product.find().populate('categoryId');
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: '[Server-Auth]: Access is denied.' });
        }

        const { name, categoryId } = req.body;

        const product = new Product({ name, categoryId });
        await product.save();

        res.status(201).json({ message: '[Server]: The product has been successfully created.', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: '[Server-Auth]: Access is denied.' });
        }

        const { name, categoryId } = req.body;

        const product = new Product({ name, categoryId });
        await product.deleteOne();

        res.status(201).json({ message: '[Server]: The product has been successfully removed.', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
}