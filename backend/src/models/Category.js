/**
 * Category Model
 * Schema for product categories
 */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide category name'],
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            optional: true,
        },
        icon: {
            type: String,
            optional: true,
        },
        image: {
            type: String,
            optional: true,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

categorySchema.index({ isActive: 1 });

module.exports = mongoose.model('Category', categorySchema);
