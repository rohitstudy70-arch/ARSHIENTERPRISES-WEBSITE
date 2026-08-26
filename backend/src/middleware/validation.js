/**
 * Request Validation Middleware
 * Validates incoming request data using Joi
 */

const Joi = require('joi');
const { AppError } = require('./errorHandler');

/**
 * Generic validation middleware
 */
const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const messages = error.details.map((detail) => detail.message).join(', ');
        return next(new AppError(messages, 400));
    }

    req.validatedData = value;
    next();
};

/**
 * Validation schemas
 */
const schemas = {
    // User Schemas
    createUser: Joi.object({
        name: Joi.string().trim().required().min(2).max(100),
        email: Joi.string().trim().lowercase().required().email(),
        password: Joi.string()
            .required()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
            .messages({
                'string.pattern.base':
                    'Password must contain uppercase, lowercase, number and special character',
            }),
        phone: Joi.string()
            .optional()
            .pattern(/^\+?[0-9\s-]{10,20}$/)
            .messages({
                'string.pattern.base':
                    'Phone number must be 10-20 characters and can include +, spaces, or hyphens',
            }),
    }),

    login: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),

    sendRegisterOtp: Joi.object({
        name: Joi.string().trim().required().min(2).max(100),
        email: Joi.string().trim().lowercase().required().email(),
        password: Joi.string()
            .required()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
        phone: Joi.string().trim().required().pattern(/^\+?[0-9\s-]{10,20}$/),
    }),

    verifyRegisterOtp: Joi.object({
        phone: Joi.string().trim().required().pattern(/^\+?[0-9\s-]{10,20}$/),
        otp: Joi.string().trim().required().length(6),
    }),

    sendLoginOtp: Joi.object({
        phone: Joi.string().trim().required().pattern(/^\+?[0-9\s-]{10,20}$/),
    }),

    verifyLoginOtp: Joi.object({
        phone: Joi.string().trim().required().pattern(/^\+?[0-9\s-]{10,20}$/),
        otp: Joi.string().trim().required().length(6),
    }),

    sendForgotPasswordOtp: Joi.object({
        phone: Joi.string().trim().required().pattern(/^\+?[0-9\s-]{10,20}$/),
    }),

    verifyForgotPasswordOtp: Joi.object({
        phone: Joi.string().trim().required().pattern(/^\+?[0-9\s-]{10,20}$/),
        otp: Joi.string().trim().required().length(6),
        newPassword: Joi.string()
            .required()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
            .messages({
                'string.pattern.base':
                    'Password must contain uppercase, lowercase, number and special character',
            }),
    }),

    // Product Schemas
    createProduct: Joi.object({
        title: Joi.string().required().min(3).max(200),
        slug: Joi.string()
            .optional()
            .allow('')
            .trim()
            .lowercase()
            .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            .messages({
                'string.pattern.base': 'Slug must be URL-friendly (lowercase, hyphen-separated)',
            }),
        category: Joi.string().required(),
        shortDescription: Joi.string().required().max(500),
        fullDescription: Joi.string().required(),
        price: Joi.number().required().positive(),
        image: Joi.string().optional(),
        images: Joi.array().items(Joi.string()).optional(),
        specifications: Joi.array().items(Joi.string()).optional(),
        features: Joi.array().items(Joi.string()).optional(),
        seoTitle: Joi.string().optional().max(60),
        seoDescription: Joi.string().optional().max(160),
        seoKeywords: Joi.array().items(Joi.string()).optional(),
    }),

    // Inquiry Schema
    createInquiry: Joi.object({
        name: Joi.string().required().min(2).max(100),
        email: Joi.string().required().email(),
        phone: Joi.string().required().pattern(/^\+?[0-9\s-]{10,20}$/),
        message: Joi.string().required().min(10).max(1000),
        productId: Joi.string().optional(),
        inquiryType: Joi.string().valid('general', 'product', 'support').optional(),
    }),

    // Contact Schema
    contactForm: Joi.object({
        name: Joi.string().required().min(2).max(100),
        email: Joi.string().required().email(),
        phone: Joi.string()
            .required()
            .pattern(/^\+?[0-9\s-]{10,20}$/)
            .messages({
                'string.pattern.base': 'Phone number must be a valid 10-digit number (e.g. +91 9709846929 or 9709846929)',
            }),
        subject: Joi.string().required().min(5).max(100),
        message: Joi.string().required().min(10).max(2000),
    }),

    // Testimonial Schema
    createTestimonial: Joi.object({
        name: Joi.string().required().min(2).max(100),
        company: Joi.string().optional().max(100),
        message: Joi.string().required().min(20).max(500),
        rating: Joi.number().required().min(1).max(5),
        image: Joi.string().optional(),
    }),

    // Lead Schema
    createLead: Joi.object({
        name: Joi.string().trim().optional().max(100).allow(''),
        phone: Joi.string()
            .trim()
            .required()
            .pattern(/^\+?[0-9\s-]{10,20}$/)
            .messages({
                'string.pattern.base':
                    'Phone number must be 10-20 characters and can include +, spaces, or hyphens',
            }),
        sourcePage: Joi.string().trim().optional().max(250).allow(''),
        notes: Joi.string().trim().optional().max(500).allow(''),
    }),
};

module.exports = {
    validate,
    schemas,
    AppError,
};
