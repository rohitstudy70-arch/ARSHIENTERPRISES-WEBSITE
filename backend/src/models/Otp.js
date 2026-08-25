const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        phone: { type: String, required: true, index: true },
        purpose: {
            type: String,
            required: true,
            enum: ['register', 'login', 'forgot_password'],
            index: true,
        },
        code: { type: String, required: true },
        expiresAt: { type: Date, required: true, index: true },
        consumed: { type: Boolean, default: false, index: true },
        payload: { type: mongoose.Schema.Types.Mixed, default: null },
    },
    { timestamps: true }
);

otpSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Otp', otpSchema);
