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

        // Indexes are defined in model files and built automatically.
        setupIndexes();

        return conn;
    } catch (error) {
        console.error(`[DB] Connection error: ${error.message}`);
        console.error('[DB] Check Atlas IP allowlist, credentials, and database name.');
        process.exit(1);
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
