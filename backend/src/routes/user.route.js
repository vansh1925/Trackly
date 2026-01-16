import express from 'express';
import { registerUser, loginUser ,getMe} from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const userroutes=express.Router();

userroutes.post('/register', registerUser);
userroutes.post('/login', loginUser);
userroutes.get('/me', authMiddleware, getMe);
export default userroutes;