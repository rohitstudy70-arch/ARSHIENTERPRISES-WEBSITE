/**
 * Auth Routes
 * User authentication endpoints
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');
const { authRateLimiter } = require('../middleware/security');

/**
 * Public Routes
 */

// User Registration
router.post('/register', authRateLimiter, validate(schemas.createUser), authController.register);
router.post('/register/send-otp', authRateLimiter, validate(schemas.sendRegisterOtp), authController.sendRegisterOtp);
router.post('/register/verify-otp', authRateLimiter, validate(schemas.verifyRegisterOtp), authController.verifyRegisterOtp);

// User Login
router.post('/login', authRateLimiter, validate(schemas.login), authController.login);
router.post('/login/send-otp', authRateLimiter, validate(schemas.sendLoginOtp), authController.sendLoginOtp);
router.post('/login/verify-otp', authRateLimiter, validate(schemas.verifyLoginOtp), authController.verifyLoginOtp);
router.post('/forgot-password/send-otp', authRateLimiter, validate(schemas.sendForgotPasswordOtp), authController.sendForgotPasswordOtp);
router.post('/forgot-password/verify-otp', authRateLimiter, validate(schemas.verifyForgotPasswordOtp), authController.verifyForgotPasswordOtp);

// Admin Login
router.post('/admin/login', authRateLimiter, validate(schemas.login), authController.adminLogin);

/**
 * Protected Routes
 */

// Get Current User
router.get('/me', authenticate, authController.getCurrentUser);

// Update Profile
router.put('/profile', authenticate, authController.updateProfile);

// Change Password
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;
