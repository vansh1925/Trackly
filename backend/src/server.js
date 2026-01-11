import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userroutes from './routes/user.route.js';
import expenserouters from './routes/expense.route.js';
import taskrouters from './routes/task.route.js';
import authMiddleware from './middlewares/auth.middleware.js';
dotenv.config();
const app=express();
connectDB();
app.use(express.json());

const PORT=process.env.PORT || 5000;  
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});
app.use('/api/users',userroutes);
app.use('/api/expenses',authMiddleware,expenserouters);
app.use('/api/tasks',authMiddleware,taskrouters);


