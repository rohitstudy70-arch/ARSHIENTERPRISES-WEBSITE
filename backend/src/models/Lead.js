/**
 * Lead Model
 * Stores instant visitor leads captured from website entry popup.
 */

const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        phone: {
            type: String,
            required: [true, 'Please provide phone number'],
            trim: true,
            index: true,
        },
        sourcePage: {
            type: String,
            default: '/',
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'qualified', 'closed'],
            default: 'new',
            index: true,
        },
        metadata: {
            referrer: String,
            userAgent: String,
            ip: String,
        },
    },
    { timestamps: true }
);

leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
