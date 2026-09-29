import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import leadRoutes from './routes/leadRoutes.js';
import productRoutes from './routes/productRoutes.js';
import stateRoutes from './routes/stateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/leads', leadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/states', stateRoutes);

// Health Check Root
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Arshi Enterprises MERN API is running live 🚀',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
