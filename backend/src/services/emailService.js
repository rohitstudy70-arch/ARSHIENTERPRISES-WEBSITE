/**
 * Email Service
 * Handles all email notifications
 */

const nodemailer = require('nodemailer');
const environment = require('../config/environment');

const isEmailConfigured =
    Boolean(environment.EMAIL.USER) &&
    Boolean(environment.EMAIL.PASSWORD) &&
    Boolean(environment.EMAIL.FROM);

let transporter = null;
if (isEmailConfigured) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: environment.EMAIL.USER,
            pass: environment.EMAIL.PASSWORD,
        },
    });
} else {
    console.warn('[EMAIL] Credentials not configured. Email sending is disabled.');
}

const sendMailSafely = async (mailOptions, label) => {
    if (!transporter) {
        console.warn(`[EMAIL] Skipped (${label}): transporter unavailable`);
        return false;
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Sent: ${label}`);
        return true;
    } catch (error) {
        console.error(`[EMAIL] Failed (${label}): ${error.message}`);
        return false;
    }
};

/**
 * Send inquiry received email to user
 */
const sendInquiryConfirmation = async (to, name, inquiryType) => {
    const mailOptions = {
        from: environment.EMAIL.FROM || environment.BUSINESS.EMAIL,
        to,
        subject: 'Thank you for your inquiry - Arshi Enterprises',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001a4d;">Thank You for Your Inquiry</h2>
          <p>Dear ${name},</p>
          <p>We have received your ${inquiryType} inquiry and appreciate your interest in Arshi Enterprises.</p>
          <p>Our team will review your message and get back to you shortly.</p>
          <p style="margin-top: 30px; color: #666;">
            Best regards,<br>
            <strong>Arshi Enterprises GPS Tracking Team</strong><br>
            ${environment.BUSINESS.PHONE}
          </p>
        </div>
      `,
    };

    return sendMailSafely(mailOptions, `inquiry confirmation to ${to}`);
};

/**
 * Send inquiry notification to admin
 */
const sendInquiryNotificationToAdmin = async (inquiry) => {
    const mailOptions = {
        from: environment.EMAIL.FROM || environment.BUSINESS.EMAIL,
        to: environment.BUSINESS.EMAIL,
        subject: `New ${inquiry.inquiryType} Inquiry - ${inquiry.name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001a4d;">New Inquiry Received</h2>
          <p><strong>Type:</strong> ${inquiry.inquiryType}</p>
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Phone:</strong> ${inquiry.phone}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #001a4d;">
            ${inquiry.message}
          </p>
        </div>
      `,
    };

    return sendMailSafely(mailOptions, 'inquiry notification to admin');
};

/**
 * Send welcome email to new admin
 */
const sendWelcomeEmail = async (to, name, tempPassword) => {
    const mailOptions = {
        from: environment.EMAIL.FROM || environment.BUSINESS.EMAIL,
        to,
        subject: 'Welcome to Arshi Enterprises Admin Panel',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001a4d;">Welcome to Admin Panel</h2>
          <p>Dear ${name},</p>
          <p>Your admin account has been created. Here are your login credentials:</p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 4px;">
            <strong>Email:</strong> ${to}<br>
            <strong>Temporary Password:</strong> ${tempPassword || 'Set by admin'}<br>
            <strong>Login URL:</strong> <a href="${environment.FRONTEND_URL}/admin/login">${environment.FRONTEND_URL}/admin/login</a>
          </p>
          <p style="color: #d32f2f;"><strong>Important:</strong> Please change your password after first login.</p>
        </div>
      `,
    };

    return sendMailSafely(mailOptions, `welcome email to ${to}`);
};

/**
 * Send contact form response
 */
const sendContactFormResponse = async (to, name) => {
    const mailOptions = {
        from: environment.EMAIL.FROM || environment.BUSINESS.EMAIL,
        to,
        subject: 'We received your message - Arshi Enterprises',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001a4d;">Thank You for Contacting Us</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will respond shortly.</p>
          <p>
            <strong>Phone:</strong> ${environment.BUSINESS.PHONE}<br>
            <strong>Email:</strong> ${environment.BUSINESS.EMAIL}
          </p>
        </div>
      `,
    };

    return sendMailSafely(mailOptions, `contact response to ${to}`);
};

module.exports = {
    sendInquiryConfirmation,
    sendInquiryNotificationToAdmin,
    sendWelcomeEmail,
    sendContactFormResponse,
};
