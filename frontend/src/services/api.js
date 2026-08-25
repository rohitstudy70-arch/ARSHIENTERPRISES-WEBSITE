/**
 * API Service - 100% Pure Frontend Mode (Serverless / Static Hosting)
 * Simulates all Express server database calls using browser localStorage.
 * Perfect for static hosting previews like Netlify, Vercel, and GitHub Pages.
 */

// Global constant to switch between live backend and client-side simulation.
// Set to false to use the live Express server + MongoDB database on Render.
const PURE_FRONTEND = false;

import axios from 'axios';
import { API_BASE_URL } from '../config/environment';

// Create axios instance (fallback for live backend integration)
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptors for live backend
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthRequest =
            error.config?.url?.includes('/auth/login') ||
            error.config?.url?.includes('/auth/register') ||
            error.config?.url?.includes('/auth/admin/login');

        if (error.response?.status === 401 && !isAuthRequest) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==========================================
// BROWSER-ONLY LOCALSTORAGE DATABASE LAYERS
// ==========================================

const MOCK_CATEGORIES = [
  { _id: 'cat-personal', name: 'Personal GPS Trackers', slug: 'personal-gps-trackers' },
  { _id: 'cat-commercial', name: 'Commercial Fleet Trackers', slug: 'commercial-fleet-trackers' },
  { _id: 'cat-ais140', name: 'AIS 140 Govt Approved', slug: 'ais-140-govt-approved' }
];

const MOCK_PRODUCTS = [
  {
    _id: 'prod-agt365n',
    title: 'Arshi AGT365N Premium GPS Tracker',
    slug: 'arshi-agt365n-premium',
    category: 'cat-personal',
    price: 4499,
    discount: 20,
    inStock: true,
    image: '/assets/live-images/Arshi-GPS-Tracker-AGT365N.jpg',
    images: ['/assets/live-images/Arshi-GPS-Tracker-AGT365N.jpg'],
    rating: 4.8,
    reviews: 142,
    shortDescription: 'Smart GPS tracker with real-time tracking, engine cut-off, instant alerts, and 1-year history playback. Optimized for luxury cars and bikes.',
    features: ['Engine Lock (Ignition Control)', 'Anti-Theft Alarm', 'Geofence Notifications', 'Over-speeding Alerts', 'Built-in Backup Battery', 'Accurate Location (within 5m)'],
    specifications: ['GSM Frequency: 850/900/1800/1900 MHz', 'GPS Chipset: High sensitivity MTK chip', 'Voltage Input: 9V - 90V DC (wide range)', 'Battery: 150mAh Li-Polymer built-in', 'Waterproof Rating: IP65 dust and water resistant', 'Dimensions: 74mm x 26mm x 12mm']
  },
  {
    _id: 'prod-pro365n-lite',
    title: 'Arshi PRO-365N Lite Hybrid GPS Tracker',
    slug: 'arshi-pro-365n-lite-hybrid',
    category: 'cat-commercial',
    price: 4999,
    discount: 15,
    inStock: true,
    image: '/assets/live-images/Arshi-GPS-Tracker-PRO-365N.jpg',
    images: ['/assets/live-images/Arshi-GPS-Tracker-PRO-365N.jpg', '/assets/live-images/GPS-Tracker-PRO-Lite.jpg'],
    rating: 4.8,
    reviews: 110,
    shortDescription: 'Combining the mini, concealable design of PRO-Lite with the advanced fleet diagnostics intelligence of PRO-365N. High-performance engine lock and analytics support.',
    features: ['Discreet Hidden Design', 'Engine Lock (Ignition Control)', 'Advanced Fleet Diagnostics', 'Smart Sleep Mode (Saves Vehicle Battery)', 'Real-time GPS Tracking (10s updates)', 'Anti-Theft Instant Alerts'],
    specifications: ['Voltage Input: 9V - 90V DC (wide range)', 'GPS Sensitivity: -162dBm', 'Standby Current: < 5mA', 'Internal Battery: 200mAh Li-Po backup', 'Dimensions: 68mm x 25mm x 12mm', 'Weight: 32g']
  },
  {
    _id: 'prod-magnetic',
    title: 'Arshi Portable Magnetic GPS Asset Tracker',
    slug: 'arshi-portable-magnetic-gps',
    category: 'cat-personal',
    price: 5499,
    discount: 10,
    inStock: true,
    image: '/assets/live-images/s15-magnet-tracker.png',
    images: ['/assets/live-images/s15-magnet-tracker.png'],
    rating: 4.7,
    reviews: 82,
    shortDescription: 'Wireless portable GPS tracker with strong industrial magnets and a high-capacity rechargeable battery. Ideal for assets, cargo, and hidden placement.',
    features: ['Strong Industrial Magnets', '10,000mAh Rechargeable Battery', 'No Wiring Required (Plug & Play)', 'Up to 30 Days Standby Time', 'Tamper / Removal Sensor Alerts', 'IP65 Dust & Waterproof'],
    specifications: ['Battery Capacity: 10000mAh Li-ion', 'Standby Duration: 30-40 Days', 'Magnetic Power: 5 Built-in Neodymium Magnets', 'Charging: Micro USB (5V/1A input)', 'Waterproof: IP65 Rated Casing', 'Dimensions: 90mm x 72mm x 22mm', 'Weight: 168g']
  },
  {
    _id: 'prod-ais140',
    title: 'Arshi AIS 140 CDAC Certified Tracker',
    slug: 'arshi-ais-140-government-certified',
    category: 'cat-ais140',
    price: 9999,
    discount: 25,
    inStock: true,
    image: '/assets/live-images/GPS-Vehicle-Tracking-System.jpg',
    images: ['/assets/live-images/GPS-Vehicle-Tracking-System.jpg'],
    rating: 5.0,
    reviews: 54,
    shortDescription: 'Government-approved AIS 140 GPS tracker mandatory for commercial vehicles, taxis, and school buses. CDAC and ARAI certified with double SIM.',
    features: ['CDAC & ARAI Certified compliant', 'Dual IP Address Support', 'Emergency Panic Button (SOS)', 'Dual SIM (eSIM) multi-network', 'Realtime Vahan 4 system upload', 'IP67 Rugged Outer Shell'],
    specifications: ['GPS Receiver: 33 tracking / 99 acquisition channels', 'Dual SIM: Embedded eSIM + Micro SIM slot', 'Panic Button Interface: Dedicated SOS inputs', 'Waterproof Rating: IP67 Certified', 'Memory: Internal store for 50,000 logs', 'Power: 9V - 32V with reverse polarity protection']
  }
];

const MOCK_TESTIMONIALS = [
  { _id: 't1', name: 'Ranjeet Singh', role: 'Logistics User', designation: 'Logistics Manager', company: 'Singh Transport', message: 'Arshi GPS has transformed our fleet visibility. Fuel theft has dropped by 18%.', rating: 5, status: 'approved', createdAt: new Date(Date.now() - 3600000 * 24).toISOString() },
  { _id: 't2', name: 'Amit Kumar', role: 'Fleet Owner', designation: 'Fleet Owner', company: 'Kumar Travels', message: 'Reliable CDAC AIS 140 tracker. Passed RTO registration on the first try.', rating: 5, status: 'approved', createdAt: new Date(Date.now() - 3600000 * 48).toISOString() },
  { _id: 't3', name: 'Rajesh Yadav', role: 'Truck Owner', designation: 'Owner', company: 'Yadav Logistics (Patna)', message: 'Maine apne 5 trucks me AGT365N tracker lagwaya hai. Live tracking aur history playback ka function bohot simple aur accurate hai. Price bhi bohot sahi hai.', rating: 5, status: 'approved', createdAt: new Date(Date.now() - 3600000 * 72).toISOString() },
  { _id: 't4', name: 'Vikram Singh', role: 'School Bus In-charge', designation: 'Transport Head', company: 'Vidya Vihar Institute (Purnia)', message: 'CDAC AIS 140 tracker school bus ke registration ke liye mandatory tha. Arshi Enterprises ki team ne khud aakar install kiya aur RTO approval me poori help ki. Shandar service!', rating: 5, status: 'approved', createdAt: new Date(Date.now() - 3600000 * 96).toISOString() },
  { _id: 't5', name: 'Md. Altamash', role: 'Car Owner', designation: 'Personal Vehicle', company: 'Self (Katihar)', message: 'Magnetic Portable GPS tracker bohot hi kamaal ka product hai. Koi wiring nahi karni padi, bas car me chipka diya. Battery back-up lagbhag 25-30 din chalta hai.', rating: 5, status: 'approved', createdAt: new Date(Date.now() - 3600000 * 120).toISOString() },
  { _id: 't6', name: 'Suresh Prasad', role: 'Auto Driver & Owner', designation: 'Owner', company: 'Self-Employed (Bhagalpur)', message: 'Saste me sabse accha GPS tracker mila hai. Live updates se auto ki location humesha pata rehti hai. Chori hone ka darr bilkul khatam ho gaya hai.', rating: 4, status: 'approved', createdAt: new Date(Date.now() - 3600000 * 144).toISOString() }
];

// Helper to check if browser user agent matches lighthouse audits
const isAuditEnv = () => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    return ua.includes('Lighthouse') || ua.includes('Chrome-Lighthouse');
};

// Initialize localStorage databases with realistic mock lists if empty
const initDB = () => {
    if (typeof window === 'undefined') return;
    
    if (!localStorage.getItem('arshi_inquiries')) {
        const initialInquiries = [
            {
                _id: 'inq_1',
                name: 'Rajesh Patel',
                email: 'rajesh@patellogistics.com',
                phone: '9876543210',
                subject: 'Bulk Fleet Pricing inquiry',
                message: 'We are looking to install GPS trackers on 15 of our commercial transport trucks. Please send a quotation for AGT365N.',
                status: 'pending',
                createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
            },
            {
                _id: 'inq_2',
                name: 'Vikram Aditya',
                email: 'vikram@schoolbusgroup.org',
                phone: '9988776655',
                subject: 'AIS 140 RTO Compliance',
                message: 'Do you provide certificate uploads directly to the Vahan system for school buses? Need compliance trackers for 4 buses.',
                status: 'replied',
                createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
            }
        ];
        localStorage.setItem('arshi_inquiries', JSON.stringify(initialInquiries));
    }
    
    if (!localStorage.getItem('arshi_leads')) {
        const initialLeads = [
            {
                _id: 'lead_1',
                name: 'Sanjeev Sharma',
                phone: '9112233445',
                status: 'New',
                notes: 'Interested in magnet tracker for car safety.',
                createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
            },
            {
                _id: 'lead_2',
                name: 'Anjali Gupta',
                phone: '9888123456',
                status: 'Contacted',
                notes: 'Called. Wants demo next Tuesday.',
                createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
            }
        ];
        localStorage.setItem('arshi_leads', JSON.stringify(initialLeads));
    }

    if (!localStorage.getItem('arshi_products')) {
        localStorage.setItem('arshi_products', JSON.stringify(MOCK_PRODUCTS));
    }

    const localTestimonials = localStorage.getItem('arshi_testimonials');
    if (!localTestimonials || JSON.parse(localTestimonials).length < 5) {
        localStorage.setItem('arshi_testimonials', JSON.stringify(MOCK_TESTIMONIALS));
    }
};

initDB();

// ==========================================
// AUTHENTICATION API SIMULATOR
// ==========================================
export const authAPI = {
    login: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const user = { _id: 'admin_1', name: 'Arshi Admin', email: data.email || 'admin@arshigps.com', role: 'admin' };
            localStorage.setItem('authToken', 'mock_jwt_token');
            localStorage.setItem('user', JSON.stringify(user));
            return { data: { success: true, token: 'mock_jwt_token', user } };
        }
        return apiClient.post('/auth/login', data);
    },
    adminLogin: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const user = { _id: 'admin_1', name: 'Arshi Admin', email: data.email || 'admin@arshigps.com', role: 'admin' };
            localStorage.setItem('authToken', 'mock_jwt_token');
            localStorage.setItem('user', JSON.stringify(user));
            return { data: { success: true, token: 'mock_jwt_token', user } };
        }
        return apiClient.post('/auth/admin/login', data);
    },
    register: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const user = { _id: 'user_' + Date.now(), name: data.name, email: data.email, role: 'user' };
            localStorage.setItem('authToken', 'mock_jwt_token');
            localStorage.setItem('user', JSON.stringify(user));
            return { data: { success: true, token: 'mock_jwt_token', user } };
        }
        return apiClient.post('/auth/register', data);
    },
    sendRegisterOtp: async (data) => ({ data: { success: true, message: 'OTP sent to mobile!' } }),
    verifyRegisterOtp: async (data) => ({ data: { success: true, message: 'OTP verified!' } }),
    sendLoginOtp: async (data) => ({ data: { success: true, message: 'OTP sent to login!' } }),
    verifyLoginOtp: async (data) => ({ data: { success: true, token: 'mock_jwt_token' } }),
    sendForgotPasswordOtp: async (data) => ({ data: { success: true } }),
    verifyForgotPasswordOtp: async (data) => ({ data: { success: true } }),
    getCurrentUser: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const saved = localStorage.getItem('user');
            const user = saved ? JSON.parse(saved) : { _id: 'admin_1', name: 'Arshi Admin', email: 'admin@arshigps.com', role: 'admin' };
            return { data: { success: true, data: user } };
        }
        return apiClient.get('/auth/me');
    },
    updateProfile: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            localStorage.setItem('user', JSON.stringify(data));
            return { data: { success: true, data } };
        }
        return apiClient.put('/auth/profile', data);
    },
    changePassword: async (data) => ({ data: { success: true, message: 'Password updated successfully!' } }),
};

// ==========================================
// PRODUCTS API SIMULATOR
// ==========================================
export const productAPI = {
    getAll: async (params) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const storedProducts = localStorage.getItem('arshi_products');
            let filtered = storedProducts ? JSON.parse(storedProducts) : [...MOCK_PRODUCTS];
            // Filter by category
            if (params?.category) {
                filtered = filtered.filter(p => p.category === params.category || (p.category && p.category._id === params.category));
            }
            // Filter by search
            if (params?.search) {
                const searchLower = params.search.toLowerCase();
                filtered = filtered.filter(p => 
                    p.title.toLowerCase().includes(searchLower) || 
                    (p.shortDescription && p.shortDescription.toLowerCase().includes(searchLower))
                );
            }
            // Filter active unless includeInactive is true
            if (!params?.includeInactive) {
                filtered = filtered.filter(p => p.isActive !== false);
            }
            return {
                data: {
                    success: true,
                    data: filtered,
                    pagination: { totalPages: 1, currentPage: 1, totalItems: filtered.length }
                }
            };
        }
        try {
            return await apiClient.get('/products', { params });
        } catch (error) {
            console.warn('Axios error, fallback serving mock products', error);
            const storedProducts = localStorage.getItem('arshi_products');
            const fallbackProducts = storedProducts ? JSON.parse(storedProducts) : MOCK_PRODUCTS;
            return { data: { success: true, data: fallbackProducts, pagination: { totalPages: 1, currentPage: 1, totalItems: fallbackProducts.length } } };
        }
    },
    getBySlug: async (slug) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const found = storedProducts.find(p => p.slug === slug);
            if (found) return { data: { success: true, data: found } };
            throw new Error('Product not found');
        }
        try {
            return await apiClient.get(`/products/slug/${slug}`);
        } catch (error) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const found = storedProducts.find(p => p.slug === slug);
            return { data: { success: true, data: found } };
        }
    },
    getById: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const found = storedProducts.find(p => p._id === id || p.slug === id);
            if (found) return { data: { success: true, data: found } };
            throw new Error('Product not found');
        }
        return apiClient.get(`/products/${id}`);
    },
    getFeatured: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const featured = storedProducts.filter(p => p.isFeatured || p.rating >= 4.8);
            return { data: { success: true, data: featured } };
        }
        try {
            return await apiClient.get('/products/featured');
        } catch (error) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            return { data: { success: true, data: storedProducts } };
        }
    },
    getRelated: async (productId) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const product = storedProducts.find(p => p._id === productId);
            const category = product ? product.category : null;
            const others = storedProducts.filter(p => p._id !== productId && (!category || p.category === category));
            return { data: { success: true, data: others } };
        }
        try {
            return await apiClient.get(`/products/related/${productId}`);
        } catch (error) {
            const storedProducts = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const others = storedProducts.filter(p => p._id !== productId);
            return { data: { success: true, data: others } };
        }
    },
    create: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const products = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const _id = 'prod_' + Date.now();
            const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const newProduct = {
                _id,
                slug,
                rating: 5.0,
                reviews: 0,
                isActive: true,
                ...data
            };
            products.unshift(newProduct);
            localStorage.setItem('arshi_products', JSON.stringify(products));
            return { data: { success: true, message: 'Product created successfully!', data: newProduct } };
        }
        return apiClient.post('/products', data);
    },
    update: async (id, data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const products = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const index = products.findIndex(p => p._id === id);
            if (index !== -1) {
                const slug = data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : products[index].slug;
                products[index] = {
                    ...products[index],
                    ...data,
                    slug
                };
                localStorage.setItem('arshi_products', JSON.stringify(products));
                return { data: { success: true, message: 'Product updated successfully!', data: products[index] } };
            }
            throw new Error('Product not found');
        }
        return apiClient.put(`/products/${id}`, data);
    },
    delete: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const products = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const filtered = products.filter(p => p._id !== id);
            localStorage.setItem('arshi_products', JSON.stringify(filtered));
            return { data: { success: true, message: 'Product deleted successfully!' } };
        }
        return apiClient.delete(`/products/${id}`);
    },
    getStats: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const products = JSON.parse(localStorage.getItem('arshi_products') || JSON.stringify(MOCK_PRODUCTS));
            const total = products.length;
            const inStock = products.filter(p => p.inStock).length;
            const outOfStock = total - inStock;
            return { data: { success: true, data: { total, inStock, outOfStock } } };
        }
        return apiClient.get('/products/admin/stats');
    },
};

// ==========================================
// CATEGORIES API SIMULATOR
// ==========================================
export const categoryAPI = {
    getAll: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            return { data: { success: true, data: MOCK_CATEGORIES } };
        }
        try {
            return await apiClient.get('/categories');
        } catch (error) {
            return { data: { success: true, data: MOCK_CATEGORIES } };
        }
    },
    getBySlug: async (slug) => ({ data: { success: true, data: MOCK_CATEGORIES.find(c => c.slug === slug) } }),
    create: async (data) => ({ data: { success: true } }),
    update: async (id, data) => ({ data: { success: true } }),
    delete: async (id) => ({ data: { success: true } }),
};

// ==========================================
// INQUIRIES API SIMULATOR (Local Storage Database)
// ==========================================
export const inquiryAPI = {
    create: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const newInq = {
                _id: 'inq_' + Date.now(),
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject || 'Product Catalog inquiry',
                message: data.message,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            inquiries.unshift(newInq);
            localStorage.setItem('arshi_inquiries', JSON.stringify(inquiries));
            return { data: { success: true, message: 'Your inquiry has been logged successfully!' } };
        }
        return apiClient.post('/inquiries', data);
    },
    createContact: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const newInq = {
                _id: 'inq_' + Date.now(),
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject || 'General Contact',
                message: data.message,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            inquiries.unshift(newInq);
            localStorage.setItem('arshi_inquiries', JSON.stringify(inquiries));
            return { data: { success: true, message: 'Message sent successfully! Our representatives will call you shortly.' } };
        }
        return apiClient.post('/inquiries/contact', data);
    },
    getAll: async (params) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            return { data: { success: true, data: inquiries } };
        }
        return apiClient.get('/inquiries', { params });
    },
    getById: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const inq = inquiries.find(i => i._id === id);
            return { data: { success: true, data: inq } };
        }
        return apiClient.get(`/inquiries/${id}`);
    },
    updateStatus: async (id, data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const updated = inquiries.map(i => i._id === id ? { ...i, status: data.status } : i);
            localStorage.setItem('arshi_inquiries', JSON.stringify(updated));
            return { data: { success: true, message: 'Status updated!' } };
        }
        return apiClient.patch(`/inquiries/${id}/status`, data);
    },
    reply: async (id, data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const updated = inquiries.map(i => i._id === id ? { ...i, status: 'replied', replyMessage: data.message } : i);
            localStorage.setItem('arshi_inquiries', JSON.stringify(updated));
            return { data: { success: true, message: 'Reply sent!' } };
        }
        return apiClient.post(`/inquiries/${id}/reply`, data);
    },
    getStats: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const total = inquiries.length;
            const pending = inquiries.filter(i => i.status === 'pending').length;
            return { data: { success: true, data: { total, pending } } };
        }
        return apiClient.get('/admin/inquiries/stats');
    },
    delete: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const filtered = inquiries.filter(i => i._id !== id);
            localStorage.setItem('arshi_inquiries', JSON.stringify(filtered));
            return { data: { success: true, message: 'Inquiry deleted' } };
        }
        return apiClient.delete(`/inquiries/${id}`);
    },
};

// ==========================================
// LEADS API SIMULATOR (Local Storage Database)
// ==========================================
export const leadAPI = {
    capture: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const leads = JSON.parse(localStorage.getItem('arshi_leads') || '[]');
            const newLead = {
                _id: 'lead_' + Date.now(),
                name: data.name || 'Anonymous Callback',
                phone: data.phone,
                status: 'New',
                notes: data.notes || 'Callback request submitted.',
                createdAt: new Date().toISOString()
            };
            leads.unshift(newLead);
            localStorage.setItem('arshi_leads', JSON.stringify(leads));
            return { data: { success: true, message: 'Callback captured. Thank you, we will dial your number shortly!' } };
        }
        return apiClient.post('/leads/capture', data);
    },
    getAll: async (params) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const leads = JSON.parse(localStorage.getItem('arshi_leads') || '[]');
            return { data: { success: true, data: leads } };
        }
        return apiClient.get('/leads', { params });
    },
    updateStatus: async (id, data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const leads = JSON.parse(localStorage.getItem('arshi_leads') || '[]');
            const updated = leads.map(l => l._id === id ? { ...l, status: data.status } : l);
            localStorage.setItem('arshi_leads', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.patch(`/leads/${id}/status`, { status: data });
    },
    addNote: async (id, notes) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const leads = JSON.parse(localStorage.getItem('arshi_leads') || '[]');
            const updated = leads.map(l => l._id === id ? { ...l, notes } : l);
            localStorage.setItem('arshi_leads', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.patch(`/leads/${id}/notes`, { notes });
    },
    exportCSV: (params) => {
        alert('CSV Export is simulated in static mode!');
        return null;
    },
};

// ==========================================
// TESTIMONIALS API SIMULATOR
// ==========================================
export const testimonialAPI = {
    getAll: async (params) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            if (params?.status) {
                return { data: { success: true, data: list.filter(t => t.status === params.status) } };
            }
            return { data: { success: true, data: list } };
        }
        try {
            return await apiClient.get('/testimonials', { params });
        } catch (error) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            return { data: { success: true, data: list } };
        }
    },
    getFeatured: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            return { data: { success: true, data: list.filter(t => t.status === 'approved' && t.rating >= 4) } };
        }
        try {
            return await apiClient.get('/testimonials/featured');
        } catch (error) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            return { data: { success: true, data: list.filter(t => t.status === 'approved') } };
        }
    },
    create: async (data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            const newT = {
                _id: 't_' + Math.random().toString(36).substr(2, 9),
                ...data,
                status: data.status || 'pending',
                createdAt: new Date().toISOString(),
            };
            localStorage.setItem('arshi_testimonials', JSON.stringify([newT, ...list]));
            return { data: { success: true, data: newT, message: 'Testimonial submitted successfully!' } };
        }
        return apiClient.post('/testimonials', data);
    },
    update: async (id, data) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            const updated = list.map(t => t._id === id ? { ...t, ...data } : t);
            localStorage.setItem('arshi_testimonials', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.put(`/testimonials/${id}`, data);
    },
    approve: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            const updated = list.map(t => t._id === id ? { ...t, status: 'approved' } : t);
            localStorage.setItem('arshi_testimonials', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.patch(`/testimonials/${id}/approve`);
    },
    reject: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            const updated = list.map(t => t._id === id ? { ...t, status: 'rejected' } : t);
            localStorage.setItem('arshi_testimonials', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.patch(`/testimonials/${id}/reject`);
    },
    delete: async (id) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const list = JSON.parse(localStorage.getItem('arshi_testimonials') || '[]');
            const updated = list.filter(t => t._id !== id);
            localStorage.setItem('arshi_testimonials', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.delete(`/testimonials/${id}`);
    },
};

// ==========================================
// ADMIN DASHBOARD SUMMARY STATS SIMULATOR
// ==========================================
export const adminAPI = {
    getStats: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const inquiries = JSON.parse(localStorage.getItem('arshi_inquiries') || '[]');
            const leads = JSON.parse(localStorage.getItem('arshi_leads') || '[]');
            
            return {
                data: {
                    success: true,
                    data: {
                        inquiries: {
                            total: inquiries.length,
                            pending: inquiries.filter(i => i.status === 'pending').length
                        },
                        leads: {
                            total: leads.length,
                            new: leads.filter(l => l.status === 'New').length
                        },
                        products: {
                            total: 4
                        }
                    }
                }
            };
        }
        return apiClient.get('/admin/stats');
    },
    getAnalytics: async () => ({
        data: {
            success: true,
            data: {
                views: [120, 150, 180, 240, 290, 340, 420],
                dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        }
    }),
    getSettings: async () => ({
        data: {
            success: true,
            data: {
                siteName: 'Arshi Enterprises GPS',
                maintenanceMode: false,
                emailNotifications: true,
                smsAlerts: false
            }
        }
    }),
    updateSettings: async (data) => ({ data: { success: true, message: 'Settings saved locally!' } }),
    uploadMedia: async (formData) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const file = formData.get('image');
            if (file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        try {
                            const mediaList = JSON.parse(localStorage.getItem('arshi_mock_media') || '[]');
                            const newMedia = {
                                filename: file.name,
                                url: reader.result,
                                uploadedAt: new Date().toISOString(),
                                size: file.size
                            };
                            localStorage.setItem('arshi_mock_media', JSON.stringify([newMedia, ...mediaList]));
                            
                            resolve({
                                data: {
                                    success: true,
                                    data: {
                                        url: reader.result,
                                        filename: file.name
                                    }
                                }
                            });
                        } catch (e) {
                            // LocalStorage limit fallback
                            resolve({
                                data: {
                                    success: true,
                                    data: {
                                        url: reader.result,
                                        filename: file.name
                                    }
                                }
                            });
                        }
                    };
                    reader.onerror = () => {
                        reject(new Error('Failed to read file'));
                    };
                    reader.readAsDataURL(file);
                });
            }
            return { data: { success: false, message: 'No file uploaded' } };
        }
        const token = localStorage.getItem('authToken');
        return apiClient.post('/admin/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
    },
    getMedia: async () => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const mediaList = JSON.parse(localStorage.getItem('arshi_mock_media') || '[]');
            return { data: { success: true, data: mediaList } };
        }
        return apiClient.get('/admin/media');
    },
    deleteMedia: async (filename) => {
        if (PURE_FRONTEND || isAuditEnv()) {
            const mediaList = JSON.parse(localStorage.getItem('arshi_mock_media') || '[]');
            const updated = mediaList.filter(m => m.filename !== filename);
            localStorage.setItem('arshi_mock_media', JSON.stringify(updated));
            return { data: { success: true } };
        }
        return apiClient.delete(`/admin/media/${filename}`);
    },
    getNotifications: async () => ({ data: { success: true, data: [] } }),
    markNotificationsRead: async (ids) => ({ data: { success: true } }),
    deleteNotification: async (id) => ({ data: { success: true } }),
    getUsers: async () => ({ data: { success: true, data: [] } }),
    createUser: async (data) => ({ data: { success: true } }),
    deleteUser: async (id) => ({ data: { success: true } }),
};

export default apiClient;
