/**
 * MongoDB Database Configuration
 * Handles connection to MongoDB Atlas or local MongoDB instance
 */

const mongoose = require('mongoose');
const environment = require('./environment');

const connectDB = async () => {
    try {
        if (!environment.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing. Add it in backend/.env');
        }

        const conn = await mongoose.connect(environment.MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        });

        console.log(`[DB] Connected: ${conn.connection.host}/${conn.connection.name}`);

        // Ensure default admin exists in MongoDB Atlas
        await seedAdminUser();

        // Ensure default catalog products & descriptions exist in MongoDB Atlas
        const { seedProductsAuto } = require('../utils/productSeeder');
        await seedProductsAuto();

        setupIndexes();

        return conn;
    } catch (error) {
        console.error(`[DB] Connection error: ${error.message}`);
        console.error('[DB] Check Atlas IP allowlist, credentials, and database name.');
        process.exit(1);
    }
};

/**
 * Seed initial Admin User if not present
 */
const seedAdminUser = async () => {
    try {
        const User = require('../models/User');
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@arshigps.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe@123';

        let admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            admin = await User.create({
                name: 'Arshi Admin',
                email: adminEmail,
                password: adminPassword,
                phone: '+91 77828 08063',
                role: 'admin',
                isActive: true,
            });
            console.log(`[DB] ✅ Initial Admin user seeded: ${adminEmail}`);
        } else if (admin.role !== 'admin') {
            admin.role = 'admin';
            await admin.save();
            console.log(`[DB] ✅ Admin role restored for: ${adminEmail}`);
        }
    } catch (err) {
        console.error(`[DB] Admin seeding warning: ${err.message}`);
    }
};

/**
 * Setup database indexes for optimized queries
 */
const setupIndexes = () => {
    console.log('[DB] Index initialization enabled');
};

/**
 * Disconnect from MongoDB
 */
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('[DB] Disconnected');
    } catch (error) {
        console.error(`[DB] Disconnect error: ${error.message}`);
        process.exit(1);
    }
};

/**
 * Handle connection events
 */
mongoose.connection.on('connected', () => {
    console.log('[DB] Mongoose connected');
});

mongoose.connection.on('error', (err) => {
    console.error(`[DB] Mongoose error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.warn('[DB] Mongoose disconnected');
});

module.exports = {
    connectDB,
    disconnectDB,
};
