import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const authMiddleware=async (req, _ , next) => {
  const authHeader=req.header.authorization?.split(' ')[1];

  if(!authHeader){
    return res.status(401).json({ message: 'Authorization header missing' });
  } 
  try{
    const decodeToken=jwt.verify(authHeader, process.env.JWT_SECRET);
    const user=await User.findById(decodeToken.id).select('-password');
    if(!user){
      return res.status(401).json({ message: 'User not found' });
    }
    req.user=user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
export default authMiddleware;