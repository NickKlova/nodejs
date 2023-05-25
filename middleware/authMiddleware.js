const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET_KEY = 'secret_key';

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        if (!token) {
            return res.status(401).json({ success: false, message: '[Server-Auth]: Unauthenticated.' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: '[Server-Auth]: Unauthenticated.' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: '[Server-Auth]: Unauthenticated.' });
    }
};

module.exports = authenticateUser;
