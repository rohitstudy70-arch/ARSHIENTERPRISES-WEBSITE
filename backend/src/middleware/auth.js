/**
 * Authentication & Authorization Middleware
 * Handles JWT verification and role-based access control
 */

const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const environment = require('../config/environment');
const User = require('../models/User');

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, environment.JWT_SECRET);
    } catch (error) {
        throw new AppError('Invalid or expired token', 401);
    }
};

/**
 * Authenticate user middleware
 */
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next(new AppError('No authentication token provided', 401));
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        req.user = user;
        req.userId = decoded.id;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Check if user is admin
 */
const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError('User not authenticated', 401));
        }

        if (req.user.role !== 'admin') {
            return next(new AppError('Admin access required', 403));
        }

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Check if user has specific role
 */
const hasRole = (allowedRoles) => (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError('User not authenticated', 401));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                new AppError(
                    `Access denied. Required role: ${allowedRoles.join(', ')}`,
                    403
                )
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.id).select('-password');
            if (user) {
                req.user = user;
                req.userId = decoded.id;
            }
        }

        next();
    } catch (error) {
        // Don't fail on optional auth errors
        next();
    }
};

module.exports = {
    authenticate,
    isAdmin,
    hasRole,
    optionalAuth,
    verifyToken,
};
