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

const app=express();
app.use(helmet());
app.use(compression());

connectDB();

// Environment-specific CORS configuration
const corsOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'https://trackly-zeta.vercel.app'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// Request size limits to prevent DoS attacks
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
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
  
});

