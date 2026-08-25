const axios = require('axios');

const generateOtpCode = () => String(Math.floor(100000 + Math.random() * 900000));

const normalizeIndianPhone = (phone = '') => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    if (digits.length === 12 && digits.startsWith('91')) return digits;
    throw new Error('Phone number must be a valid 10-digit Indian mobile number');
};

const sendOtp = async (phone, code, purpose) => {
    const apiKey = process.env.FAST2SMS_API_KEY;

    // Dev fallback: if no valid key in development, log OTP instead
    if (!apiKey || apiKey.includes('x')) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('[OTP] FAST2SMS_API_KEY not set or invalid — using development fallback.');
            console.log(`[OTP] Dev OTP for ${phone} (${purpose}): ${code}`);
            return { success: true, message: 'Development mode - OTP logged' };
        }
        throw new Error('FAST2SMS_API_KEY is not configured properly');
    }

    try {
        const response = await axios.get(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                params: {
                    authorization: apiKey,
                    route: "otp",
                    variables_values: code,
                    numbers: phone,
                },
            }
        );

        console.log(`[OTP] SMS sent via Fast2SMS to ${phone} (${purpose})`);
        return response.data;

    } catch (error) {
        console.error('[OTP] Fast2SMS error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    generateOtpCode,
    sendOtp,
};
