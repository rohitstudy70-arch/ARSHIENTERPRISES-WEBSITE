/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const parseCsv = (value = '') =>
    value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

const environment = {
    // Server Configuration
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.API_URL || 'http://localhost:5000',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

    // Database
    MONGODB_URI: process.env.MONGODB_URI,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

    // Email
    EMAIL: {
        HOST: process.env.EMAIL_HOST,
        PORT: process.env.EMAIL_PORT || 587,
        USER: process.env.EMAIL_USER,
        PASSWORD: process.env.EMAIL_PASSWORD,
        FROM: process.env.EMAIL_FROM,
    },

    // Admin
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

    // Cloudinary
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },

    // Rate Limiting
    RATE_LIMIT: {
        WINDOW_MS: (parseInt(process.env.RATE_LIMIT_WINDOW_MS || '15', 10)) * 60 * 1000,
        MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },
    CORS_ORIGINS: parseCsv(process.env.CORS_ORIGINS),

    // Business Info
    BUSINESS: {
        NAME: process.env.BUSINESS_NAME || 'Arshi Enterprises',
        EMAIL: process.env.BUSINESS_EMAIL,
        PHONE: process.env.BUSINESS_PHONE,
        ADDRESS: process.env.BUSINESS_ADDRESS,
    },

    // Features
    FEATURES: {
        EMAIL_NOTIFICATIONS: true,
        IMAGE_UPLOAD: true,
        RATE_LIMITING: true,
    },
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

const validateEnvironment = () => {
    const missing = requiredEnvVars.filter(
        (envVar) => !process.env[envVar] && environment.NODE_ENV === 'production'
    );

    if (missing.length > 0 && environment.NODE_ENV === 'production') {
        console.error(`Missing required environment variables: ${missing.join(', ')}`);
        process.exit(1);
    }
};

validateEnvironment();

module.exports = environment;
