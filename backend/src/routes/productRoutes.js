/**
 * Product Routes
 * Product management endpoints
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validate, schemas } = require('../middleware/validation');
const { authenticate, isAdmin } = require('../middleware/auth');

/**
 * Public Routes
 */

// Get all products with pagination
router.get('/', productController.getAllProducts);

// Get product by slug
router.get('/slug/:slug', productController.getProductBySlug);

// Get featured products
router.get('/featured', productController.getFeaturedProducts);

// Get related products
router.get('/related/:productId', productController.getRelatedProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

/**
 * Admin Routes
 */

// Create product
router.post('/', authenticate, isAdmin, validate(schemas.createProduct), productController.createProduct);

// Update product
router.put('/:id', authenticate, isAdmin, productController.updateProduct);

// Delete product
router.delete('/:id', authenticate, isAdmin, productController.deleteProduct);

// Get product statistics
router.get('/admin/stats', authenticate, isAdmin, productController.getProductStats);

module.exports = router;
