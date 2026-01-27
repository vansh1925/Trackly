import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
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
connectDB();
// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

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
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});