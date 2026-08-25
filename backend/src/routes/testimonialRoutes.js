/**
 * Testimonial Routes
 * Testimonials management endpoints
 */

const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { validate, schemas } = require('../middleware/validation');
const { authenticate, isAdmin } = require('../middleware/auth');

/**
 * Public Routes
 */

// Get all testimonials
router.get('/', testimonialController.getTestimonials);

// Get featured testimonials
router.get('/featured', testimonialController.getFeaturedTestimonials);

/**
 * Admin Routes
 */

// Create testimonial
router.post('/', authenticate, isAdmin, validate(schemas.createTestimonial), testimonialController.createTestimonial);

// Update testimonial
router.put('/:id', authenticate, isAdmin, testimonialController.updateTestimonial);

// Delete testimonial
router.delete('/:id', authenticate, isAdmin, testimonialController.deleteTestimonial);

// Approve testimonial (admin)
router.patch('/:id/approve', authenticate, isAdmin, async (req, res) => {
    try {
        const Testimonial = require('../models/Testimonial');
        const t = await Testimonial.findByIdAndUpdate(req.params.id, { isApproved: true, isActive: true }, { new: true });
        if (!t) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: t });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Reject testimonial (admin)
router.patch('/:id/reject', authenticate, isAdmin, async (req, res) => {
    try {
        const Testimonial = require('../models/Testimonial');
        const t = await Testimonial.findByIdAndUpdate(req.params.id, { isApproved: false, isActive: false }, { new: true });
        if (!t) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: t });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

