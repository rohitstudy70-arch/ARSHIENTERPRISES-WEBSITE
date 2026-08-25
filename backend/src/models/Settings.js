/**
 * Settings Model
 * Application settings and configuration
 */

const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
    {
        siteName: { type: String, default: 'Arshi GPS' },
        logo: String,
        favicon: String,
        phone: String,
        email: String,
        address: String,
        whatsapp: String,
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String,
        maintenanceMode: { type: Boolean, default: false },
        adminEmail: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
