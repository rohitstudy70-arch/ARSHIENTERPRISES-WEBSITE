const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../src/models/Product');
const Category = require('../src/models/Category');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arshi-gps';

async function seedKsk() {
    try {
        console.log('Connecting to MongoDB:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');

        // 1. Find or create an Agriculture/Tractor category
        let category = await Category.findOne({ name: /Tractor|Agriculture|Farm/i });
        if (!category) {
            console.log('Agriculture category not found. Creating one...');
            category = await Category.create({
                name: 'Tractor & Agriculture GPS',
                slug: 'tractor-agriculture-gps',
                description: 'Specialized GPS tracking and monitoring systems for tractors and farming equipment.'
            });
        }
        console.log(`Using Category: ${category.name} (ID: ${category._id})`);

        // 2. Define KSK product details
        const kskDetails = {
            title: 'KSK (Krish-e Smart Kit) Tractor GPS',
            slug: 'ksk-krish-e-smart-kit-tractor-gps',
            category: category._id,
            shortDescription: 'Advanced GPS tracking, Diesel monitoring, and Land Area measurement device designed specifically for tractors and farm equipment.',
            fullDescription: 'Krish-e Smart Kit (KSK) is an advanced GPS tracking and smart monitoring solution for agricultural tractors and farm equipment. It provides real-time live location tracking, 90-day route history playback, exact diesel level monitoring with fuel theft warnings, and highly accurate land area measurement to keep track of plowing or harvesting work. The device is fully waterproof (IP67), easy to install, compatible with all tractor brands (Mahindra, Swaraj, John Deere, etc.), and includes mobile app access.',
            price: 5999,
            discount: 15,
            image: 'https://www.uzhavanstore.com/cdn/shop/files/KRISHESMARTKIT.jpg?v=1705664649&width=1946',
            images: [
                'https://www.uzhavanstore.com/cdn/shop/files/KRISHESMARTKIT.jpg?v=1705664649&width=1946',
                'https://m.media-amazon.com/images/I/61kM2oO2mYL._SL1500_.jpg'
            ],
            features: [
                'Live Location Tracking (Track tractor location in real-time)',
                'Trip Replay & History (Check worked routes & operation timings)',
                'Diesel Level Monitoring (Monitor diesel levels & get fuel theft alerts)',
                'Accurate Area Measurement (Track plowing/harvesting land area in acres)',
                'Anti-Theft Security (Set geo-fencing & get engine start alerts)',
                'Mobile App Access (Manage tractor fleet directly from your phone)'
            ],
            specifications: [
                'Compatibility: Swaraj, Mahindra, John Deere, Massey Ferguson, Sonalika, etc.',
                'GPS Accuracy: < 5 meters',
                'Waterproof Rating: IP67 dust and water resistant',
                'Input Voltage: 9V - 36V DC',
                'Internal Battery Backup: 150mAh rechargeable battery',
                'Housing Material: Heat-resistant ABS plastic'
            ],
            inStock: true,
            stockQuantity: 50,
            isFeatured: true,
            isActive: true,
            seoTitle: 'Krish-e Smart Kit (KSK) Tractor GPS Tracker',
            seoDescription: 'Buy Krish-e Smart Kit (KSK) GPS tracker for tractors. Track live location, diesel consumption, and measure land area accurately.',
            seoKeywords: ['KSK GPS', 'Krish-e Smart Kit', 'Tractor GPS tracker', 'Diesel monitoring GPS', 'Area measurement GPS']
        };

        // 3. Check if KSK already exists
        const existingProduct = await Product.findOne({ slug: kskDetails.slug });
        if (existingProduct) {
            console.log('KSK Product already exists in database. Updating it...');
            const updated = await Product.findByIdAndUpdate(existingProduct._id, kskDetails, { new: true });
            console.log('Product updated successfully:', updated.title);
        } else {
            console.log('Creating new KSK Product...');
            const created = await Product.create(kskDetails);
            console.log('Product created successfully:', created.title);
        }

    } catch (error) {
        console.error('Seeding Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedKsk();
