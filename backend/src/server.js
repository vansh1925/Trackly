import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import { apiLimiter, authLimiter } from './middlewares/rateLimiter.middleware.js';
import connectDB from './config/db.js';
import userroutes from './routes/user.route.js';
import expenserouters from './routes/expense.route.js';
import taskrouters from './routes/task.route.js';
import authMiddleware from './middlewares/auth.middleware.js';
import dashboardrouter from './routes/dashboard.route.js';
import Analyticsrouter from './routes/analytics.route.js';

dotenv.config();

// Validate required environment variables
const validateEnv = () => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.error('Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }
  console.log('✅ Environment variables validated');
};

validateEnv();

const app=express();

// Security middleware with production-ready configuration
app.use(helmet());

// Response compression
app.use(compression());

connectDB();

// Environment-specific CORS configuration
const corsOrigins = process.env.NODE_ENV === 'production' 
  ? process.env.CORS_ORIGIN?.split(',') || []
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request size limits to prevent DoS attacks
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Apply rate limiters
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);
app.use('/api/dashboard', apiLimiter);
app.use('/api/analytics', apiLimiter);

//routes
app.use('/api/users',userroutes);
app.use('/api/expenses',authMiddleware,expenserouters);
app.use('/api/tasks',authMiddleware,taskrouters);
app.use('/api/dashboard',authMiddleware,dashboardrouter);
app.use('/api/analytics',authMiddleware,Analyticsrouter);
const PORT=process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS origins: ${corsOrigins.join(', ')}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});