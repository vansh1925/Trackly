# Trackly API Quick Reference

**Base URL:** `http://localhost:5000/api`

**Authentication:** All endpoints (except `/users/register` and `/users/login`) require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 📋 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/register` | Register new user |
| `POST` | `/users/login` | Login user |
| `GET` | `/users/me` | Get current user |

---

## 💰 Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/expenses/add` | Create expense |
| `GET` | `/expenses/getall` | Get all expenses (paginated) |
| `GET` | `/expenses/get/:id` | Get single expense |
| `PUT` | `/expenses/update/:id` | Update expense |
| `DELETE` | `/expenses/delete/:id` | Delete expense |
| `GET` | `/expenses/total` | Get total expenses for period |

---

## ✅ Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/tasks/add` | Create task |
| `GET` | `/tasks/getall` | Get all tasks (paginated) |
| `GET` | `/tasks/get/:id` | Get single task |
| `PUT` | `/tasks/update/:id` | Update task |
| `PUT` | `/tasks/toggle/:id` | Toggle task completion |
| `DELETE` | `/tasks/delete/:id` | Delete task |

---

## 📊 Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard` | Get dashboard analytics |

---

## 🔑 Authentication Endpoints

### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (201)**:
```json
{
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200)**:
```json
{
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { ... }
  }
}
```

---

### Get Current User
```http
GET /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200)**:
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

## 💰 Expense Endpoints

### Create Expense
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

**Categories**: Food, Transport, Entertainment, Utilities, Shopping, Health, Other

---

### Get All Expenses
```http
GET /expenses/getall?page=1&limit=10
Authorization: Bearer <token>
```

**Query Params**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

---

### Get Single Expense
```http
GET /expenses/get/607f1f77bcf86cd799439012
Authorization: Bearer <token>
```

---

### Update Expense
```http
PUT /expenses/update/607f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Grocery",
  "amount": 3000,
  "date": "2026-01-20",
  "category": "Food"
}
```

---

### Delete Expense
```http
DELETE /expenses/delete/607f1f77bcf86cd799439012
Authorization: Bearer <token>
```

---

### Get Total Expenses
```http
GET /expenses/total?period=monthly&value=2026-01
Authorization: Bearer <token>
```

**Period Options**:
- `daily` + `2026-01-20`
- `monthly` + `2026-01`
- `yearly` + `2026`

---

## ✅ Task Endpoints

### Create Task
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

---

### Get All Tasks
```http
GET /tasks/getall?page=1&limit=10
Authorization: Bearer <token>
```

---

### Get Single Task
```http
GET /tasks/get/607f1f77bcf86cd799439013
Authorization: Bearer <token>
```

---

### Update Task
```http
PUT /tasks/update/607f1f77bcf86cd799439013
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task",
  "duration": 150,
  "date": "2026-01-20"
}
```

---

### Toggle Task Status
```http
PUT /tasks/toggle/607f1f77bcf86cd799439013
Authorization: Bearer <token>
```

---

### Delete Task
```http
DELETE /tasks/delete/607f1f77bcf86cd799439013
Authorization: Bearer <token>
```

---

## 📊 Dashboard Endpoint

### Get Dashboard Analytics
```http
GET /dashboard
Authorization: Bearer <token>
```

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
      { "category": "Food", "amount": 12000, "count": 20 }
    ],
    "dailyTrend": [
      { "date": "2026-01-14", "day": "Mon", "amount": 3000 }
    ],
    "monthlyTrend": [
      { "month": "Aug 2025", "amount": 42000 }
    ]
  }
}
```

---

## 🔒 Rate Limiting

**Auth Endpoints** (login/register): 10 requests per 10 minutes
**Other Endpoints**: 20 requests per 15 minutes

**Response Headers**:
```
RateLimit-Limit: 20
RateLimit-Remaining: 19
RateLimit-Reset: 1642683900
```

**429 Response**:
```json
{
  "message": "Too many requests. Try again later."
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "message": "Expense not found"
}
```

### 429 Too Many Requests
```json
{
  "message": "Too many requests. Try again later."
}
```

### 500 Server Error
```json
{
  "message": "Internal Server Error"
}
```

---

## 📝 Notes

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&* etc)

### Token Expiry
- JWT tokens expire in 7 days
- After expiry, user must login again

### Data Ownership
- Users can only access their own data
- API enforces user isolation via userId

### Pagination
- Default page size: 10 items
- Maximum page size: 100 items
- Pages are 1-indexed (start from 1)

---

## 🔗 Postman Collection

Import the Postman collection from `Trackly_API_Postman.json` for ready-to-use requests.

### Setup Postman Environment

1. Create new environment
2. Add variables:
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: (leave empty, fill after login)
3. Login to get token
4. Copy token from response
5. Paste in `token` variable

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

### Get Dashboard (with token)
```bash
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Expense
```bash
curl -X POST http://localhost:5000/api/expenses/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Grocery",
    "amount": 2500,
    "date": "2026-01-20",
    "category": "Food"
  }'
```

---

## 📞 Support

- 📧 Email: support@trackly.dev
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Last Updated:** January 2026
