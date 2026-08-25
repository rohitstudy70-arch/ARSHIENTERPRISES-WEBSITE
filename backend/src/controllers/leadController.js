/**
 * Lead Controller
 * Handles instant lead capture from landing traffic.
 */

const Lead = require('../models/Lead');
const { asyncHandler } = require('../middleware/errorHandler');

exports.captureLead = asyncHandler(async (req, res) => {
    const { name, phone, sourcePage, notes } = req.validatedData;

    const lead = await Lead.create({
        name: name || '',
        phone,
        sourcePage: sourcePage || '/',
        notes: notes || '',
        metadata: {
            referrer: req.headers.referer || '',
            userAgent: req.headers['user-agent'] || '',
            ip: req.ip || req.connection?.remoteAddress || '',
        },
    });

    console.log(`[LEAD] New lead captured: ${lead.phone} (${lead._id})`);

    res.status(201).json({
        success: true,
        message: 'Lead captured successfully',
        data: { id: lead._id },
    });
});
