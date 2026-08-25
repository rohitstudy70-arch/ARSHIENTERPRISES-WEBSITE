/**
 * Product Model
 * Schema for GPS tracking products
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide product title'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
            maxlength: [500, 'Short description cannot exceed 500 characters'],
        },
        fullDescription: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        image: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        specifications: [
            {
                type: String,
            },
        ],
        features: [
            {
                type: String,
            },
        ],
        inStock: {
            type: Boolean,
            default: true,
        },
        stockQuantity: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        // SEO Fields
        seoTitle: {
            type: String,
            maxlength: [60, 'SEO title cannot exceed 60 characters'],
        },
        seoDescription: {
            type: String,
            maxlength: [160, 'SEO description cannot exceed 160 characters'],
        },
        seoKeywords: [String],
        // Status
        isActive: {
            type: Boolean,
            default: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Indexes for faster queries
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
