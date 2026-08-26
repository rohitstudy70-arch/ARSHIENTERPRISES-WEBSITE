/**
 * Production Product Seeder Utility
 * Automatically populates default product catalog & descriptions on DB connection.
 */

const Product = require('../models/Product');
const Category = require('../models/Category');

const categoriesData = [
  {
    name: 'Vehicle & Fleet GPS',
    slug: 'vehicle-fleet-gps',
    description: 'Real-time GPS tracking devices for personal cars, commercial fleets, and delivery vehicles.'
  },
  {
    name: 'Commercial Fleet & Logistics',
    slug: 'commercial-fleet-logistics',
    description: 'Heavy-duty fleet management and fuel monitoring GPS trackers for trucks and transport fleets.'
  },
  {
    name: 'Personal & Two-Wheeler GPS',
    slug: 'personal-two-wheeler-gps',
    description: 'Compact, waterproof anti-theft GPS trackers for bikes, scooters, and personal vehicles.'
  },
  {
    name: 'Government & RTO Certified GPS',
    slug: 'government-rto-certified-gps',
    description: 'AIS 140 RTO approved GPS trackers required for commercial vehicle fitness test clearance.'
  },
  {
    name: 'Tractor & Agriculture GPS',
    slug: 'tractor-agriculture-gps',
    description: 'Specialized GPS tracking, diesel monitoring, and land area measurement systems for farming tractors.'
  },
  {
    name: 'Wireless & Asset GPS',
    slug: 'wireless-asset-gps',
    description: 'Portable magnetic GPS trackers with long battery backup requiring zero installation.'
  }
];

const productsData = [
  {
    title: 'AGT365N (Advanced GPS Tracker)',
    slug: 'agt365n-advanced-gps-tracker',
    categorySlug: 'vehicle-fleet-gps',
    shortDescription: '24/7 Live vehicle tracking with remote engine cut-off, geofence alerts, and 90-day history playback.',
    fullDescription: 'AGT365N is Arshi GPS\'s flagship tracking device suitable for personal cars, bikes, delivery vans, and commercial vehicles. It offers 24/7 real-time location visibility, engine immobilizer (remote lock/unlock via mobile app), speed alerts, geofence enter/exit notifications, and 90 days of playback history. Comes with quick pan-India installation support and 1-year replacement warranty.',
    price: 2999,
    discount: 20,
    image: 'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg',
    images: [
      'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg',
      'https://cpimg.tistatic.com/08742420/b/5/Arshi-GPS-Tracker-PRO-365N.jpg'
    ],
    features: [
      'Real-time Live Tracking (10-second refresh rate)',
      'Remote Engine Cut-off (Lock/Unlock engine via Mobile App)',
      '90-Day Route Playback & Stoppage Reports',
      'Smart Geofencing (Instant Entry & Exit Alerts)',
      'Over-speed & Ignition On/Off Alarms',
      'Anti-Theft Vibration & Towing Sensor'
    ],
    specifications: [
      'Input Voltage: 9V - 36V DC',
      'GPS Location Accuracy: < 5 meters',
      'Internal Battery Backup: 150mAh rechargeable Li-ion',
      'Waterproof Rating: IP65 resistant',
      'GSM Frequency: Quad-band 850/900/1800/1900 MHz',
      'Warranty: 1 Year Replacement Warranty'
    ],
    inStock: true,
    stockQuantity: 100,
    isFeatured: true,
    isActive: true,
    seoTitle: 'AGT365N Advanced Vehicle GPS Tracker | Arshi GPS',
    seoDescription: 'Buy AGT365N GPS tracker for cars and bikes. Real-time live location, remote engine lock, geofencing, and 90-day history playback.',
    seoKeywords: ['AGT365N', 'Arshi GPS AGT365N', 'Vehicle GPS tracker', 'Engine lock GPS', 'Car GPS tracker']
  },
  {
    title: 'PRO-365N (Professional Fleet Tracker)',
    slug: 'pro-365n-professional-fleet-tracker',
    categorySlug: 'commercial-fleet-logistics',
    shortDescription: 'Heavy-duty fleet tracker with fuel monitoring, AC status detection, anti-theft sensors, and stoppage analytics.',
    fullDescription: 'PRO-365N is engineered specifically for commercial trucks, logistics fleets, buses, and heavy transport vehicles. It supports fuel level sensors to prevent diesel theft, AC ignition status detection, driver behavior monitoring, multi-user fleet views, and instant SMS/App alerts to reduce operating costs and optimize mileage.',
    price: 4999,
    discount: 15,
    image: 'https://cpimg.tistatic.com/08742420/b/5/Arshi-GPS-Tracker-PRO-365N.jpg',
    images: [
      'https://cpimg.tistatic.com/08742420/b/5/Arshi-GPS-Tracker-PRO-365N.jpg',
      'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg'
    ],
    features: [
      'Diesel Fuel Level & Theft Monitoring Support',
      'AC On/Off & Ignition Sensor Detection',
      'Route Analytics & Daily Stoppage Reports',
      'Driver Behavior & Over-speed Monitoring',
      'Multi-vehicle Fleet View on Single Dashboard',
      'Anti-theft Remote Engine Lock Functionality'
    ],
    specifications: [
      'Input Voltage: 9V - 90V DC (Supports heavy 24V trucks)',
      'Fuel Sensor Support: Digital & Analog Sensor input',
      'Internal Battery: 250mAh heavy backup',
      'Waterproof Rating: IP66 heavy-duty casing',
      'Memory: Store up to 5,000 offline tracking points',
      'Warranty: 1 Year Replacement Warranty'
    ],
    inStock: true,
    stockQuantity: 75,
    isFeatured: true,
    isActive: true,
    seoTitle: 'PRO-365N Heavy Fleet & Fuel Monitoring GPS | Arshi GPS',
    seoDescription: 'PRO-365N fleet GPS tracker for commercial trucks. Real-time fuel monitoring, AC detection, route analytics, and anti-theft immobilizer.',
    seoKeywords: ['PRO-365N', 'Fleet GPS tracker', 'Fuel monitoring GPS', 'Truck GPS tracker', 'Logistics GPS']
  },
  {
    title: 'PRO-Lite (Economical Personal GPS)',
    slug: 'pro-lite-economical-personal-gps',
    categorySlug: 'personal-two-wheeler-gps',
    shortDescription: 'Compact, waterproof anti-theft GPS tracker for bikes, scooters, and personal cars.',
    fullDescription: 'PRO-Lite is a super compact and economical GPS tracking device ideal for motorcycles, scooters, auto-rickshaws, and personal cars. Its concealed micro-design makes it hard for thieves to detect, while providing live location tracking, engine lock/unlock, low power draw, and instant vibration alerts on your phone.',
    price: 1999,
    discount: 25,
    image: 'https://cpimg.tistatic.com/08742421/b/5/GPS-Tracker-PRO-Lite.jpg',
    images: [
      'https://cpimg.tistatic.com/08742421/b/5/GPS-Tracker-PRO-Lite.jpg'
    ],
    features: [
      'Ultra Compact Concealed Micro Design',
      'Live Location Tracking via Android & iOS App',
      'Engine Immobilizer (Remote Lock/Unlock)',
      'Low Vehicle Battery Alarm & Disconnect Alert',
      'Over-speed & Geo-fence Boundary Notifications',
      '60-Day Travel Route History Playback'
    ],
    specifications: [
      'Input Voltage: 9V - 90V DC',
      'Dimensions: 75mm x 30mm x 12mm (Pocket size)',
      'Weight: 40 grams',
      'Internal Battery: 100mAh backup',
      'Waterproof Rating: IP65',
      'Warranty: 1 Year Replacement Warranty'
    ],
    inStock: true,
    stockQuantity: 120,
    isFeatured: true,
    isActive: true,
    seoTitle: 'PRO-Lite Bike & Bike Anti-Theft GPS Tracker | Arshi GPS',
    seoDescription: 'Buy PRO-Lite compact GPS tracker for bikes and scooty. Anti-theft engine lock, live location app tracking, and waterproof body.',
    seoKeywords: ['PRO-Lite', 'Bike GPS tracker', 'Scooty GPS', 'Cheap GPS tracker', 'Two wheeler GPS']
  },
  {
    title: 'AIS 140 GPS (Government Approved RTO Tracker)',
    slug: 'ais-140-gps-government-approved-rto-tracker',
    categorySlug: 'government-rto-certified-gps',
    shortDescription: 'RTO certified AIS 140 tracker with dual SIM support, emergency panic button, and fitness test compliance.',
    fullDescription: 'Government mandated AIS 140 GPS tracker for commercial yellow-plate vehicles including buses, cabs, school vans, taxis, and commercial trucks. Certified by CDAC / ARAI, featuring dual SIM backup, SOS panic button, RTO portal integration, and emergency tracking support for passing state RTO fitness tests.',
    price: 7999,
    discount: 10,
    image: 'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg',
    images: [
      'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg'
    ],
    features: [
      'AIS 140 Certified (CDAC & ARAI RTO Approved)',
      'Dual SIM Card Slots for Seamless Network Failover',
      'SOS Emergency Panic Button for Passenger Safety',
      'Government & State RTO Portal Data Integration',
      '24/7 Real-time Tracking & Speed Governor Support',
      'High-capacity Emergency Battery Backup'
    ],
    specifications: [
      'Certification: AIS 140 (Standard No. AIS-140)',
      'Network: Dual SIM 2G/4G fallback',
      'Emergency SOS: External Panic Button included',
      'Internal Battery: 450mAh rechargeable battery',
      'Input Voltage: 9V - 36V DC',
      'Warranty: 1 Year Replacement Warranty'
    ],
    inStock: true,
    stockQuantity: 40,
    isFeatured: true,
    isActive: true,
    seoTitle: 'AIS 140 RTO Approved Commercial GPS Tracker | Arshi GPS',
    seoDescription: 'Buy AIS 140 government certified GPS tracker for commercial buses, cabs, and school vans. Dual SIM, panic button, and RTO fitness clearance.',
    seoKeywords: ['AIS 140 GPS', 'RTO approved GPS', 'Commercial vehicle GPS', 'Panic button GPS', 'Taxi GPS']
  },
  {
    title: 'KSK (Krish-e Smart Kit) Tractor GPS',
    slug: 'ksk-krish-e-smart-kit-tractor-gps',
    categorySlug: 'tractor-agriculture-gps',
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
      'Warranty: 1 Year Replacement Warranty'
    ],
    inStock: true,
    stockQuantity: 50,
    isFeatured: true,
    isActive: true,
    seoTitle: 'Krish-e Smart Kit (KSK) Tractor GPS Tracker | Arshi GPS',
    seoDescription: 'Buy Krish-e Smart Kit (KSK) GPS tracker for tractors. Track live location, diesel consumption, and measure land area accurately.',
    seoKeywords: ['KSK GPS', 'Krish-e Smart Kit', 'Tractor GPS tracker', 'Diesel monitoring GPS', 'Area measurement GPS']
  },
  {
    title: 'Magnet GPS Tracker (Wireless & Portable)',
    slug: 'magnet-gps-tracker-wireless-portable',
    categorySlug: 'wireless-asset-gps',
    shortDescription: 'Portable wireless GPS tracker with strong magnetic body, long battery backup, voice monitoring, and zero wiring installation.',
    fullDescription: 'Magnet GPS Tracker is a 100% wireless and portable GPS tracking solution featuring industrial-grade neodymium magnets that attach firmly to any vehicle chassis, car trunk, container, or metal asset. Requires zero wiring or technical installation. Equipped with a massive rechargeable battery, voice monitoring capability, cover drop-off alarm, and live mobile app tracking.',
    price: 4499,
    discount: 20,
    image: 'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg',
    images: [
      'https://cpimg.tistatic.com/08742419/b/5/Arshi-GPS-Tracker-AGT365N.jpg'
    ],
    features: [
      'Strong Industrial Neodymium Magnet Mount (Zero Installation)',
      'Massive Rechargeable Battery (Up to 30 days backup)',
      'Voice & Sound Monitoring Support',
      'Cover Removal / Drop-off Sensor Alarm',
      'Real-time Live Location & Geofencing Alerts',
      'Waterproof IP67 Rugged Casing'
    ],
    specifications: [
      'Battery Capacity: 6,000mAh High-capacity Li-ion',
      'Standby Time: Up to 30 days',
      'Magnet Type: Strong Neodymium N52 Magnet',
      'Waterproof: IP67 rated',
      'Installation: 0% Wiring (Attach and Track)',
      'Warranty: 1 Year Replacement Warranty'
    ],
    inStock: true,
    stockQuantity: 60,
    isFeatured: true,
    isActive: true,
    seoTitle: 'Wireless Magnet GPS Tracker Portable | Arshi GPS',
    seoDescription: 'Buy portable Magnet GPS tracker. Strong magnetic mount, zero installation, 30-day battery backup, and voice monitoring.',
    seoKeywords: ['Magnet GPS', 'Wireless GPS tracker', 'Portable GPS', 'Asset GPS tracker', 'Magnetic tracker']
  }
];

const seedProductsAuto = async () => {
  try {
    // 1. Seed Categories
    const categoryMap = {};
    for (const catData of categoriesData) {
      let category = await Category.findOne({ slug: catData.slug });
      if (!category) {
        category = await Category.create(catData);
      } else {
        category = await Category.findByIdAndUpdate(category._id, catData, { new: true });
      }
      categoryMap[catData.slug] = category._id;
    }

    // 2. Seed Products
    for (const prodData of productsData) {
      const catId = categoryMap[prodData.categorySlug];
      const productPayload = {
        ...prodData,
        category: catId
      };
      delete productPayload.categorySlug;

      let existing = await Product.findOne({ slug: prodData.slug });
      if (existing) {
        await Product.findByIdAndUpdate(existing._id, productPayload, { new: true });
      } else {
        await Product.create(productPayload);
      }
    }
    console.log('[DB] ✅ Default catalog products & descriptions auto-seeded successfully!');
  } catch (err) {
    console.error(`[DB] Product auto-seeding warning: ${err.message}`);
  }
};

module.exports = { seedProductsAuto };
