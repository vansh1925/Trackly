// Global rate limiting for API
import rateLimit from 'express-rate-limit';
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Stricter rate limiting for auth endpoints
export  const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,// 15 minutes
  max: 10,// max 10 requests per window per IP
  message: { message: 'Too many auth attempts. Try later.' },
  standardHeaders: true,
  legacyHeaders: false
});