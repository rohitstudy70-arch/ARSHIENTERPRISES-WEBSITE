/**
 * Inquiry Routes
 * Product inquiry and contact form endpoints
 */

const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { validate, schemas } = require('../middleware/validation');
const { authenticate, isAdmin } = require('../middleware/auth');

/**
 * Public Routes
 */

// Create inquiry
router.post('/', validate(schemas.createInquiry), inquiryController.createInquiry);

// Create contact form submission
router.post('/contact', validate(schemas.contactForm), inquiryController.createContactSubmission);

/**
 * Admin Routes
 */

// Get all inquiries
router.get('/', authenticate, isAdmin, inquiryController.getInquiries);

// Get inquiry by ID
router.get('/:id', authenticate, isAdmin, inquiryController.getInquiry);

// Update inquiry status
router.patch('/:id/status', authenticate, isAdmin, inquiryController.updateInquiryStatus);

// Get inquiry statistics
router.get('/admin/stats', authenticate, isAdmin, inquiryController.getInquiryStats);

// Delete inquiry
router.delete('/:id', authenticate, isAdmin, inquiryController.deleteInquiry);

// Reply to inquiry via email (admin)
router.post('/:id/reply', authenticate, isAdmin, async (req, res) => {
    try {
        const { replyMessage } = req.body;
        const inquiry = await require('../models/Inquiry').findById(req.params.id);

        if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });

        // Update status to responded
        await require('../models/Inquiry').findByIdAndUpdate(req.params.id, {
            status: 'responded',
            respondedAt: new Date(),
        });

        // Try to send email (optional - won't fail if SMTP not configured)
        try {
            const nodemailer = require('nodemailer');
            if (process.env.SMTP_USER && process.env.SMTP_PASS) {
                const transporter = nodemailer.createTransporter({
                    service: 'gmail',
                    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
                });
                await transporter.sendMail({
                    from: `Arshi GPS <${process.env.SMTP_USER}>`,
                    to: inquiry.email,
                    subject: 'Response to your inquiry - Arshi GPS',
                    html: `<p>Dear ${inquiry.name},</p><p>${replyMessage}</p><p>Regards,<br/>Arshi GPS Team</p>`,
                });
            }
        } catch (emailError) {
            console.log('Email not sent (SMTP not configured):', emailError.message);
        }

        res.json({ success: true, message: 'Replied successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

