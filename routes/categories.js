const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', authenticateUser, categoryController.getAllCategories);
router.post('/', authenticateUser, categoryController.createCategory);
router.delete('/', authenticateUser, categoryController.deleteCategory);

module.exports = router;