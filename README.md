# Arshi GPS - Production-Ready MERN Stack

A complete, enterprise-level MERN stack website for Arshi Enterprises - Professional GPS tracking and fleet management company.

## 🎯 Project Overview

This is a full-stack MERN application designed for professional GPS tracking and fleet management. It includes:

- **Professional Website** - Product listings, services, about, contact pages
- **Admin Dashboard** - Manage products, inquiries, testimonials
- **Authentication System** - JWT-based user and admin authentication
- **Responsive Design** - Mobile-first, production-ready UI
- **SEO Optimization** - Meta tags, sitemaps, structured data
- **Performance Optimized** - Code splitting, lazy loading, compression
- **Security** - Rate limiting, CORS, helmet headers, input validation
- **Email Integration** - Automated notifications via Nodemailer

## 📁 Project Structure

```
arshigps website/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API service
│   │   ├── context/         # React Context
│   │   ├── config/          # Configuration
│   │   ├── utils/           # Utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── backend/                  # Node.js + Express application
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── models/          # MongoDB schemas
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # External services
│   │   ├── utils/           # Utilities
│   │   ├── config/          # Configuration
│   │   └── server.js        # Entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── .github/                 # GitHub configuration
    └── copilot-instructions.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas account
- Gmail account (for email notifications)

### Installation

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials:
# - MONGODB_URI
# - JWT_SECRET
# - EMAIL_USER and EMAIL_PASSWORD
# - Other settings

# Run development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

## 🔧 Configuration

### Backend Environment Variables

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/arshi-gps
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@arshigps.com

ADMIN_EMAIL=admin@arshigps.com
ADMIN_PASSWORD=ChangeMe@123
```

### Frontend Environment Variables

Create `.env` in frontend folder:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## 📚 API Documentation

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/admin/login` - Admin login
- `GET /api/v1/auth/me` - Get current user profile

### Products

- `GET /api/v1/products` - Get all products (paginated)
- `GET /api/v1/products/slug/:slug` - Get product by slug
- `GET /api/v1/products/featured` - Get featured products
- `POST /api/v1/products` - Create product (admin only)
- `PUT /api/v1/products/:id` - Update product (admin only)
- `DELETE /api/v1/products/:id` - Delete product (admin only)

### Categories

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:slug` - Get category by slug
- `POST /api/v1/categories` - Create category (admin)
- `PUT /api/v1/categories/:id` - Update category (admin)
- `DELETE /api/v1/categories/:id` - Delete category (admin)

### Inquiries

- `POST /api/v1/inquiries` - Create inquiry
- `POST /api/v1/inquiries/contact` - Contact form submission
- `GET /api/v1/inquiries` - Get all inquiries (admin)
- `GET /api/v1/inquiries/:id` - Get inquiry details (admin)
- `PATCH /api/v1/inquiries/:id/status` - Update inquiry status (admin)
- `DELETE /api/v1/inquiries/:id` - Delete inquiry (admin)

### Testimonials

- `GET /api/v1/testimonials` - Get all testimonials
- `GET /api/v1/testimonials/featured` - Get featured testimonials
- `POST /api/v1/testimonials` - Create testimonial (admin)
- `PUT /api/v1/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/v1/testimonials/:id` - Delete testimonial (admin)

### Admin

- `GET /api/v1/admin/stats` - Dashboard statistics (admin)
- `GET /api/v1/admin/users` - Get all admin users (admin)
- `POST /api/v1/admin/users` - Create admin user (admin)
- `DELETE /api/v1/admin/users/:id` - Delete admin user (admin)

## 🎨 Frontend Features

- ✅ Responsive design (Mobile, Tablet, Desktop, Large screens)
- ✅ SEO optimized (Meta tags, structured data, sitemap)
- ✅ Fast loading (Code splitting, lazy loading, compression)
- ✅ Professional UI (Tailwind CSS, modern components)
- ✅ Authentication system (JWT, protected routes)
- ✅ Product catalog (Filtering, pagination, search)
- ✅ Admin dashboard (Analytics, management)
- ✅ Contact forms (Validation, notifications)
- ✅ WhatsApp integration
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling

## 🔐 Security Features

- ✅ JWT authentication with expiration
- ✅ Password hashing (bcryptjs)
- ✅ Rate limiting (prevents brute force)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation (Joi schemas)
- ✅ XSS protection
- ✅ CSRF protection (cookies)
- ✅ Secure password requirements
- ✅ Protected admin routes

## 📊 Database Schema

### Collections

1. **Users** - User accounts with roles (admin, user)
2. **Products** - GPS tracking products with details
3. **Categories** - Product categories
4. **Inquiries** - Customer inquiries and contact forms
5. **Testimonials** - Customer testimonials
6. **Settings** - Application settings

## 🚢 Deployment

### Frontend Deployment (Vercel)

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)

1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in backend .env

## 🎯 SEO Optimization

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (social sharing)
- ✅ Twitter cards
- ✅ Canonical URLs
- ✅ Sitemap.xml (auto-generated)
- ✅ Robots.txt
- ✅ Structured data (Schema.org)
- ✅ Image alt tags
- ✅ Semantic HTML
- ✅ Heading hierarchy

## ⚡ Performance Optimization

- ✅ Code splitting (React.lazy)
- ✅ Lazy loading (React.Suspense)
- ✅ Image optimization (Responsive images)
- ✅ Gzip compression
- ✅ API caching
- ✅ Database indexing
- ✅ Pagination
- ✅ Debounced search
- ✅ CDN-ready assets
- ✅ Minified builds

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px - 1280px
- Large: 1281px+

## 🧪 Testing

### Frontend

```bash
cd frontend
npm run lint
```

### Backend

```bash
cd backend
npm test
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database name is correct

### Email Not Sending

- Enable "Less secure app access" in Gmail
- Use App Password instead of regular password
- Check SMTP settings

### CORS Errors

- Verify FRONTEND_URL in backend .env
- Check allowed origins in security.js
- Ensure development server is running

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

## 📞 Support

For issues and questions:

- Email: arshiranjeet133@gmail.com
- Phone: +91 77828 08063

## 📄 License

All rights reserved © Arshi Enterprises 2024

## 🙏 Credits

Built with:

- React.js
- Vite
- Express.js
- MongoDB
- Tailwind CSS
- And other amazing open-source libraries

---

**Made with ❤️ by Arshi Enterprises**
