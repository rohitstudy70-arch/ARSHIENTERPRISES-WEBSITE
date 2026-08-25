/**
 * Inquiry Model
 * Schema for product inquiries and contact forms
 */

const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Please provide a phone number'],
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            optional: true,
        },
        inquiryType: {
            type: String,
            enum: ['general', 'product', 'support', 'partnership'],
            default: 'general',
        },
        status: {
            type: String,
            enum: ['new', 'viewed', 'responded', 'closed'],
            default: 'new',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        notes: {
            type: String,
            optional: true,
        },
        respondedAt: {
            type: Date,
            optional: true,
        },
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            optional: true,
        },
        attachments: [String],
    },
    { timestamps: true }
);

inquirySchema.index({ email: 1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
