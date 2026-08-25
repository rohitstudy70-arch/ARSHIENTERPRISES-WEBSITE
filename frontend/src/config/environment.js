/**
 * Frontend Environment Configuration
 */

const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const BUSINESS = {
    NAME: 'Arshi Enterprises',
    EMAIL: 'arshiranjeet133@gmail.com',
    PHONE: '+91 77828 08063',
    ADDRESS: 'Hanuman Mandir, NH31, Maranga, near Vidya Vihar Institute Of Technology, Purnia - 854303, Bihar, India',
    WHATSAPP: '+91 77828 08063',
    PROPRIETOR: 'Mr Ranjeet Kumar',
    GST: '10ATIPK1589P1ZA',
};

const SITE_CONFIG = {
    TITLE: 'Arshi Enterprises - GPS Tracking & Fleet Management',
    DESCRIPTION: 'Professional GPS tracking, real-time vehicle tracking, and fleet management solutions for businesses',
    KEYWORDS: 'GPS tracking, vehicle tracking, fleet management, real-time tracking, AIS140 GPS',
    AUTHOR: 'Arshi Enterprises',
    URL: 'https://arshigps.com',
};

export { API_BASE_URL, BUSINESS, SITE_CONFIG };
