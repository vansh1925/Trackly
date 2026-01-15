import express from 'express';
import { registerUser, loginUser ,getMe} from '../controllers/user.controller.js';
const userroutes=express.Router();

userroutes.post('/register', registerUser);
userroutes.post('/login', loginUser);
userroutes.get('/me', getMe);
export default userroutes;