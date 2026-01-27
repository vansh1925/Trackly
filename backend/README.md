# 🚀 Trackly Backend API

Express.js REST API for managing expenses, tasks, and personal analytics. Features JWT authentication, MongoDB integration, rate limiting, and comprehensive security.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Development](#development)


---

## 📦 Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- MongoDB 5.0+ (Atlas cloud or local)
- Postman or similar API testing tool (optional)

---

## 🔧 Installation

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- express (5.2.1) - Web framework
- mongoose (9.1.1) - MongoDB ODM
- jsonwebtoken (9.0.3) - JWT auth
- bcryptjs (3.0.3) - Password hashing
- helmet (8.1.0) - Security headers
- express-rate-limit (8.2.1) - Rate limiting
- cors (2.8.5) - Cross-origin support
- dotenv (17.2.3) - Environment config
- nodemon (dev) - Auto-restart during development

---

## ⚙️ Environment Setup

### Create .env File
```bash
cp .env.example .env
```

### Configure Environment Variables
```env
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=AppName

# JWT Secret (minimum 64 characters, cryptographically secure)
JWT_SECRET=your_super_secret_jwt_key_with_more_than_64_characters_for_security

# Server Port
PORT=5000
```

### Getting MongoDB URI

#### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project and cluster
4. Click "Connect" and select "Connect your application"
5. Copy connection string
6. Replace `<username>`, `<password>` with your credentials

#### Option 2: Local MongoDB
```env
MONGO_URI=mongodb://localhost:27017/ExpenseTracker
```

---

## ▶️ Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```



Expected output:
```
Server is running on port 5000
MongoDB connected
```

### Production Mode
```bash
npm start
```

### Verify Server is Running
```bash
curl http://localhost:5000/api/users/me
# Returns: 401 Unauthorized (expected - no token)
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Analytics

#### Spending vs Productivity (last 7 days)
```http
GET /analytics/analytics
Authorization: Bearer <token>
```
Returns daily expenses, daily productivity (minutes), averages, and correlation insights (drop/gain vs spend).

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Status**: 201 Created
**Response**:
```json
{
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Validation Rules**:
- Name: 2-100 characters
- Email: Valid email format, unique
- Password: Min 8 chars, uppercase, lowercase, number, special char

---

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Status**: 200 OK
**Response**:
```json
{
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Rate Limit**: 10 requests per 10 minutes

---

#### Get Current User
```http
GET /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Status**: 200 OK
**Response**:
```json
{
  "message": "User data fetched successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-20T10:00:00Z",
      "updatedAt": "2026-01-20T10:00:00Z"
    }
  }
}
```

**Requires**: Valid JWT token

---

### Expense Endpoints

#### Create Expense
```http
POST /expenses/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 2500,
  "date": "2026-01-20",
  "category": "Food",
  "description": "Weekly groceries"
}
```

**Status**: 201 Created

**Categories**: Food, Transport, Entertainment, Utilities, Shopping, Health, Other

---

#### Get All Expenses (Paginated)
```http
GET /expenses/getall?page=1&limit=10
Authorization: Bearer <token>
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Status**: 200 OK
**Response**:
```json
{
  "message": "Expenses fetched successfully",
  "expenses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Grocery Shopping",
      "amount": 2500,
      "date": "2026-01-20T00:00:00Z",
      "category": "Food",
      "description": "Weekly groceries",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-20T10:30:00Z"
    }
  ],
  "page": 1,
  "totalpages": 5,
  "totalExpenses": 50
}
```

---

#### Get Single Expense
```http
GET /expenses/get/:id
Authorization: Bearer <token>
```

**Parameters**:
- `id`: Expense MongoDB ObjectId

**Status**: 200 OK or 404 Not Found

---

#### Update Expense
```http
PUT /expenses/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 3000,
  "date": "2026-01-20",
  "category": "Food",
  "description": "Updated description"
}
```

**Status**: 200 OK

---

#### Delete Expense
```http
DELETE /expenses/delete/:id
Authorization: Bearer <token>
```

**Status**: 200 OK
**Response**:
```json
{
  "message": "Expense deleted successfully"
}
```

---

#### Get Total Expenses
```http
GET /expenses/total?period=monthly&value=2026-01
Authorization: Bearer <token>
```

**Query Parameters**:
- `period`: "daily", "monthly", or "yearly"
- `value`: 
  - For daily: "2026-01-20"
  - For monthly: "2026-01"
  - For yearly: "2026"

**Status**: 200 OK
**Response**:
```json
{
  "message": "Total expense fetched successfully",
  "totalAmount": 45000
}
```

---

### Task Endpoints

#### Create Task
```http
POST /tasks/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project report",
  "duration": 120,
  "date": "2026-01-20"
}
```

**Status**: 201 Created

---

#### Get All Tasks (Paginated)
```http
GET /tasks/getall?page=1&limit=10
Authorization: Bearer <token>
```

**Status**: 200 OK
**Response**:
```json
{
  "message": "Tasks fetched successfully",
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Complete project report",
      "duration": 120,
      "date": "2026-01-20T00:00:00Z",
      "completed": false,
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-20T10:30:00Z"
    }
  ],
  "page": 1,
  "totalpages": 3,
  "totaltasks": 25
}
```

---

#### Get Single Task
```http
GET /tasks/get/:id
Authorization: Bearer <token>
```

**Status**: 200 OK

---

#### Update Task
```http
PUT /tasks/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task",
  "duration": 150,
  "date": "2026-01-20"
}
```

**Status**: 200 OK

---

#### Toggle Task Status
```http
PUT /tasks/toggle/:id
Authorization: Bearer <token>
```

Toggles `completed` field between true/false.

**Status**: 200 OK
**Response**:
```json
{
  "message": "Task status toggled successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Complete project report",
    "completed": true
  }
}
```

---

#### Delete Task
```http
DELETE /tasks/delete/:id
Authorization: Bearer <token>
```

**Status**: 200 OK

---

### Dashboard Endpoint

#### Get Dashboard Analytics
```http
GET /dashboard
Authorization: Bearer <token>
```

**Status**: 200 OK
**Response**:
```json
{
  "message": "Dashboard data fetched successfully",
  "expenses": {
    "today": 2500,
    "thisMonth": 45000
  },
  "productivity": {
    "today": 240
  },
  "tasks": {
    "completed": 15,
    "pending": 8
  },
  "charts": {
    "byCategory": [
      {
        "category": "Food",
        "amount": 12000,
        "count": 20
      },
      {
        "category": "Transport",
        "amount": 8000,
        "count": 15
      }
    ],
    "dailyTrend": [
      {
        "date": "2026-01-14",
        "day": "Mon",
        "amount": 3000
      },
      {
        "date": "2026-01-15",
        "day": "Tue",
        "amount": 4200
      }
    ],
    "monthlyTrend": [
      {
        "month": "Aug 2025",
        "amount": 42000
      },
      {
        "month": "Sep 2025",
        "amount": 45000
      }
    ]
  }
}
```

Uses 9 MongoDB aggregation pipelines for complex calculations.

**Rate Limit**: 20 requests per 15 minutes

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (2-100 chars, required),
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  amount: Number (required),
  date: Date (required),
  category: String (required),
  description: String (optional),
  userId: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required, trimmed),
  duration: Number (required, in minutes),
  completed: Boolean (default: false),
  date: Date (required),
  userId: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Middleware

### Authentication Middleware (`auth.middleware.js`)
- Validates JWT token from Authorization header
- Extracts user info from token
- Attaches user to request object
- Returns 401 if token is missing or invalid

**Usage**:
```javascript
app.use('/api/expenses', authMiddleware, expenserouters);
```

### Rate Limiting Middleware (`rateLimiter.middleware.js`)

#### API Limiter
- Limit: 20 requests per 15 minutes
- Applied to: `/api/dashboard`

#### Auth Limiter
- Limit: 10 requests per 10 minutes
- Applied to: `/api/users/login`, `/api/users/register`

---

## ⚠️ Error Handling

### Standard Error Responses

#### Validation Error (400)
```json
{
  "message": "All fields are required"
}
```

#### Authentication Error (401)
```json
{
  "message": "Invalid or expired token"
}
```

#### Not Found (404)
```json
{
  "message": "Expense not found"
}
```

#### Rate Limited (429)
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

**Headers**:
```
RateLimit-Limit: 20
RateLimit-Remaining: 5
RateLimit-Reset: 1642683900
```

#### Server Error (500)
```json
{
  "message": "Internal Server Error"
}
```

---

## 🛠 Development

### Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── expense.controller.js
│   │   ├── task.controller.js
│   │   └── dashboard.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── expense.model.js
│   │   └── task.model.js
│   ├── routes/
│   │   ├── user.route.js
│   │   ├── expense.route.js
│   │   ├── task.route.js
│   │   └── dashboard.route.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── rateLimiter.middleware.js
│   ├── utils/
│   │   └── validation.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

### Adding a New Endpoint

#### 1. Create Controller Method
```javascript
// src/controllers/example.controller.js
export const getExample = async (req, res) => {
  try {
    const data = await Example.find({ userId: req.user._id });
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
```

#### 2. Create Route
```javascript
// src/routes/example.route.js
import express from 'express';
import { getExample } from '../controllers/example.controller.js';

const router = express.Router();
router.get('/', getExample);

export default router;
```

#### 3. Register Route in Server
```javascript
// src/server.js
import exampleRouter from './routes/example.route.js';
app.use('/api/example', authMiddleware, exampleRouter);
```

### Code Style

- Use ES6+ modules (`import/export`)
- Use async/await (not callbacks)
- Use arrow functions
- Proper error handling with try-catch
- Validate all inputs
- Return consistent response format

### Testing with Postman

1. Create environment variable for token:
   - Login to get token
   - Set `{{token}}` variable
   - Use `Authorization: Bearer {{token}}` in requests

2. Use pre-built collection (see root README for Postman export)

---

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=<production_mongodb_uri>
JWT_SECRET=<64_character_secure_random_string>
PORT=5000
```

### Deployment Platforms
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **AWS EC2**: Manual deployment with PM2

---

## 📞 Support

- 🐛 Report bugs in Issues
- 💬 Discuss in Discussions
- 📧 Contact: support@trackly.dev

---

**Built with ❤️ using Express, MongoDB & Node.js**
