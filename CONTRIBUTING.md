# Contributing to Trackly

Thank you for your interest in contributing to Trackly! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issues & Bug Reports](#issues--bug-reports)
- [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone. All contributors are expected to adhere to this code of conduct.

### Expected Behavior

- **Respect**: Treat all contributors with respect and dignity
- **Inclusivity**: Welcome diversity and different perspectives
- **Professionalism**: Maintain professional communication
- **Harassment-free**: No discrimination, harassment, or abuse

### Unacceptable Behavior

- Harassment or discrimination
- Hate speech or offensive language
- Personal attacks or insults
- Unwelcome sexual advances
- Publishing private information without consent

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Git
- GitHub account
- MongoDB (Atlas or local)

### Fork & Clone

1. **Fork the repository** on GitHub
2. **Clone your fork locally**:
```bash
git clone https://github.com/YOUR_USERNAME/trackly.git
cd trackly
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/original-owner/trackly.git
```

### Setup Development Environment

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

#### Frontend
```bash
cd ../client
npm install
npm run dev
```

### Verify Setup

1. Open `http://localhost:5173` in browser
2. Should load without errors
3. Try registering a test account
4. Verify dashboard loads

---

## 🔄 Development Workflow

### 1. Create Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions**:
- Features: `feature/add-feature-name`
- Bugfixes: `bugfix/fix-issue-name`
- Documentation: `docs/add-documentation`
- Performance: `perf/optimize-component`

### 2. Make Changes

Make your changes following the coding standards (see below).

### 3. Test Changes

```bash
# Frontend
cd client
npm run lint
npm run build

# Backend
cd backend
npm run dev
# Test endpoints manually
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: clear description of changes"
```

Follow [commit guidelines](#commit-guidelines) below.

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub and create a PR from your fork to main
- Follow PR template (see below)
- Link related issues
- Request reviewers

---

## 💻 Coding Standards

### JavaScript/JSX

#### General Rules
```javascript
// ✅ DO: Use ES6+ syntax
const handleClick = () => { /* ... */ };
const data = { name: 'John', age: 30 };

// ❌ DON'T: Use old syntax
var handleClick = function() { /* ... */ };
var data = { name: 'John', age: 30 };

// ✅ DO: Use async/await
const fetchData = async () => {
  try {
    const res = await api.get('/data');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// ❌ DON'T: Use .then() chains
api.get('/data').then(res => { /* ... */ });

// ✅ DO: Use arrow functions for callbacks
array.map(item => item.id);

// ❌ DON'T: Use function declarations for callbacks
array.map(function(item) { return item.id; });
```

#### Naming Conventions
```javascript
// ✅ Components: PascalCase
function UserProfile() { }
function ExpenseForm() { }

// ✅ Functions/variables: camelCase
const handleSubmit = () => { };
const totalAmount = 1000;

// ✅ Constants: UPPER_SNAKE_CASE
const API_TIMEOUT = 5000;
const MAX_RETRIES = 3;

// ✅ Private/internal: prefix with underscore
const _privateHelper = () => { };
const _internalState = {};
```

#### React Best Practices
```javascript
// ✅ DO: Functional components with hooks
function ExpenseList({ expenses, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// ❌ DON'T: Class components
class ExpenseList extends React.Component {
  // ...
}

// ✅ DO: Use hooks properly
useEffect(() => {
  fetchExpenses();
}, []);  // Dependency array

// ❌ DON'T: Missing dependencies
useEffect(() => {
  // This could cause issues
  fetchExpenses();
}, []);

// ✅ DO: Prop validation with JSDoc
/**
 * Displays expense list
 * @param {Array} expenses - List of expense objects
 * @param {Function} onDelete - Delete callback
 * @returns {JSX.Element}
 */
function ExpenseList({ expenses, onDelete }) { }

// ✅ DO: Memoize expensive components
const ExpenseByCategoryChart = React.memo(function Chart({ data }) {
  return <PieChart data={data} />;
});
```

### File Organization

```
// Component file structure
ExpenseForm.jsx
├── Imports
├── Constants (if any)
├── Helper functions (if small)
├── Main component
├── PropTypes/JSDoc
└── Export

// Model/Schema file structure
expense.model.js
├── Imports
├── Schema definition
├── Schema validation
├── Model export

// Controller file structure
expense.controller.js
├── Imports
├── Helper functions
├── Controller functions (one per CRUD operation)
└── Exports
```

### Comments & Documentation

```javascript
// ✅ DO: Comments explain WHY, not WHAT
// We need to delay the request by 100ms to avoid race conditions
setTimeout(() => fetchData(), 100);

// ❌ DON'T: Comments state the obvious
// Add 1 to count (this is obvious from code)
count += 1;

// ✅ DO: JSDoc for functions
/**
 * Calculates total expense for a period
 * @param {String} period - 'daily', 'monthly', or 'yearly'
 * @param {String} value - Date or year value
 * @returns {Promise<Number>} Total amount
 * @throws {Error} If period is invalid
 */
async function getTotalExpense(period, value) {
  // Implementation
}

// ✅ DO: Block comments for complex logic
/*
 * MongoDB aggregation pipeline explanation:
 * 1. Match documents for current user
 * 2. Group by category
 * 3. Sum amounts per category
 * 4. Sort by total descending
 */
const pipeline = [ /* ... */ ];
```

### Error Handling

```javascript
// ✅ DO: Proper error handling
try {
  const expense = await Expense.create(data);
  res.status(201).json({ message: 'Success', expense });
} catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({ message: 'Duplicate entry' });
  }
  res.status(500).json({ message: 'Server error' });
}

// ❌ DON'T: Silent failures
try {
  await saveData();
} catch (error) {
  // Silently fail
}

// ✅ DO: Meaningful error messages
throw new Error('Email already registered');

// ❌ DON'T: Generic errors
throw new Error('Error');
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Tests
- `chore`: Build, dependencies, etc.

### Scope

Component or module being changed:
- `auth`, `expense`, `task`, `dashboard`
- `ui`, `api`, `validation`
- `config`, `build`

### Examples

```bash
# Feature
git commit -m "feat(expense): add expense filtering by category"

# Bugfix
git commit -m "fix(auth): fix JWT token validation error"

# Documentation
git commit -m "docs: add API endpoint documentation"

# Performance
git commit -m "perf(dashboard): optimize aggregation pipeline"

# Refactor with body
git commit -m "refactor(expense): improve error handling

- Better error messages
- Add validation for negative amounts
- Separate error types"
```

---

## 🔀 Pull Request Process

### PR Title Format

Follow commit message format:
```
feat(scope): brief description
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
- [ ] Tested locally
- [ ] Tested on different browsers
- [ ] No console errors

## Checklist
- [ ] Code follows style guide
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Dependencies updated if needed

## Screenshots (if UI changes)
[Add screenshots]

## Additional Notes
[Any additional info]
```

### PR Review Checklist

Before requesting review, ensure:
- ✅ Code follows coding standards
- ✅ All tests pass
- ✅ No breaking changes
- ✅ Documentation is updated
- ✅ Commit messages are clear
- ✅ No merge conflicts

### Review Process

1. **Automated Checks**: Linter, tests run automatically
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address feedback comments
4. **Approval**: PR approved by maintainer
5. **Merge**: PR merged to main branch

---

## 🧪 Testing

### Running Tests

```bash
# Frontend
cd client
npm run lint  # Run ESLint

# Backend (when tests exist)
cd backend
npm test
```

### Writing Tests

When adding new features, include tests:

```javascript
// Example: Jest test
describe('ExpenseForm', () => {
  it('should display form when isOpen is true', () => {
    render(<ExpenseForm isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Add New Expense')).toBeInTheDocument();
  });

  it('should call onClose when cancel clicked', () => {
    const mockOnClose = jest.fn();
    render(<ExpenseForm isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
```

### Manual Testing Checklist

For all PRs:
- [ ] Feature works as described
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] API calls succeed
- [ ] Error states handled
- [ ] Notifications show correctly

---

## 📚 Documentation

### README Updates

Update relevant README when:
- Adding new features
- Changing API endpoints
- Modifying environment variables
- Updating project structure

### JSDoc Comments

Add JSDoc for all functions:

```javascript
/**
 * Short description
 * @param {Type} paramName - Description
 * @returns {Type} Description
 * @throws {ErrorType} Description
 * @example
 * const result = myFunction(param);
 */
function myFunction(paramName) {
  // Implementation
}
```

### API Documentation

Document new API endpoints in `backend/README.md`:

```markdown
#### Endpoint Name
\`\`\`http
METHOD /path?query=value
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

**Status**: 200 OK
**Response**: { example response }
```

---

## 🐛 Issues & Bug Reports

### Creating a Bug Report

Title: Clear, descriptive title
```
Login form not validating email correctly
```

Description:
```markdown
## Description
[Clear description of bug]

## Steps to Reproduce
1. Go to login page
2. Enter invalid email
3. Click submit

## Expected Behavior
Form shows validation error

## Actual Behavior
Form submits without error

## Environment
- Browser: Chrome 90
- OS: Windows 10
- Node: 16.0.0
```

### Issue Labels

- `bug`: Something isn't working
- `feature`: New feature request
- `enhancement`: Improvement to existing feature
- `documentation`: Documentation needed
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed

---

## 💡 Feature Requests

### Creating a Feature Request

Title: Clear, descriptive title
```
Add expense export to CSV
```

Description:
```markdown
## Description
Allow users to export their expenses as CSV file

## Use Case
Users want to analyze expenses in Excel

## Proposed Solution
Add "Export" button on expenses page

## Alternatives Considered
- PDF export
- Google Sheets integration

## Additional Context
Similar to Mint, Wave, etc.
```

---

## 🎯 Priority Areas for Contribution

### High Priority
- ✅ Bug fixes
- ✅ Test coverage
- ✅ Performance optimizations
- ✅ Documentation improvements
- ✅ Security issues

### Good for Beginners
- 📝 Documentation updates
- 🐛 Fixing labeled bugs
- 🎨 UI improvements
- 📱 Mobile responsiveness
- 🌙 Dark mode enhancements

### Advanced Topics
- 🚀 New features
- 📊 Analytics improvements
- 🔐 Security enhancements
- 🔌 API integrations
- 📱 Real-time features

---

## 🚀 Deployment

### Production Checklist

Before deploying, ensure:
- ✅ All tests pass
- ✅ No console errors
- ✅ Environment variables set
- ✅ Database backups taken
- ✅ API rate limiting active
- ✅ Error logging enabled
- ✅ Security headers set

---

## 📞 Getting Help

- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Chat**: Discord (if available)
- **Email**: support@trackly.dev

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

## 🙏 Thank You

Thank you for contributing to Trackly! Your efforts help make this project better for everyone.

**Happy coding!** 🚀
