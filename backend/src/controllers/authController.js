/**
 * Authentication Controller
 * Handles user authentication, registration, and login
 */

const User = require('../models/User');
const Otp = require('../models/Otp');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const { generateToken } = require('../utils/helpers');
const { sendWelcomeEmail } = require('../services/emailService');
const { generateOtpCode, sendOtp } = require('../services/otpService');

const OTP_EXPIRY_MINUTES = 10;

const createOtp = async ({ phone, purpose, payload = null }) => {
    await Otp.updateMany({ phone, purpose, consumed: false }, { $set: { consumed: true } });
    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    const otp = await Otp.create({ phone, purpose, code, expiresAt, payload });
    await sendOtp(phone, code, purpose);
    return otp;
};

const verifyOtp = async ({ phone, purpose, code }) => {
    const otp = await Otp.findOne({ phone, purpose, consumed: false }).sort({ createdAt: -1 });
    if (!otp) throw new AppError('OTP not found. Please request a new OTP.', 400);
    if (otp.expiresAt < new Date()) throw new AppError('OTP expired. Please request a new OTP.', 400);
    if (otp.code !== code) throw new AppError('Invalid OTP.', 400);
    otp.consumed = true;
    await otp.save();
    return otp;
};

/**
 * User Registration
 */
exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.validatedData;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'Email already in use',
        });
    }

    // Create new user
    user = await User.create({
        name,
        email: normalizedEmail,
        password,
        phone,
        role: 'user',
    });

    const token = generateToken(user._id);

    // Email failures should never block successful registration.
    try {
        await sendWelcomeEmail(user.email, user.name);
    } catch (emailError) {
        console.warn(`[AUTH] Welcome email failed for ${user.email}: ${emailError.message}`);
    }

    console.log(`[AUTH] User registered: ${user.email} (${user._id})`);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: user.toJSON(),
    });
});

/**
 * Send registration OTP
 */
exports.sendRegisterOtp = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.validatedData;
    const normalizedEmail = email.trim().toLowerCase();

    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
        return res.status(400).json({ success: false, message: 'Phone already in use' });
    }

    await createOtp({
        phone,
        purpose: 'register',
        payload: { name, email: normalizedEmail, password, phone },
    });

    res.status(200).json({
        success: true,
        message: 'OTP sent to your phone number',
    });
});

/**
 * Verify registration OTP and create account
 */
exports.verifyRegisterOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.validatedData;
    const otpRecord = await verifyOtp({ phone, purpose: 'register', code: otp });

    const { name, email, password } = otpRecord.payload || {};
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Registration payload not found. Please retry.' });
    }

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    user = await User.create({
        name,
        email,
        password,
        phone,
        role: 'user',
    });

    const token = generateToken(user._id);
    res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: user.toJSON(),
    });
});

/**
 * User Login
 */
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.validatedData;
    const normalizedEmail = email.trim().toLowerCase();

    // Find user and include password field
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    // Compare password
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    // Check if user is active
    if (!user.isActive) {
        return res.status(403).json({
            success: false,
            message: 'Your account has been deactivated',
        });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    console.log(`[AUTH] User login: ${user.email} (${user._id})`);

    res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: user.toJSON(),
    });
});

exports.sendLoginOtp = asyncHandler(async (req, res) => {
    const { phone } = req.validatedData;
    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ success: false, message: 'No account found with this phone number' });
    }

    await createOtp({ phone, purpose: 'login' });

    res.status(200).json({ success: true, message: 'Login OTP sent' });
});

exports.verifyLoginOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.validatedData;
    await verifyOtp({ phone, purpose: 'login', code: otp });

    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: user.toJSON(),
    });
});

exports.sendForgotPasswordOtp = asyncHandler(async (req, res) => {
    const { phone } = req.validatedData;
    const user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ success: false, message: 'No user found with this phone number' });
    }

    await createOtp({ phone, purpose: 'forgot_password' });
    res.status(200).json({ success: true, message: 'Password reset OTP sent' });
});

exports.verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
    const { phone, otp, newPassword } = req.validatedData;
    await verifyOtp({ phone, purpose: 'forgot_password', code: otp });

    const user = await User.findOne({ phone }).select('+password');
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
});

/**
 * Get Current User
 */
exports.getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    res.status(200).json({
        success: true,
        user: user.toJSON(),
    });
});

/**
 * Update User Profile
 */
exports.updateProfile = asyncHandler(async (req, res) => {
    const { name, phone, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
        req.userId,
        {
            ...(name && { name }),
            ...(phone && { phone }),
            ...(profileImage && { profileImage }),
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: user.toJSON(),
    });
});

/**
 * Change Password
 */
exports.changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select('+password');

    const isPasswordMatched = await user.comparePassword(currentPassword);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'Current password is incorrect',
        });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
});

/**
 * Admin Login (Same as user login but with role check)
 */
exports.adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.validatedData;

    const user = await User.findOne({ email }).select('+password');

    if (!user || user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Admin credentials are invalid',
        });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id, '30d');

    res.status(200).json({
        success: true,
        message: 'Admin login successful',
        token,
        user: user.toJSON(),
    });
});
