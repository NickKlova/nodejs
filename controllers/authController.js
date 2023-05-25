const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const JWT_SECRET_KEY = 'secret_key';

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: '[Server-Auth]: A user with this email already exists.' });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);

        res.status(201).json({ message: '[Server-Auth]: The user is successfully registered.', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: '[Server-Auth]: User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '[Server-Auth]: Incorrect password.' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);

        res.status(200).json({ message: '[Server-Auth]: Login successful.', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '[Server]: Server error.' });
    }
};
