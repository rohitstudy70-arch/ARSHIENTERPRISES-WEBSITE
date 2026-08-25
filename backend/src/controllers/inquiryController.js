/**
 * Inquiry Controller
 * Handles product inquiries and contact forms
 */

const Inquiry = require('../models/Inquiry');
const Product = require('../models/Product');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const {
    sendInquiryConfirmation,
    sendInquiryNotificationToAdmin,
    sendContactFormResponse,
} = require('../services/emailService');

/**
 * Create inquiry
 */
exports.createInquiry = asyncHandler(async (req, res) => {
    const { name, email, phone, message, productId, inquiryType } = req.validatedData;

    // Verify product if provided
    if (productId) {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
    }

    const data = { name, email, phone, message, productId, inquiryType };
    const inquiry = await Inquiry.create({
        name,
        email,
        phone,
        message,
        productId: productId || null,
        inquiryType: inquiryType || 'general',
    });

    // Create notification
    try {
        const Notification = require('../models/Notification');
        await Notification.create({
            type: 'new_inquiry',
            title: 'New Inquiry Received',
            message: `${data.name} sent an inquiry: ${data.message.substring(0, 80)}...`,
            data: { inquiryId: inquiry._id, name: data.name, email: data.email },
        });
    } catch (e) { /* silent */ }

    // Send confirmation email to user
    await sendInquiryConfirmation(email, name, inquiry.inquiryType);


    // Send notification to admin
    await sendInquiryNotificationToAdmin(inquiry);

    res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully. We will contact you soon.',
        data: inquiry,
    });
});

/**
 * Create contact form submission
 */
exports.createContactSubmission = asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message } = req.validatedData;

    const inquiry = await Inquiry.create({
        name,
        email,
        phone,
        message: `${subject}\n\n${message}`,
        inquiryType: 'general',
    });

    // Send confirmation to user
    await sendContactFormResponse(email, name);

    // Send to admin
    await sendInquiryNotificationToAdmin(inquiry);

    res.status(201).json({
        success: true,
        message: 'Thank you for contacting us. We will respond shortly.',
    });
});

/**
 * Get all inquiries (Admin)
 */
exports.getInquiries = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20, status, type, sort = 'newest' } = req.query;

    const filter = {};

    if (status) {
        filter.status = status;
    }

    if (type) {
        filter.inquiryType = type;
    }

    const sortOption = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const totalInquiries = await Inquiry.countDocuments(filter);
    const inquiries = await Inquiry.find(filter)
        .populate('productId', 'title slug')
        .populate('respondedBy', 'name email')
        .sort(sortOption)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    res.status(200).json({
        success: true,
        data: inquiries,
        pagination: {
            currentPage: parseInt(page),
            pageSize: parseInt(limit),
            totalItems: totalInquiries,
            totalPages: Math.ceil(totalInquiries / limit),
        },
    });
});

/**
 * Get inquiry by ID (Admin)
 */
exports.getInquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const inquiry = await Inquiry.findByIdAndUpdate(
        id,
        { status: 'viewed' },
        { new: true }
    )
        .populate('productId')
        .populate('respondedBy', 'name email');

    if (!inquiry) {
        return res.status(404).json({
            success: false,
            message: 'Inquiry not found',
        });
    }

    res.status(200).json({
        success: true,
        data: inquiry,
    });
});

/**
 * Update inquiry status (Admin)
 */
exports.updateInquiryStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
        id,
        {
            status,
            ...(notes && { notes }),
            ...(status === 'responded' && {
                respondedAt: new Date(),
                respondedBy: req.userId,
            }),
        },
        { new: true }
    );

    if (!inquiry) {
        return res.status(404).json({
            success: false,
            message: 'Inquiry not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Inquiry status updated',
        data: inquiry,
    });
});

/**
 * Get inquiry statistics (Admin)
 */
exports.getInquiryStats = asyncHandler(async (req, res) => {
    const totalInquiries = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'new' });
    const respondedInquiries = await Inquiry.countDocuments({
        status: 'responded',
    });

    const inquiriesByType = await Inquiry.aggregate([
        {
            $group: {
                _id: '$inquiryType',
                count: { $sum: 1 },
            },
        },
    ]);

    res.status(200).json({
        success: true,
        data: {
            totalInquiries,
            newInquiries,
            respondedInquiries,
            inquiriesByType,
        },
    });
});

/**
 * Delete inquiry (Admin)
 */
exports.deleteInquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
        return res.status(404).json({
            success: false,
            message: 'Inquiry not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Inquiry deleted successfully',
    });
});
