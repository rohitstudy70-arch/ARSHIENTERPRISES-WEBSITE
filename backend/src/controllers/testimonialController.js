/**
 * Testimonial Controller
 * Handles testimonials management
 */

const Testimonial = require('../models/Testimonial');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Get all active testimonials
 */
exports.getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({ isActive: true })
        .sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
        success: true,
        data: testimonials,
    });
});

/**
 * Get featured testimonials
 */
exports.getFeaturedTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({
        isActive: true,
        featured: true,
    })
        .limit(6)
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: testimonials,
    });
});

/**
 * Create testimonial (Admin)
 */
exports.createTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.create(req.validatedData);

    res.status(201).json({
        success: true,
        message: 'Testimonial created successfully',
        data: testimonial,
    });
});

/**
 * Update testimonial (Admin)
 */
exports.updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!testimonial) {
        return res.status(404).json({
            success: false,
            message: 'Testimonial not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        data: testimonial,
    });
});

/**
 * Delete testimonial (Admin)
 */
exports.deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
        return res.status(404).json({
            success: false,
            message: 'Testimonial not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully',
    });
});
