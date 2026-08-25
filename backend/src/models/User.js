/**
 * User Model
 * Schema for user accounts (admin and regular users)
 */

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false, // Don't include password by default
        },
        phone: {
            type: String,
            optional: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        profileImage: {
            type: String,
            optional: true,
        },
        lastLogin: {
            type: Date,
            optional: true,
        },
    },
    { timestamps: true }
);

// Index for faster queries
userSchema.index({ role: 1 });

/**
 * Hash password before saving
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Compare password method
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
};

/**
 * Get public user data
 */
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);
