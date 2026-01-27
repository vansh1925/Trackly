# 🎨 Trackly Frontend

Modern React 19 UI for personal expense and task tracking. Features dark mode, responsive design, interactive charts, and real-time updates.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [State Management](#state-management)
- [Styling](#styling)
- [Development](#development)

---

## 📦 Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Backend server running on localhost:5000

---

## 🔧 Installation

### 1. Navigate to Client Directory
```bash
cd client
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- react (19.2.0) - UI library
- react-router-dom (7.9.6) - Client routing
- tailwindcss (3.4.18) - Styling
- recharts (3.6.0) - Charts
- axios (1.13.2) - HTTP client
- react-hot-toast (2.6.0) - Notifications
- lucide-react (0.554.0) - Icons
- vite (7.2.4) - Build tool

---

## ⚙️ Environment Setup

### Create .env.local (Optional)
```bash
# Frontend runs on localhost:5173 by default
# Backend API defaults to http://localhost:5000/api
# Only create .env.local if you need to change these
```

### File: .env.local (Optional)
```env
# API Base URL (optional, defaults to http://localhost:5000/api)
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the App

### Development Mode
```bash
npm run dev
```

**Output**:
```
  VITE v7.2.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Production Build
```bash
npm run build
```

Creates optimized build in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
client/
├── src/
│   ├── api/
│   │   ├── axios.js              # Axios config with interceptors
│   │   ├── auth.api.js           # Authentication endpoints
│   │   ├── expense.api.js        # Expense endpoints
│   │   ├── task.api.js           # Task endpoints
│   │   ├── dashboard.api.js      # Dashboard endpoints
│   │   └── analytics.api.js      # Spending vs productivity analytics
│   ├── components/
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── Sidebar.jsx           # Mobile sidebar
│   │   ├── ExpenseForm.jsx       # Add/edit expense form
│   │   ├── ExpenseList.jsx       # Expenses table
│   │   ├── ExpenseItem.jsx       # Single expense row
│   │   ├── TaskCard.jsx          # Task item card
│   │   ├── TaskList.jsx          # Tasks container
│   │   ├── TaskForm.jsx          # Add/edit task form
│   │   ├── StatCard.jsx          # Dashboard stat widget
│   │   ├── ExpenseByCategoryChart.jsx  # Pie chart
│   │   ├── ExpenseTrendChart.jsx       # Area chart
│   │   ├── TaskStatusChart.jsx         # Bar chart
│   │   ├── AnalyticsChart.jsx          # Dual-axis line (expense vs productivity)
│   │   ├── InsightCard.jsx             # Insight severity cards
│   │   ├── Loading.jsx           # Spinner component
│   │   ├── Pagination.jsx        # Pagination controls
│   │   └── ProtectedRoute.jsx    # Route guard
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth state & provider
│   │   ├── useAuth.js            # useAuth hook
│   │   ├── ThemeContext.jsx      # Dark mode state & provider
│   │   └── useTheme.js           # useTheme hook
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Dashboard.jsx         # Dashboard page
│   │   ├── Expenses.jsx          # Expenses page
│   │   ├── Tasks.jsx             # Tasks page
│   │   └── Analytics.jsx         # Analytics page (spend vs productivity)
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── assets/
│       └── 41ba87ea...png        # Trackly logo
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## 🧩 Key Components

### Navbar.jsx
Top navigation with:
- Trackly logo and branding
- Navigation links (Dashboard, Expenses, Tasks, Analytics)
- Dark mode toggle
- User email display
- Logout button
- Mobile hamburger menu

**Props**: None (uses hooks)

---

### Analytics.jsx
Full analytics view combining API data, charts, and insights:
- Fetches 7-day spending/productivity correlation
- Displays averages, dual-axis trend chart, and insight cards
- Loading, error, and empty states with retry

**Props**: None (data fetched internally)

---

### ExpenseForm.jsx
Form for creating/editing expenses:
- Title input
- Amount input (with validation)
- Date picker
- Category dropdown
- Description textarea
- Submit & cancel buttons

**Props**:
```javascript
{
  isOpen: Boolean,           // Show/hide form
  onClose: Function,         // Close handler
  editingExpense: Object,    // If editing, expense data
  onSuccess: Function        // Callback after save
}
```

---

### ExpenseList.jsx
Table displaying expenses:
- Title, Amount, Category, Date, Description columns
- Edit & delete buttons per row
- Empty state message
- Loading state

**Props**:
```javascript
{
  expenses: Array,     // Expense items
  loading: Boolean,    // Loading state
  onEdit: Function,    // Edit handler
  onDelete: Function   // Delete handler
}
```

---

### TaskCard.jsx
Individual task item with:
- Title display
- Duration and date
- Completion checkbox
- Edit & delete buttons
- Strikethrough when completed

**Props**:
```javascript
{
  task: Object,              // Task data
  onEdit: Function,          // Edit handler
  onDelete: Function,        // Delete handler
  onStatusChange: Function   // Status toggle handler
}
```

---

### StatCard.jsx
Dashboard statistic widget:
- Icon
- Title
- Value
- Optional trend indicator

**Props**:
```javascript
{
  title: String,      // Stat title
  value: String,      // Stat value
  icon: Component,    // Icon component
  trend: String,      // 'up' or 'down' (optional)
  trendValue: String  // Trend percentage (optional)
}
```

---

### ExpenseByCategoryChart.jsx
Pie chart showing expenses breakdown by category:
- Interactive pie slices
- Legend
- Tooltip on hover
- Total calculation

**Props**:
```javascript
{
  data: Array  // [{ category, amount, count }, ...]
}
```

---

### ExpenseTrendChart.jsx
Area chart showing expense trends:
- Daily or monthly data
- Gradient fill
- Average calculation
- Responsive sizing

**Props**:
```javascript
{
  data: Array,        // [{ date/month, amount }, ...]
  title: String,      // Chart title
  subtitle: String    // Chart subtitle
}
```

---

### TaskStatusChart.jsx
Bar chart showing task completion:
- Completed vs Pending bars
- Completion rate progress bar
- Total count display

**Props**:
```javascript
{
  completed: Number,  // Completed tasks count
  pending: Number     // Pending tasks count
}
```

---

## 🔄 State Management

### Auth Context (`context/AuthContext.jsx`)

Manages user authentication state globally:

```javascript
// Values provided by AuthContext
{
  user: Object,         // Current user { _id, name, email }
  loading: Boolean,     // Loading state during auth check
  login: Function,      // (email, password) => Promise
  register: Function,   // (name, email, password) => Promise
  logout: Function      // () => void
}
```

**Usage**:
```javascript
const { user, loading, login } = useAuth();
```

---

### Theme Context (`context/ThemeContext.jsx`)

Manages dark mode state with localStorage persistence:

```javascript
// Values provided by ThemeContext
{
  darkMode: Boolean,        // Current theme
  toggleDarkMode: Function  // Toggle theme
}
```

**How it works**:
1. Reads `darkMode` from localStorage on init
2. Adds/removes `dark` class to `<html>` element
3. Persists preference to localStorage on change
4. All CSS uses Tailwind's `dark:` prefix

**Usage**:
```javascript
const { darkMode, toggleDarkMode } = useTheme();
```

---

## 🎨 Styling

### Tailwind CSS

Tailwind classes used throughout:
- Spacing: `p-4`, `mb-8`, `gap-2`
- Colors: `bg-slate-50`, `text-slate-900`, `dark:bg-slate-950`
- Responsive: `sm:`, `md:`, `lg:` prefixes
- Dark mode: `dark:` prefix for dark mode styles

### Dark Mode Implementation

1. **Config**: `tailwind.config.js` sets `darkMode: 'class'`
2. **Provider**: `ThemeContext` manages `dark` class on `<html>`
3. **Usage**: All components use `dark:` prefixed classes
4. **Persistence**: localStorage stores preference

Example:
```jsx
<div className="bg-white dark:bg-slate-900">
  Light mode: white background
  Dark mode: slate background
</div>
```

### Color Palette

**Light Mode**:
- Background: `slate-50`
- Text: `slate-900`
- Cards: `white`
- Borders: `slate-200`

**Dark Mode**:
- Background: `slate-950`
- Text: `slate-100`
- Cards: `slate-900`
- Borders: `slate-700`

---

## 🔌 API Integration

### Axios Setup (`api/axios.js`)

Configured with:
- Base URL: `http://localhost:5000/api`
- Request interceptor: Adds JWT token to headers
- Response interceptor: Handles rate limiting warnings
- Error handling: Global error management

**Features**:
- Auto-attach JWT token from localStorage
- Rate limit warning when ≤3 requests remaining
- 429 error handling with user-friendly message

---

### API Modules

#### `api/auth.api.js`
```javascript
// Authentication endpoints
register(name, email, password)
login(email, password)
```

#### `api/expense.api.js`
```javascript
// Expense endpoints
addExpense(data)
getExpenses(params)        // { page, limit }
getExpense(id)
updateExpense(id, data)
deleteExpense(id)
getTotalExpense(params)
```

#### `api/task.api.js`
```javascript
// Task endpoints
addTask(data)
getAllTasks()
getTask(id)
updateTask(id, data)
deleteTask(id)
toggleTaskStatus(id)
getTotalProductivity()
getTaskCompletedCount()
```

#### `api/dashboard.api.js`
```javascript
// Dashboard endpoint
getDashboard()
```

---

## 🎯 Page Flows

### Login Page
1. User enters email & password
2. Clicks "Sign in"
3. API call: `POST /users/login`
4. Token stored in localStorage
5. Redirected to `/dashboard`

### Register Page
1. User enters name, email, password, confirm password
2. Frontend validation:
   - Email format check
   - Password strength check (8+ chars, upper, lower, number, special)
   - Passwords match
3. API call: `POST /users/register`
4. Token stored in localStorage
5. Redirected to `/dashboard`

### Dashboard Page
1. Fetch dashboard data: `GET /dashboard`
2. Display 4 stat cards:
   - Today's expense
   - This month's expense
   - Productivity (minutes)
   - Completed tasks
3. Display 4 charts:
   - Expenses by category (pie)
   - Task status (bar)
   - Daily expenses (area)
   - Monthly expenses (area)

### Expenses Page
1. Display list of user's expenses (paginated)
2. Show "Add Expense" button
3. User can:
   - Create new expense
   - Edit existing expense
   - Delete expense
   - Navigate pages

### Tasks Page
1. Display list of user's tasks
2. Show "Add Task" button
3. User can:
   - Create new task
   - Edit existing task
   - Toggle task completion
   - Delete task

---

## 🔒 Protected Routes

All authenticated pages are wrapped with `ProtectedRoute`:

```javascript
<ProtectedRoute>
  <Navbar />
  <Dashboard />
</ProtectedRoute>
```

**Behavior**:
- If user is loading: Show loading spinner
- If no user & not loading: Redirect to `/login`
- If user exists: Render children

---

## 🚀 Development

### Code Structure Best Practices

#### Components
- One component per file
- Descriptive names (ExpenseForm.jsx, not Form.jsx)
- Props documentation in JSDoc
- Use hooks, not class components

#### State Management
- Use React Context for global state
- Use useState for component-level state
- Use useCallback for memoization
- Avoid prop drilling

#### API Calls
- All calls in dedicated `api/` folder
- Use async/await
- Proper error handling
- Always try/catch

### Debugging

#### Chrome DevTools
- React DevTools: Inspect components & state
- Network tab: Monitor API calls
- Console: Check for errors

#### Common Issues

**"Cannot read property of undefined"**
- Usually from API not returning expected structure
- Add optional chaining: `data?.user?.name`

**Dark mode not working**
- Check if `ThemeProvider` wraps app
- Verify `dark` class is on `<html>` element
- Check tailwind.config.js has `darkMode: 'class'`

**API calls not working**
- Check backend is running
- Check VITE_API_URL in .env.local
- Check network tab for 401/403 errors
- Verify JWT token is in localStorage

---

## 📦 Building for Production

### Build Command
```bash
npm run build
```

**Output**:
- Minified bundles in `dist/` folder
- Sourcemaps for debugging
- HTML, CSS, JS optimized

### Deployment

Deploy the `dist/` folder to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload to S3 + CloudFront

### Environment for Production

Update `.env.local` with production API:
```env
VITE_API_URL=https://api.trackly.dev
```

---

## 🧪 Testing

Currently no automated tests. Consider adding:

```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

---

## 📊 Performance

### Optimizations Applied
- Code splitting with React Router
- Image lazy loading
- Component memoization (useCallback)
- Optimized Recharts (responsive containers)

### Further Optimizations
- Add React.memo to expensive components
- Implement virtual scrolling for large lists
- Cache API responses
- Lazy load pages with React.lazy

---

## 🤝 Contributing

### Setup Development Environment
1. Fork repository
2. Create feature branch: `git checkout -b feature/name`
3. Make changes
4. Test thoroughly
5. Commit: `git commit -m "feat: description"`
6. Push & create pull request

### Code Standards
- Use ESLint (run `npm run lint`)
- Follow component structure
- Add comments for complex logic
- Use descriptive variable names

---

## 📞 Support

- 🐛 Report bugs in GitHub Issues
- 💬 Discuss in GitHub Discussions
- 📧 Email: support@trackly.dev

---

**Built with ❤️ using React, Tailwind & Vite**
