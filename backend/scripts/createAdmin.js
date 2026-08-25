/**
 * Create Admin User Script
 * Run: node scripts/createAdmin.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arshi-gps';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@arshigps.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe@123';

async function createAdmin() {
    console.log('[SETUP] Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('[SETUP] Connected to MongoDB');

    // Load User model
    const User = require('../src/models/User');

    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });

    if (existing) {
        if (existing.role !== 'admin') {
            existing.role = 'admin';
            await existing.save();
            console.log(`[SETUP] ✅ User upgraded to admin: ${ADMIN_EMAIL}`);
        } else {
            console.log(`[SETUP] ✅ Admin already exists: ${ADMIN_EMAIL}`);
            console.log('[SETUP] If you forgot your password, the admin will be recreated with the .env password.');
            
            // Reset password in case it was forgotten
            existing.password = ADMIN_PASSWORD;
            await existing.save();
            console.log(`[SETUP] ✅ Admin password reset to: ${ADMIN_PASSWORD}`);
        }
    } else {
        // Create new admin user
        await User.create({
            name: 'Admin',
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            phone: '0000000000',
            role: 'admin',
            isActive: true,
        });
        console.log(`[SETUP] ✅ Admin user created successfully!`);
        console.log(`[SETUP] Email: ${ADMIN_EMAIL}`);
        console.log(`[SETUP] Password: ${ADMIN_PASSWORD}`);
    }

    await mongoose.disconnect();
    console.log('[SETUP] Done! You can now login at http://localhost:5173/admin/login');
    process.exit(0);
}

createAdmin().catch(err => {
    console.error('[SETUP] ❌ Error:', err.message);
    process.exit(1);
});
