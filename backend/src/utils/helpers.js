/**
 * Utility Functions
 * Helper functions used across the application
 */

const crypto = require('crypto');

/**
 * Generate JWT Token
 */
const generateToken = (id, expiresIn) => {
    const jwt = require('jsonwebtoken');
    const environment = require('../config/environment');

    return jwt.sign({ id }, environment.JWT_SECRET, {
        expiresIn: expiresIn || environment.JWT_EXPIRE,
    });
};

/**
 * Generate slug from string
 */
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

/**
 * Generate unique filename
 */
const generateFilename = (originalName) => {
    const timestamp = Date.now();
    const random = crypto.randomBytes(6).toString('hex');
    const extension = originalName.split('.').pop();
    return `${timestamp}-${random}.${extension}`;
};

/**
 * Calculate discount percentage
 */
const calculateDiscount = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Paginate array
 */
const paginate = (array, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const total = array.length;
    const pages = Math.ceil(total / pageSize);

    return {
        data: array.slice(startIndex, endIndex),
        pagination: {
            currentPage: pageNumber,
            pageSize,
            totalItems: total,
            totalPages: pages,
        },
    };
};

/**
 * Filter products
 */
const filterProducts = (products, filters) => {
    let filtered = [...products];

    if (filters.category) {
        filtered = filtered.filter(
            (p) => p.category.toString() === filters.category
        );
    }

    if (filters.minPrice) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.title.toLowerCase().includes(searchLower) ||
                p.shortDescription.toLowerCase().includes(searchLower)
        );
    }

    if (filters.inStock) {
        filtered = filtered.filter((p) => p.inStock === true);
    }

    return filtered;
};

/**
 * Format currency
 */
const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
    }).format(amount);
};

/**
 * Generate SEO-friendly meta title
 */
const generateMetaTitle = (title, suffix = '') => {
    const maxLength = 60;
    const fullTitle = suffix ? `${title} | ${suffix}` : title;
    return fullTitle.length > maxLength
        ? fullTitle.substring(0, maxLength - 3) + '...'
        : fullTitle;
};

/**
 * Generate SEO-friendly meta description
 */
const generateMetaDescription = (text) => {
    const maxLength = 160;
    const description = text.replace(/\s+/g, ' ').trim();
    return description.length > maxLength
        ? description.substring(0, maxLength - 3) + '...'
        : description;
};

/**
 * Validate email
 */
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number
 */
const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
};

module.exports = {
    generateToken,
    generateSlug,
    generateFilename,
    calculateDiscount,
    paginate,
    filterProducts,
    formatCurrency,
    generateMetaTitle,
    generateMetaDescription,
    validateEmail,
    validatePhone,
};
