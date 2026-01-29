# 💰 Trackly - Personal Finance & Productivity Analytics

**Track money. Track time. Stay ahead.**

A modern, full-stack expense and task tracking application built with React, Express, and MongoDB. Features real-time analytics, beautiful dark mode, and enterprise-grade security.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![React](https://img.shields.io/badge/react-19.2.0-blue)
![Express](https://img.shields.io/badge/express-5.2.1-black)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Screenshots](#-screenshots)
- [Demo](#-demo)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Performance & Production Notes](#-performance--production-notes)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 💳 Expense Management
- ✅ Create, read, update, delete expenses
- ✅ Categorize expenses (Food, Transport, Entertainment, etc.)
- ✅ Add detailed descriptions and notes
- ✅ Pagination (10 items per page)
- ✅ Real-time expense tracking

### ✅ Task Management
- ✅ Create, read, update, delete tasks
- ✅ Toggle task completion status
- ✅ Track task duration in minutes
- ✅ Date-based organization
- ✅ Productivity metrics

### 📊 Analytics & Insights (Rule-Based)
- ✅ Expense–productivity correlation using simple, transparent thresholds (4-tier severity)
- ✅ Rule-based insight generation from weekly averages 
- ✅ Dual-axis trend analysis with interactive Recharts visualizations
- ✅ Comparative analysis of high-spend vs normal days
- ✅ Clear user-facing messages for insufficient data or low variance
- ✅ MongoDB aggregation pipelines optimized for common queries

### 🧮 Correlation Rules
- **PRODUCTIVITY_DROP**: High spending correlates with lower productivity (30%+/20%+/15%+ tiers)
- **PRODUCTIVITY_GAIN**: Higher productivity on high-spend days (≥20%)
- **NO_STRONG_CORRELATION**: No meaningful relationship detected
- **INSUFFICIENT_DATA**: Not enough days to evaluate
- **INSUFFICIENT_VARIANCE**: Spending patterns too uniform to compare

### 🎨 User Experience
- ✅ Dark mode (persistent across sessions)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications for user feedback
- ✅ Loading states & skeletons
- ✅ Professional UI with Tailwind CSS
- ✅ Professional branding with custom logo

### 🔒 Security & Performance
- ✅ JWT authentication (7-day expiry)
- ✅ Password hashing (bcryptjs, 10 salt rounds)
- ✅ Rate limiting (10 req/10min auth, 20 req/15min API)
- ✅ Helmet security headers (15+ headers)
- ✅ CORS protection
- ✅ Input validation & sanitization

---

## 🛠 Tech Stack

### Backend - Analytics & Intelligence
```
Express 5.2.1                - Web framework
MongoDB Aggregation           - Advanced analytics pipelines
Mongoose 9.1.1               - ODM with aggregation support
JWT (jsonwebtoken 9.0.3)     - Authentication
bcryptjs 3.0.3               - Password hashing
Helmet 8.1.0                 - Security headers (15+ headers)
express-rate-limit 8.2.1     - Rate limiting with thresholds
CORS 2.8.5                   - Cross-origin requests
Dotenv 17.2.3                - Environment config
```

### Frontend - Data Visualization
```
React 19.2.0           - UI library
React Router 7.9.6     - Client-side routing
Tailwind CSS 3.4.18    - Styling & dark mode
Recharts 3.6.0         - Advanced data visualization (dual-axis charts)
Axios 1.13.2           - HTTP client with interceptors
React Hot Toast 2.6.0  - Notifications
Lucide React 0.554.0   - Icon library
Vite 7.2.4             - Build tool
```

### Database
```
MongoDB 5.0+  - NoSQL database
```

---

## 📊 Analytics Engine (Rule-Based)

### Expense-Productivity Correlation Analysis
Trackly includes a deterministic analytics module that computes insights from your data using clear, rule-based thresholds:

#### 🔬 Statistical Analysis Process
1. **Data Aggregation**: Collects a 7-day window of expenses and completed tasks
2. **Day Classification**: Categorizes days as "high-spend" vs "normal" by comparing to average
3. **Correlation Check**: Computes productivity averages on both sets and compares
4. **Thresholds**: Applies 4-tier severity system with configurable percentage cutoffs:
   - **HIGH_PRODUCTIVITY_DROP**: 30%+ reduction (Critical insight)
   - **MEDIUM_PRODUCTIVITY_DROP**: 20-29% reduction (Warning insight) 
   - **LOW_PRODUCTIVITY_DROP**: 15-19% reduction (Awareness insight)
   - **PRODUCTIVITY_GAIN**: 20%+ improvement (Positive insight)

#### 💡 Insight Generation (Rule-Based)
The system generates straightforward, rule-based messages like:
- *"High spending days reduce productivity by 34%"* (Data-driven percentage)
- *"You are more productive on higher spending days"* (Positive correlation)
- *"Not enough variation in spending patterns to detect trends"* (Statistical guidance)

#### 📈 Visualizations
- **Dual-Axis Line Chart**: Expense trends vs Productivity trends with independent Y-axes
- **Interactive Tooltips**: Contextual data points with formatted currency and time
- **Correlation Indicators**: Visual markers for high-spend and low-productivity days
- **Statistical Averages**: Real-time calculation of 7-day rolling averages

#### 🎯 Demo Data
Includes a sample seeding script that creates realistic patterns:
- **High-spend days** with configurable multipliers (default 2.5x)
- **Zero-productivity days** to create meaningful variance
- **Realistic task durations** and expense distributions
- **Correlation patterns** for testing analytics accuracy

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm or yarn
- MongoDB (local or Atlas cloud)
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/trackly.git
cd trackly
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env and add:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
# JWT_SECRET=your_super_secret_jwt_key_min_64_characters_cryptographically_secure
# PORT=5000



# Start the server
npm run dev
```

The backend will start on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env.local file (optional, defaults to localhost:5000)
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

#### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

**Demo Credentials:**
- Email: `demo1@gmail.com`
- Password: `Easypass@123`



## 🖼️ Screenshots

> Replace the image paths below with your actual screenshots once captured.

![Login](docs/screenshots/login.png)
![Dashboard](docs/screenshots/dashboard.png)
![Analytics](docs/screenshots/analytics.png)

---

## 🎥 Demo

- Live Frontend: https://trackly-zeta.vercel.app/
- API Base URL: https://trackly-6yji.onrender.com/api
- Postman Collection: Trackly_API_Postman.json (at repo root)



---

## 📁 Project Structure

```
trackly/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── analytics.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── expense.controller.js
│   │   │   ├── task.controller.js
│   │   │   └── user.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── rateLimiter.middleware.js
│   │   ├── models/
│   │   │   ├── expense.model.js
│   │   │   ├── task.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── analytics.route.js
│   │   │   ├── dashboard.route.js
│   │   │   ├── expense.route.js
│   │   │   ├── task.route.js
│   │   │   └── user.route.js
│   │   └── server.js
│   ├── scripts/
│   │   └── seedSampleData.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── analytics.api.js
│   │   │   ├── axios.js
│   │   │   ├── dashboard.api.js
│   │   │   ├── expense.api.js
│   │   │   └── task.api.js
│   │   ├── components/
│   │   │   ├── AnalyticsChart.jsx
│   │   │   ├── ExpenseByCategoryChart.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseTrendChart.jsx
│   │   │   ├── InsightCard.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   ├── useAuth.js
│   │   │   └── useTheme.js
│   │   ├── pages/
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Tasks.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
│
├── Trackly_API_Postman.json
├── README.md
└── DEPLOYMENT.md
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=AppName

# JWT Secret (min 64 characters, cryptographically secure)
JWT_SECRET=your_super_secret_jwt_key_with_64_chars_minimum_for_security

# Server Port
PORT=5000
```

**Getting MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Copy connection string
4. Replace `<username>`, `<password>`, and `<appName>`

### Frontend Environment Variables

Create a `.env.local` file in the `client` directory (optional):

```env
# API Base URL (defaults to http://localhost:5000/api)
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Documentation

### Authentication

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-20T10:00:00Z"
    }
  }
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200):**
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

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "User data fetched successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### Expenses

#### Create Expense
```http
POST /api/expenses/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 2500,
  "date": "2026-01-20",
  "category": "Food",
  "description": "Weekly groceries at supermarket"
}
```

**Response (201):**
```json
{
  "message": "Expense added successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Grocery Shopping",
    "amount": 2500,
    "date": "2026-01-20T00:00:00Z",
    "category": "Food",
    "description": "Weekly groceries at supermarket",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-01-20T10:30:00Z"
  }
}
```

#### Get All Expenses (Paginated)
```http
GET /api/expenses/getall?page=1&limit=10
Authorization: Bearer <token>
```

**Response (200):**
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
      "description": "Weekly groceries"
    }
  ],
  "page": 1,
  "totalpages": 5,
  "totalExpenses": 50
}
```

#### Get Single Expense
```http
GET /api/expenses/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Expense fetched successfully",
  "expense": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Grocery Shopping",
    "amount": 2500,
    "date": "2026-01-20T00:00:00Z",
    "category": "Food"
  }
}
```

#### Update Expense
```http
PUT /api/expenses/:id
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

**Response (200):**
```json
{
  "message": "Expense updated successfully",
  "expense": { ... }
}
```

#### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Expense deleted successfully"
}
```

#### Get Total Expenses
```http
GET /api/expenses/total?period=monthly&value=2026-01
Authorization: Bearer <token>
```

**Period Options:**
- `daily`: value = "2026-01-20"
- `monthly`: value = "2026-01"
- `yearly`: value = "2026"

**Response (200):**
```json
{
  "message": "Total expense fetched successfully",
  "totalAmount": 15000
}
```

---

### Tasks

#### Create Task
```http
POST /api/tasks/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project report",
  "duration": 120,
  "date": "2026-01-20"
}
```

**Response (201):**
```json
{
  "message": "Task added successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Complete project report",
    "duration": 120,
    "date": "2026-01-20T00:00:00Z",
    "completed": false,
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-01-20T10:30:00Z"
  }
}
```

#### Get All Tasks (Paginated)
```http
GET /api/tasks/getall?page=1&limit=10
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Tasks fetched successfully",
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Complete project report",
      "duration": 120,
      "date": "2026-01-20T00:00:00Z",
      "completed": false
    }
  ],
  "page": 1,
  "totalpages": 3,
  "totaltasks": 25
}
```

#### Get Single Task
```http
GET /api/tasks/get/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Task fetched successfully",
  "task": { ... }
}
```

#### Update Task
```http
PUT /api/tasks/update/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task title",
  "duration": 150,
  "date": "2026-01-20"
}
```

**Response (200):**
```json
{
  "message": "Task updated successfully",
  "updatedtask": { ... }
}
```

#### Toggle Task Status
```http
PUT /api/tasks/toggle/:id
Authorization: Bearer <token>
```

**Response (200):**
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

#### Delete Task
```http
DELETE /api/tasks/delete/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

### Dashboard & Analytics

#### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Bearer <token>
```

#### Get Advanced Analytics & Correlation Insights
```http
GET /api/analytics
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Analytics data fetched successfully",
  "range": "last_7_days",
  "data": [
    {
      "date": "2026-01-20",
      "expense": 45.50,
      "productivity": 180,
      "isHighSpend": true,
      "isLowProductivity": false
    }
  ],
  "averages": {
    "averageExpense": 42.30,
    "averageProductivity": 165
  },
  "insights": [
    {
      "type": "PRODUCTIVITY_DROP",
      "severity": "high", 
      "value": 34,
      "message": "High spending days reduce productivity by 34%"
    }
  ]
}
```

#### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Bearer <token>
```

**Response (200):**
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
      }
    ],
    "dailyTrend": [
      {
        "date": "2026-01-14",
        "day": "Mon",
        "amount": 3000
      }
    ],
    "monthlyTrend": [
      {
        "month": "Jan 2026",
        "amount": 45000
      }
    ]
  }
}
```

---

## ⚡ Performance & Production Notes

- Parallelized dashboard queries: Aggregations run concurrently via `Promise.all()` in `backend/src/controllers/dashboard.controller.js`, reducing total latency to roughly the slowest query.
- MongoDB indexes: Added indexes for common filters to speed up reads and aggregations:
  - Expenses: `(userId, date)`, `(userId, category)` in `backend/src/models/expense.model.js`.
  - Tasks: `(userId, date)`, `(userId, completed)` in `backend/src/models/task.model.js`.
- Faster, clearer UX on slow networks: Axios `timeout: 10000` in `client/src/api/axios.js` avoids indefinite spinners and surfaces a retry path. `Login.jsx` uses a local submitting state for instant feedback.
- Cleaner analytics route: `GET /api/analytics` (no redundant path segment), aligned across backend and client.
- Server hardening in `backend/src/server.js`:
  - Disabled `x-powered-by`, set `trust proxy` in production for accurate client IPs behind CDNs.
  - Consistent JSON 404 and centralized error handler for structured responses.
  - Graceful shutdown on `SIGINT`/`SIGTERM` closes HTTP and MongoDB cleanly.

---

## 🔒 Security

### Security Features Implemented

#### 1. Authentication & Authorization
- ✅ JWT-based authentication with 7-day expiry
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Protected routes via authentication middleware
- ✅ User isolation (users can only access their own data)

#### 2. Rate Limiting
- ✅ **Authentication endpoints** (login/register): 10 requests per 10 minutes per IP
- ✅ **API endpoints**: 20 requests per 15 minutes per IP
- ✅ Returns `429 Too Many Requests` when exceeded
- ✅ Frontend warning when approaching limits

#### 3. HTTP Security Headers (Helmet.js)
```
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000
- Content-Security-Policy
- And 10+ more security headers
```

#### 4. Input Validation & Sanitization
- ✅ Email format validation
- ✅ Password strength requirements:
  - Minimum 8 characters
  - Uppercase letter required
  - Lowercase letter required
  - Number required
  - Special character required
- ✅ Input trimming & length limits (max 500 chars)
- ✅ Type validation for all inputs

#### 5. CORS Protection
```javascript
// Only allows requests from:
// - http://localhost:5173
// - http://localhost:5174
```

#### 6. Data Privacy
- ✅ Passwords never returned in API responses
- ✅ Password hashed before database storage
- ✅ User data segregated by userId
- ✅ Tokens never logged

### Best Practices for Production

#### Before Deploying:
1. **Change JWT_SECRET** to a strong, random 64+ character string
2. **Update MONGO_URI** to production database
3. **Add HTTPS** (redirect HTTP → HTTPS)
4. **Set CORS origins** to your domain only
5. **Enable MongoDB authentication** and IP whitelisting
6. **Use environment variables** for all secrets
7. **Set NODE_ENV=production**
8. **Enable API rate limiting** per user (not just IP)

#### Environment Setup
```bash
# Production .env
NODE_ENV=production
MONGO_URI=mongodb+srv://prod_user:prod_pass@prod-cluster.mongodb.net/
JWT_SECRET=very_long_cryptographically_secure_random_string_here_min_64_chars
PORT=5000
```

---

## 🚦 Advanced Rate Limiting & Security

The API implements sophisticated rate limiting with multiple tiers:

### 🔐 Authentication Rate Limiter
- **Endpoints**: POST `/api/users/login`, POST `/api/users/register`
- **Limit**: 10 requests per 10 minutes per IP
- **Strategy**: Prevents brute force attacks on authentication
- **Response**: 429 Too Many Requests with retry headers

### 🛡️ API Rate Limiter  
- **Endpoints**: GET `/api/dashboard`, `/api/analytics/analytics` (all protected routes)
- **Limit**: 20 requests per 15 minutes per IP
- **Strategy**: Protects expensive database aggregation queries
- **Response**: 429 Too Many Requests

### 📊 Rate Limiting Implementation
```javascript
// Authentication endpoints (higher security)
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: "Too many authentication attempts" }
});

// API endpoints (balanced protection)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes  
  max: 20, // limit each IP to 20 requests per windowMs
  message: { message: "Too many API requests" }
});
```

### Headers Included in Responses
```
RateLimit-Limit: 20
RateLimit-Remaining: 19
RateLimit-Reset: 1642683900
```

---

## 📊 Analytics & Intelligence

Trackly provides two distinct analytical interfaces:

### 🏠 Dashboard Page - Overview & Trends
- **Real-time Statistics**: Today's expenses, monthly totals, productivity hours, task completion
- **Visual Trends**: Category breakdowns (pie chart), daily/monthly expense trends (area charts)
- **Task Analytics**: Completion rate visualization (bar chart)
- **Quick Insights**: At-a-glance financial and productivity metrics

### 🧠 Analytics Page - Advanced Correlation Intelligence
- **Behavioral Analysis**: 7-day expense vs productivity correlation with statistical significance
- **Dynamic Insights**: AI-generated recommendations based on spending patterns
- **Dual-Axis Visualization**: Interactive line chart showing expense and productivity trends
- **Statistical Averages**: Rolling averages with variance analysis
- **Pattern Recognition**: Automatic detection of high-spend/low-productivity relationships

### 🔧 Analytics Implementation
Uses MongoDB aggregation pipelines for:
- **Expense Aggregation**: Daily totals grouped by date with user filtering
- **Productivity Calculation**: Sum of completed task durations per day
- **Statistical Analysis**: Variance calculation and threshold-based classification
- **Correlation Detection**: Mathematical relationship analysis between spending and productivity

### 📈 Insight Generation Logic
```javascript
// Example correlation calculation
const productivityDropPercentage = 
  ((avgProductivityNormal - avgProductivityHighSpend) / avgProductivityNormal) * 100;

if (productivityDropPercentage >= 30) {
  generateInsight("HIGH", "High spending reduces productivity by X%");
}
```
- Daily trend analysis
- Monthly trend analysis
- Task status counting
- Productivity calculation

---

## 🎭 Intelligent Demo Data System

Trackly includes a sophisticated data seeding system that creates realistic expense-productivity patterns for meaningful analytics testing:

### 🧬 Pattern Generation
```bash
cd backend
node scripts/seedSampleData.js <userId> [days]
```

### 🎯 Smart Correlation Patterns
- **High-Spend Days**: Configurable multiplier (default 2.5x normal expenses)
- **Zero-Productivity Days**: Creates days with no completed tasks
- **Variance Generation**: Ensures statistical significance for correlation analysis
- **Realistic Distributions**: Task durations (20-180 min), expense amounts ($10-80)

### ⚙️ Seeding Configuration
```bash
# Environment variables for realistic data patterns
SEED_DAYS=14                    # Number of days to generate
SEED_HIGH_SPEND_DAYS=3          # Days with elevated spending
SEED_HIGH_SPEND_MULTIPLIER=2.5  # Spending increase multiplier
SEED_ZERO_PROD_DAYS=2           # Days with zero productivity
SEED_EXP_MIN=1                  # Min expenses per day
SEED_EXP_MAX=3                  # Max expenses per day
```

### 📊 Generated Insights
The seeded data creates realistic scenarios that demonstrate:
- Negative correlation between high spending and productivity
- Statistical variance sufficient for meaningful analysis
- Edge cases for testing insight generation algorithms
- Realistic user behavior patterns for portfolio demonstration

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Fork & Clone
```bash
git clone https://github.com/yourusername/trackly.git
cd trackly
```

### Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### Make Changes & Commit
```bash
git add .
git commit -m "feat: add your feature"
```

### Push & Create Pull Request
```bash
git push origin feature/your-feature-name
```

### PR Guidelines
- Clear description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure code follows project style

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Check MongoDB connection
# Verify MONGO_URI in .env
# Test connection: mongo "your_connection_string"
```

### Frontend shows blank page
```bash
# Check if backend is running
curl http://localhost:5000/api/users/me

# Clear cache and rebuild
cd client
rm -rf node_modules dist .vite
npm install
npm run dev
```

### Rate limiting errors
```
# If getting 429 errors frequently, check:
# - Are you making requests from different IPs?
# - Is the rate limit reset time correct?
# - Check RateLimit-Reset header for reset time
```

### Login not working
```
# Ensure:
# 1. Backend is running (npm run dev)
# 2. MongoDB is connected (check server logs)
# 3. Password meets requirements (8+ chars, upper, lower, number, special)
# 4. Email is valid format
```

---

## 📞 Support

Need help? 
- 📧 Email: support@trackly.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/trackly/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/trackly/discussions)

---

## 🎭 Intelligent Demo Data System

Trackly includes a sophisticated data seeding system that creates realistic expense-productivity patterns for meaningful analytics testing:

### 🧬 Pattern Generation
```bash
cd backend
node scripts/seedSampleData.js <userId> [days]
```

### 🎯 Smart Correlation Patterns
- **High-Spend Days**: Configurable multiplier (default 2.5x normal expenses)
- **Zero-Productivity Days**: Creates days with no completed tasks
- **Variance Generation**: Ensures statistical significance for correlation analysis
- **Realistic Distributions**: Task durations (20-180 min), expense amounts ($10-80)

### ⚙️ Seeding Configuration
```bash
# Environment variables for realistic data patterns
SEED_DAYS=14                    # Number of days to generate
SEED_HIGH_SPEND_DAYS=3          # Days with elevated spending
SEED_HIGH_SPEND_MULTIPLIER=2.5  # Spending increase multiplier
SEED_ZERO_PROD_DAYS=2           # Days with zero productivity
SEED_EXP_MIN=1                  # Min expenses per day
SEED_EXP_MAX=3                  # Max expenses per day
```

### 📊 Generated Insights
The seeded data creates realistic scenarios that demonstrate:
- Negative correlation between high spending and productivity
- Statistical variance sufficient for meaningful analysis
- Edge cases for testing insight generation algorithms
- Realistic user behavior patterns for portfolio demonstration
- [ ] Real-time collaboration with WebSocket
- [ ] AI-powered budget recommendations
- [ ] Receipt OCR scanning
- [ ] Bill reminders & recurring transactions
- [ ] Investment portfolio tracking
- [ ] Export reports (PDF, CSV)
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Bank API integrations

---

**Made with ❤️ by Vansh Puri**
