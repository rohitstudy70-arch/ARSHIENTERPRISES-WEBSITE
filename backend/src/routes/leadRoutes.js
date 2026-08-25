/**
 * Lead Routes
 * Customer lead management endpoints
 */
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { authenticate, isAdmin } = require('../middleware/auth');

// Capture a new lead (public)
router.post('/capture', async (req, res) => {
    try {
        const { name, phone, sourcePage } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: 'Phone is required' });

        const lead = await Lead.create({
            name,
            phone,
            sourcePage: sourcePage || '/',
            metadata: {
                referrer: req.headers.referer || '',
                userAgent: req.headers['user-agent'] || '',
                ip: req.ip,
            },
        });

        // Create notification
        try {
            const Notification = require('../models/Notification');
            await Notification.create({
                type: 'new_lead',
                title: 'New Lead Captured',
                message: `${name || 'Visitor'} submitted their phone: ${phone}`,
                data: { leadId: lead._id, phone, name },
            });
        } catch (e) { /* silent */ }

        res.status(201).json({ success: true, message: 'Lead captured', data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all leads (admin)
router.get('/', authenticate, isAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 20, status, search } = req.query;
        const filter = {};
        if (status && status !== 'all') filter.status = status;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Lead.countDocuments(filter);
        const leads = await Lead.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: leads,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit)),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update lead status (admin)
router.patch('/:id/status', authenticate, isAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add notes to lead (admin)
router.patch('/:id/notes', authenticate, isAdmin, async (req, res) => {
    try {
        const { notes } = req.body;
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { notes },
            { new: true }
        );
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.json({ success: true, data: lead });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Export leads as CSV (admin)
router.get('/export', authenticate, isAdmin, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status && status !== 'all') filter.status = status;

        const leads = await Lead.find(filter).sort({ createdAt: -1 });

        const header = 'Name,Phone,Source Page,Status,Notes,Created At\n';
        const rows = leads.map(l => {
            const name = (l.name || 'Visitor').replace(/,/g, ' ');
            const notes = (l.notes || '').replace(/,/g, ' ').replace(/\n/g, ' ');
            return `${name},${l.phone},${l.sourcePage || '/'},${l.status},${notes},${new Date(l.createdAt).toLocaleString('en-IN')}`;
        }).join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
        res.send(header + rows);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
