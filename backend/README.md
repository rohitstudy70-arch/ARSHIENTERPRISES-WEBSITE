# Arshi GPS Backend

Node.js + Express.js + MongoDB - Production-Ready API

## Setup

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Run development server
npm run dev

# Start production server
npm start
```

## Environment Configuration

Copy `.env.example` to `.env` and update with your values:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Project Structure

- `src/controllers/` - Business logic
- `src/routes/` - API routes
- `src/models/` - MongoDB schemas
- `src/middleware/` - Custom middleware
- `src/services/` - External services (email, etc.)
- `src/utils/` - Utility functions
- `src/config/` - Configuration files

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/admin/login` - Admin login
- `GET /api/v1/auth/me` - Get current user

### Products

- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:slug` - Get product by slug
- `POST /api/v1/products` - Create product (admin)
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### Inquiries

- `POST /api/v1/inquiries` - Create inquiry
- `GET /api/v1/inquiries` - Get all inquiries (admin)
- `GET /api/v1/inquiries/:id` - Get inquiry details (admin)
- `PATCH /api/v1/inquiries/:id/status` - Update status (admin)

### Testimonials

- `GET /api/v1/testimonials` - Get testimonials
- `POST /api/v1/testimonials` - Create (admin)
- `PUT /api/v1/testimonials/:id` - Update (admin)
- `DELETE /api/v1/testimonials/:id` - Delete (admin)

## Security Features

- JWT Authentication
- Password hashing with bcryptjs
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with Joi
- SQL injection prevention (Mongoose)
- XSS protection

## Features

- ✓ RESTful API
- ✓ JWT authentication
- ✓ Role-based access control
- ✓ Email notifications
- ✓ Input validation
- ✓ Error handling
- ✓ API documentation
- ✓ Database indexing
- ✓ Pagination
- ✓ SEO sitemaps

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcryptjs
- Nodemailer
- Joi validation
- Helmet
- CORS
- Morgan logging

## Port

Default: `5000`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas
3. Configure email service
4. Update environment variables
5. Use process manager (PM2)
6. Setup reverse proxy (Nginx)
7. Enable HTTPS/SSL
