/**
 * Notification Model
 * Admin notifications for new inquiries, leads, etc.
 */
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['new_inquiry', 'new_lead', 'new_testimonial', 'system'],
            required: true,
        },
        title: { type: String, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        data: { type: mongoose.Schema.Types.Mixed },
    },
    { timestamps: true }
);

notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
