/**
 * Security Middleware
 * CORS, rate limiting, helmet, and other security configurations
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const environment = require('../config/environment');

/**
 * CORS Configuration
 */
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            environment.FRONTEND_URL,
            ...(environment.CORS_ORIGINS || []),
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:3001',
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked origin: ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

/**
 * Rate Limiting Middleware
 */
const createRateLimiter = (windowMs = environment.RATE_LIMIT.WINDOW_MS, max = environment.RATE_LIMIT.MAX_REQUESTS) => {
    return rateLimit({
        windowMs,
        max,
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req) => {
            // Skip/relax limiter for health checks and public read endpoints.
            if (req.path === '/health' || req.path === '/api/health') return true;

            const isPublicReadEndpoint =
                req.method === 'GET' &&
                (req.path.startsWith('/api/v1/products') ||
                    req.path.startsWith('/api/v1/categories') ||
                    req.path.startsWith('/api/v1/testimonials') ||
                    req.path.startsWith('/v1/products') ||
                    req.path.startsWith('/v1/categories') ||
                    req.path.startsWith('/v1/testimonials'));

            return isPublicReadEndpoint;
        },
    });
};

/**
 * Strict rate limiting for auth endpoints
 */
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Keep brute-force protection while avoiding localhost frustration
    message: 'Too many auth attempts, please try again after 15 minutes.',
    skipSuccessfulRequests: true,
    standardHeaders: true,
});

/**
 * Helmet security headers
 */
const helmetOptions = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
        },
    },
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
});

/**
 * Security headers middleware
 */
const securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
};

module.exports = {
    corsOptions,
    cors,
    helmetOptions,
    createRateLimiter,
    authRateLimiter,
    securityHeaders,
};
