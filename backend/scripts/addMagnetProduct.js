const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../src/models/Product');
const Category = require('../src/models/Category');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arshi-gps';

async function seedMagnet() {
    try {
        console.log('Connecting to MongoDB:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');

        // 1. Find the main GPS Tracker category
        let category = await Category.findOne({ name: /GPS Tracker/i });
        if (!category) {
            console.log('GPS Tracker category not found. Creating one...');
            category = await Category.create({
                name: 'GPS Tracker',
                slug: 'gps-tracker',
                description: 'GPS tracking devices for automotive and fleet use'
            });
        }
        console.log(`Using Category: ${category.name} (ID: ${category._id})`);

        // 2. Define Magnet GPS details
        const magnetDetails = {
            title: 'Magnet GPS Tracker (Wireless & Portable)',
            slug: 'magnet-gps-tracker-wireless-portable',
            category: category._id,
            shortDescription: 'Wireless and portable GPS tracker with a strong magnetic body. Designed for real-time tracking of vehicles, assets, containers, and anti-theft monitoring with zero installation.',
            fullDescription: 'Magnet GPS Tracker is a high-performance, wireless tracking solution for cars, bikes, trucks, containers, or any valuable asset. Built with an industrial-grade strong magnetic body, it attaches instantly to any metal surface without complex wiring or installation fees. Equipped with a long-lasting rechargeable battery, it provides 24/7 live location tracking, historic route playback, smart geofencing alerts, and sound monitoring. Its compact, waterproof design ensures reliable operation in harsh environments, making it the perfect choice for personal safety and professional asset/fleet management.',
            price: 4999,
            discount: 20,
            image: '/magnet-gps.jpg',
            images: [
                '/magnet-gps.jpg'
            ],
            features: [
                'Strong Magnetic Body (Attaches easily to any metal surface)',
                '100% Wireless & Portable (No wiring or installation needed)',
                'Real-Time Live Location (Track movements instantly on map)',
                'Rechargeable Long Battery Life (Worry-free usage for days)',
                'Anti-Theft Geofence Alerts (Get notified if vehicle leaves safe zone)',
                '90-Day Route History Playback (Review past paths and halts)'
            ],
            specifications: [
                'Type: Wireless Magnetic GPS',
                'Usage: Vehicles, Fleet, Cargo, Assets',
                'Waterproof Rating: IP65 weather resistant',
                'Battery Capacity: Large rechargeable Li-ion battery',
                'GPS Accuracy: < 5 meters',
                'Installation: Zero installation, plug-and-play magnetic mount'
            ],
            inStock: true,
            stockQuantity: 100,
            isFeatured: true,
            isActive: true,
            seoTitle: 'Magnet GPS Tracker - Wireless & Portable Tracker | Arshi GPS',
            seoDescription: 'Buy Magnet GPS Tracker online. Wireless magnetic tracker for cars, trucks, bikes & assets. Instant mount, live tracking, long battery life.',
            seoKeywords: ['Magnet GPS', 'Magnetic tracker', 'Wireless GPS tracker', 'Portable vehicle GPS', 'No installation GPS']
        };

        // 3. Check if Magnet GPS already exists
        const existingProduct = await Product.findOne({ slug: magnetDetails.slug });
        if (existingProduct) {
            console.log('Magnet GPS Product already exists in database. Updating it...');
            const updated = await Product.findByIdAndUpdate(existingProduct._id, magnetDetails, { new: true });
            console.log('Product updated successfully:', updated.title);
        } else {
            console.log('Creating new Magnet GPS Product...');
            const created = await Product.create(magnetDetails);
            console.log('Product created successfully:', created.title);
        }

    } catch (error) {
        console.error('Seeding Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedMagnet();
