/**
 * Create Normal User Script
 * Run: node scripts/createUser.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arshi-gps';
const USER_EMAIL = 'client@arshigps.com';
const USER_PASSWORD = 'Password@123';

async function createUser() {
    console.log('[SETUP] Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('[SETUP] Connected to MongoDB');

    const User = require('../src/models/User');

    const existing = await User.findOne({ email: USER_EMAIL });

    if (existing) {
        console.log(`[SETUP] ✅ User already exists: ${USER_EMAIL}`);
        existing.password = USER_PASSWORD;
        await existing.save();
        console.log(`[SETUP] ✅ User password reset to: ${USER_PASSWORD}`);
    } else {
        await User.create({
            name: 'Demo Client',
            email: USER_EMAIL,
            password: USER_PASSWORD,
            phone: '9876543210',
            role: 'user',
            isActive: true,
        });
        console.log(`[SETUP] ✅ Normal user created successfully!`);
    }

    console.log(`[SETUP] Email: ${USER_EMAIL}`);
    console.log(`[SETUP] Password: ${USER_PASSWORD}`);

    await mongoose.disconnect();
    process.exit(0);
}

createUser().catch(err => {
    console.error('[SETUP] ❌ Error:', err.message);
    process.exit(1);
});
