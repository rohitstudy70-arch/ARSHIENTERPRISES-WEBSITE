/**
 * SEO Settings Model
 * Manage site-wide SEO configurations
 */

const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema(
    {
        pageTitle: String,
        metaDescription: String,
        metaKeywords: [String],
        siteTitle: String,
        siteDescription: String,
        socialImage: String,
        twitterHandle: String,
        facebookPage: String,
        instagramHandle: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('SEO', seoSchema);
