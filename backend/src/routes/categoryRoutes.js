/**
 * Category Routes
 * Product categories endpoints
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, isAdmin } = require('../middleware/auth');

/**
 * Public Routes
 */

// Get all categories
router.get('/', categoryController.getCategories);

// Get category by slug
router.get('/:slug', categoryController.getCategoryBySlug);

/**
 * Admin Routes
 */

// Create category
router.post('/', authenticate, isAdmin, categoryController.createCategory);

// Update category
router.put('/:id', authenticate, isAdmin, categoryController.updateCategory);

// Delete category
router.delete('/:id', authenticate, isAdmin, categoryController.deleteCategory);

module.exports = router;
