import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePasswordStrength, sanitizeInput } from '../utils/validation.js';

const generateAccessToken= (userId)=>{
  
  const token=jwt.sign({ id:userId }, process.env.JWT_SECRET, { expiresIn:'7d' });
  return token;
}
const registerUser = async (req, res) => {
 try {
   let { name, email, password } = req.body;
   
   // Sanitize inputs
   name = sanitizeInput(name);
   email = sanitizeInput(email);
   
   if(!name || !email || !password){
     return res.status(400).json({ message: 'All fields are required' });
   }
   
   // Validate email format
   if (!validateEmail(email)) {
     return res.status(400).json({ message: 'Invalid email format' });
   }
   
   // Validate name length
   if (name.length < 2 || name.length > 100) {
     return res.status(400).json({ message: 'Name must be between 2 and 100 characters' });
   }
   
   // Validate password strength
   const passwordValidation = validatePasswordStrength(password);
   if (!passwordValidation.valid) {
     return res.status(400).json({ message: passwordValidation.message });
   }
   
   const existingUser=await User.findOne({ email });
   
   if(existingUser){
     return res.status(400).json({ message: 'User already exists' });
   }
   
   const hashedPassword = await bcrypt.hash(password, 10);
   const user= await User.create({ name, email, password: hashedPassword });
   const createdUser = await User.findById(user._id)
        .select("-password")

    if (!createdUser) {
      return res.status(404).json({ message: "User not found after creation" });
    }

   const token = generateAccessToken(createdUser._id);

   res.status(201).json({
     message: 'User registered successfully',
     data: {
       token,
       user: createdUser
     }
   });
 } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
 }
}
const loginUser = async(req, res) => {
  try {
    const { email, password } = req.body;
    
    if(!email || !password){
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user=await User.findOne({ email });
    
    if(!user){
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const isPasswordValid=await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid){
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token=generateAccessToken(user._id);
    const loggeduser=await User.findById(user._id).select('-password');
    res.status(200).json({ message: 'Login successful', data: {token, user: loggeduser} });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
  
}
const getMe= async(req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    res.status(200).json({ message: 'User data fetched successfully', data: { user: req.user } });
  } catch (error) {
    console.error('getMe error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
    
    
export { registerUser, loginUser, getMe };