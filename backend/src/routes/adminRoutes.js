/**
 * Admin Routes
 * Admin panel endpoints
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authenticate, isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const Testimonial = require('../models/Testimonial');
const Lead = require('../models/Lead');
const Settings = require('../models/Settings');
const Notification = require('../models/Notification');
const upload = require('../middleware/upload');

/**
 * Dashboard Statistics
 */
router.get('/stats', authenticate, isAdmin, async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalInquiries = await Inquiry.countDocuments();
        const newInquiries = await Inquiry.countDocuments({ status: 'new' });
        const totalTestimonials = await Testimonial.countDocuments();
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: 'new' });
        const unreadNotifications = await Notification.countDocuments({ isRead: false });

        const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5).populate('productId', 'title');
        const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5).populate('category', 'name');
        const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(20);

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                totalInquiries,
                newInquiries,
                totalTestimonials,
                totalLeads,
                newLeads,
                unreadNotifications,
                recentInquiries,
                recentProducts,
                recentLeads,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * Analytics
 */
router.get('/analytics', authenticate, isAdmin, async (req, res) => {
    try {
        const now = new Date();
        const months = [];

        // Last 6 months data
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
            const monthName = start.toLocaleString('en-IN', { month: 'short', year: '2-digit' });

            const [inquiries, leads] = await Promise.all([
                Inquiry.countDocuments({ createdAt: { $gte: start, $lte: end } }),
                Lead.countDocuments({ createdAt: { $gte: start, $lte: end } }),
            ]);

            months.push({ month: monthName, inquiries, leads });
        }

        // Top products by views
        const topProducts = await Product.find({ isActive: true })
            .sort({ views: -1 })
            .limit(5)
            .select('title views rating category')
            .populate('category', 'name');

        // Status breakdown
        const inquiryStatusBreakdown = await Inquiry.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        const leadStatusBreakdown = await Lead.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        // Last 7 days inquiries and leads over time for line charts
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const [inquiriesRaw, leadsRaw] = await Promise.all([
            Inquiry.aggregate([
                { $match: { createdAt: { $gte: sevenDaysAgo } } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ]),
            Lead.aggregate([
                { $match: { createdAt: { $gte: sevenDaysAgo } } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ])
        ]);

        const inquiriesOverTime = [];
        const leadsOverTime = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];

            const inqMatch = inquiriesRaw.find(r => r._id === dateStr);
            inquiriesOverTime.push({
                date: d.toLocaleString('en-IN', { day: 'numeric', month: 'short' }),
                count: inqMatch ? inqMatch.count : 0
            });

            const leadMatch = leadsRaw.find(r => r._id === dateStr);
            leadsOverTime.push({
                date: d.toLocaleString('en-IN', { day: 'numeric', month: 'short' }),
                count: leadMatch ? leadMatch.count : 0
            });
        }

        // Group leads by source page
        const leadSources = await Lead.aggregate([
            { $group: { _id: "$sourcePage", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Group inquiries by inquiry type
        const inquiryTypes = await Inquiry.aggregate([
            { $group: { _id: "$inquiryType", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            data: {
                monthlyData: months,
                topProducts,
                inquiryStatusBreakdown,
                leadStatusBreakdown,
                inquiriesOverTime,
                leadsOverTime,
                leadSources,
                inquiryTypes
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * Settings
 */
router.get('/settings', authenticate, isAdmin, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({
                siteName: 'Arshi GPS',
                phone: '+91 77828 08063',
                email: 'arshiranjeet133@gmail.com',
                address: 'Purnia, Bihar, India',
                whatsapp: '+91 77828 08063',
            });
        }
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/settings', authenticate, isAdmin, async (req, res) => {
    try {
        const { siteName, phone, email, address, whatsapp, facebook, instagram, linkedin, adminEmail } = req.body;
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({ siteName, phone, email, address, whatsapp, facebook, instagram, linkedin, adminEmail });
        } else {
            settings = await Settings.findByIdAndUpdate(
                settings._id,
                { siteName, phone, email, address, whatsapp, facebook, instagram, linkedin, adminEmail },
                { new: true }
            );
        }
        res.json({ success: true, message: 'Settings updated', data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * Media Upload
 */
router.post('/media/upload', authenticate, isAdmin, upload.single('image'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
        const environment = require('../config/environment');
        const url = `${environment.API_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
        res.json({
            success: true,
            data: {
                url,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/media', authenticate, isAdmin, (req, res) => {
    try {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            return res.json({ success: true, data: [] });
        }
        const environment = require('../config/environment');
        const files = fs.readdirSync(uploadDir)
            .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
            .map(filename => {
                const filePath = path.join(uploadDir, filename);
                const stat = fs.statSync(filePath);
                return {
                    filename,
                    url: `${environment.API_URL || 'http://localhost:5000'}/uploads/${filename}`,
                    size: stat.size,
                    uploadedAt: stat.mtime,
                };
            })
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        res.json({ success: true, data: files });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/media/:filename', authenticate, isAdmin, (req, res) => {
    try {
        const uploadDir = path.join(__dirname, '../../uploads');
        const filePath = path.join(uploadDir, req.params.filename);
        // Security: ensure it's within uploads dir
        if (!filePath.startsWith(uploadDir)) {
            return res.status(400).json({ success: false, message: 'Invalid filename' });
        }
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.json({ success: true, message: 'File deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * Notifications
 */
router.get('/notifications', authenticate, isAdmin, async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
        const unreadCount = await Notification.countDocuments({ isRead: false });
        res.json({ success: true, data: notifications, unreadCount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/notifications/mark-read', authenticate, isAdmin, async (req, res) => {
    try {
        const { ids } = req.body;
        if (ids && ids.length > 0) {
            await Notification.updateMany({ _id: { $in: ids } }, { isRead: true });
        } else {
            await Notification.updateMany({}, { isRead: true });
        }
        res.json({ success: true, message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/notifications/:id', authenticate, isAdmin, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * Admin Users
 */
router.get('/users', authenticate, isAdmin, async (req, res) => {
    try {
        const users = await User.find({ role: 'admin' }).select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/users', authenticate, isAdmin, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        const user = await User.create({ name, email, password, role: 'admin' });
        res.status(201).json({ success: true, message: 'Admin user created', data: user.toJSON() });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.status(200).json({ success: true, message: 'Admin user deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Admin API is running', timestamp: new Date() });
});

module.exports = router;
