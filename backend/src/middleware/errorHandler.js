/**
 * Global Error Handler Middleware
 * Handles all errors across the application
 */

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Handling specific MongoDB errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map((error) => error.message)
            .join(', ');
        err.statusCode = 400;
        err.message = `Validation Error: ${message}`;
    }

    if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = `Invalid ${err.path}: ${err.value}`;
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        err.statusCode = 400;
        err.message = `${field} already exists`;
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        err.message = 'Invalid JWT token';
    }

    if (err.name === 'TokenExpiredError') {
        err.statusCode = 401;
        err.message = 'JWT token has expired';
    }

    // Log error details
    if (process.env.NODE_ENV === 'development') {
        console.error(`✗ Error: ${err.message}`);
        console.error(err.stack);
    }

    // Send response
    res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

/**
 * Async handler wrapper to catch async errors
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    AppError,
    errorHandler,
    asyncHandler,
};
