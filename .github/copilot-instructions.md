/\*\*

- GitHub Copilot Instructions
- Configuration for this project
  \*/

# Arshi GPS - Production MERN Stack

## Project Overview

This is a complete, enterprise-level MERN (MongoDB, Express, React, Node.js) stack application for Arshi Enterprises GPS tracking and fleet management platform.

## Tech Stack

**Frontend:**

- React 18.2.0
- Vite (build tool)
- React Router DOM 6.20.0
- Tailwind CSS 3.3.6
- Axios for API calls
- React Hot Toast for notifications

**Backend:**

- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 8.0.0
- JWT authentication
- Nodemailer for emails
- Multer for file uploads

## Key Features

### Frontend

- Professional, modern UI with Tailwind CSS
- Fully responsive (mobile, tablet, desktop)
- SEO optimized with meta tags
- Product catalog with filtering and pagination
- User authentication system
- Admin dashboard
- Contact forms with email integration
- WhatsApp integration
- Real-time notifications

### Backend

- RESTful API architecture
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation with Joi
- Error handling middleware
- Rate limiting
- CORS and security headers
- Email notifications
- Database indexing for performance

## File Structure

### Backend (`/backend`)

```
src/
├── controllers/     # Business logic
├── routes/         # API endpoints
├── models/         # MongoDB schemas
├── middleware/     # Auth, validation, error handling
├── services/       # Email, external services
├── utils/          # Helper functions
├── config/         # Database and environment config
└── server.js       # Entry point
```

### Frontend (`/frontend`)

```
src/
├── pages/          # Page components
├── components/     # Reusable UI components
├── layouts/        # Layout wrappers
├── services/       # API client
├── context/        # React Context (Auth)
├── config/         # Environment config
├── utils/          # Helper functions
├── App.jsx         # Main router
└── main.jsx        # Entry point
```

## Setup Instructions

### Backend Setup

1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example`
4. Configure MongoDB URI and other environment variables
5. Run development server: `npm run dev`
6. Backend runs on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Frontend runs on http://localhost:5173

## API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

### Auth

- POST `/auth/register` - Register user
- POST `/auth/login` - Login user
- GET `/auth/me` - Get current user

### Products

- GET `/products` - Get all products
- GET `/products/slug/:slug` - Get product details
- POST `/products` - Create (admin)
- PUT `/products/:id` - Update (admin)
- DELETE `/products/:id` - Delete (admin)

### Inquiries

- POST `/inquiries` - Create inquiry
- GET `/inquiries` - Get all (admin)
- PATCH `/inquiries/:id/status` - Update status (admin)

## Development Guidelines

### Code Style

- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Use UPPER_SNAKE_CASE for constants
- Write meaningful comments for complex logic
- Keep components small and focused

### React Best Practices

- Use functional components with hooks
- Use React Router for navigation
- Implement proper error boundaries
- Use Context API for global state
- Implement loading and error states
- Use proper TypeScript-like JSDoc comments

### Node.js Best Practices

- Use async/await for asynchronous operations
- Implement proper error handling
- Use middleware for cross-cutting concerns
- Validate all inputs
- Use environment variables for configuration
- Implement proper logging

## Database

**MongoDB Atlas Configuration:**

- Create account at mongodb.com
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in backend .env

**Collections:**

- users (user accounts)
- products (GPS tracking products)
- categories (product categories)
- inquiries (customer inquiries)
- testimonials (customer reviews)

## Environment Variables

### Backend `.env`

```
MONGODB_URI=<connection_string>
JWT_SECRET=<secret_key>
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_USER=<email@gmail.com>
EMAIL_PASSWORD=<app_password>
BUSINESS_EMAIL=info@arshigps.com
BUSINESS_PHONE=+91-XXXXXXXXXX
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api/v1
```

## Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Render/Railway/VPS)

- Connect GitHub repository
- Set environment variables
- Configure build command: `npm install`
- Configure start command: `npm start`
- Deploy

## Performance Optimization

- Code splitting with React.lazy
- Image optimization
- API pagination
- Database indexing
- Gzip compression
- CDN for static assets
- Caching strategies

## Security

- JWT authentication
- Password hashing (bcryptjs)
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation
- XSS protection
- Secure headers

## Testing & Validation

- Input validation with Joi schemas
- API error handling
- Form validation on frontend
- Loading and error states

## Additional Resources

- React Documentation: https://react.dev
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

## Maintenance

- Monitor error logs
- Update dependencies regularly
- Backup MongoDB regularly
- Monitor API performance
- Check security vulnerabilities
