const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateUser = require("../middleware/authMiddleware");

router.get('/', authenticateUser, productController.getAllProducts);
router.post('/', authenticateUser, productController.createProduct);
router.delete('/', authenticateUser, productController.deleteProduct);

module.exports = router;
