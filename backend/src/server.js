/**
 * Main Express Server
 * Production-ready server configuration
 */

require('express-async-errors');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { connectDB } = require('./config/database');
const environment = require('./config/environment');

// Middleware imports
const { errorHandler, asyncHandler } = require('./middleware/errorHandler');
const {
    corsOptions,
    helmetOptions,
    createRateLimiter,
    securityHeaders,
} = require('./middleware/security');

// Routes imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const adminRoutes = require('./routes/adminRoutes');
const leadRoutes = require('./routes/leadRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Trust proxy
app.set('trust proxy', 1);

// HTTP request logger
app.use(morgan('combined'));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Compression middleware for response gzip compression
app.use(compression());

// Security headers with Helmet
app.use(helmetOptions);

// Additional security headers
app.use(securityHeaders);

// CORS configuration
app.use(cors(corsOptions));

// Rate limiting
app.use('/api/', createRateLimiter());

// Serve uploaded images
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const API_VERSION = '/api/v1';


// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date(),
        environment: environment.NODE_ENV,
    });
});

// Authentication routes
app.use(`${API_VERSION}/auth`, authRoutes);

// Product routes
app.use(`${API_VERSION}/products`, productRoutes);

// Category routes
app.use(`${API_VERSION}/categories`, categoryRoutes);

// Inquiry routes
app.use(`${API_VERSION}/inquiries`, inquiryRoutes);

// Testimonial routes
app.use(`${API_VERSION}/testimonials`, testimonialRoutes);

// Admin routes
app.use(`${API_VERSION}/admin`, adminRoutes);

// Lead routes
app.use(`${API_VERSION}/leads`, leadRoutes);

// Chatbot routes
app.use(`${API_VERSION}/chat`, chatRoutes);

// Robots.txt
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Sitemap: ${environment.API_URL}/sitemap.xml
`);
});

// Sitemap
app.get('/sitemap.xml', asyncHandler(async (req, res) => {
    const Product = require('./models/Product');
    const Category = require('./models/Category');

    const products = await Product.find({ isActive: true }).select('slug updatedAt');
    const categories = await Category.find({ isActive: true }).select('slug updatedAt');

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    xml += `
  <url>
    <loc>${environment.FRONTEND_URL}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>\n`;

    products.forEach((product) => {
        xml += `
  <url>
    <loc>${environment.FRONTEND_URL}/products/${product.slug}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });

    categories.forEach((category) => {
        xml += `
  <url>
    <loc>${environment.FRONTEND_URL}/categories/${category.slug}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });

    xml += '</urlset>';

    res.type('application/xml');
    res.send(xml);
}));

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Route not found',
        path: req.path,
    });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = environment.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`[SERVER] Running on http://localhost:${PORT}`);
    console.log(`[SERVER] Environment: ${environment.NODE_ENV}`);
    console.log('[SERVER] Auth API ready: POST /api/v1/auth/register');
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`[SERVER] Port ${PORT} is already in use. Stop the other process or change PORT in backend/.env`);
    } else {
        console.error(`[SERVER] Startup error: ${error.message}`);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => {
        process.exit(1);
    });
});

module.exports = app;
