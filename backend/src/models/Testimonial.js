/**
 * Testimonial Model
 * Schema for customer testimonials
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        company: {
            type: String,
            optional: true,
        },
        position: {
            type: String,
            optional: true,
        },
        message: {
            type: String,
            required: [true, 'Please provide a testimonial message'],
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        image: {
            type: String,
            optional: true,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        adminAdded: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

testimonialSchema.index({ isActive: 1 });
testimonialSchema.index({ featured: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
