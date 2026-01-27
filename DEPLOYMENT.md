# 🚀 Trackly Deployment Guide

Complete guide for deploying Trackly to production environments.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Security Hardening](#security-hardening)
- [Monitoring & Logging](#monitoring--logging)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

### Backend
- [ ] All tests pass: `npm test`
- [ ] No console errors: `npm run dev`
- [ ] Linting passes: `npm run lint`
- [ ] Environment variables configured
- [ ] MongoDB Atlas cluster created
- [ ] JWT_SECRET is 64+ characters
- [ ] CORS origins updated to production domain
- [ ] Rate limiting configured appropriately
- [ ] Error logging enabled
- [ ] Backups configured

### Frontend
- [ ] Build succeeds: `npm run build`
- [ ] No build warnings
- [ ] All routes tested
- [ ] API URL points to production backend
- [ ] Dark mode works
- [ ] Responsive design verified
- [ ] Error pages configured
- [ ] Analytics/tracking added (optional)

---

## 🖥️ Backend Deployment

### Option 1: Heroku (Easiest for Beginners)

#### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

#### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create Heroku App**
```bash
cd backend
heroku create trackly-api
```

3. **Configure Environment Variables**
```bash
heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
heroku config:set JWT_SECRET=your_64_character_secure_random_string
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
```

4. **Deploy**
```bash
git push heroku main
```

5. **View Logs**
```bash
heroku logs --tail
```

**Heroku URL**: `https://trackly-api.herokuapp.com`

---

### Option 2: Railway

#### Steps

1. **Connect GitHub Repository**
- Go to https://railway.app
- Click "Deploy from GitHub"
- Select trackly repository
- Select backend directory

2. **Configure Environment Variables**
- Add variables in Railway dashboard
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: 64+ character secret
- `NODE_ENV`: production
- `PORT`: 5000

3. **Deploy**
- Railway auto-deploys on git push

---

### Option 3: Render

#### Steps

1. **Create Web Service**
- Go to https://render.com
- Click "New +"
- Select "Web Service"
- Connect GitHub repo

2. **Configure**
```
Name: trackly-api
Environment: Node
Build Command: npm install
Start Command: npm start
```

3. **Add Environment Variables**
- Dashboard → Environment
- Add all required variables

4. **Deploy**
- Render auto-deploys

---

### Option 4: AWS EC2 (Advanced)

#### Prerequisites
- AWS account
- EC2 instance running Node.js
- PM2 installed globally

#### Steps

1. **SSH into Instance**
```bash
ssh -i "your-key.pem" ec2-user@your-instance-ip
```

2. **Clone Repository**
```bash
git clone https://github.com/yourusername/trackly.git
cd trackly/backend
```

3. **Install Dependencies**
```bash
npm install
```

4. **Setup Environment Variables**
```bash
cp .env.example .env
nano .env  # Edit with production values
```

5. **Start with PM2**
```bash
npm install -g pm2
pm2 start src/server.js --name "trackly-api"
pm2 startup
pm2 save
```

6. **Setup Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name api.trackly.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

#### Steps

1. **Connect GitHub**
- Go to https://vercel.com
- Click "Import Project"
- Select trackly repository

2. **Configure**
- Framework: Vite
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: `dist`

3. **Add Environment Variables**
```
VITE_API_URL=https://api.trackly.com
```

4. **Deploy**
- Vercel auto-deploys on push

---

### Option 2: Netlify

#### Steps

1. **Connect Repository**
- Go to https://netlify.com
- Click "New site from Git"
- Select GitHub repo

2. **Configure Build**
```
Build Command: npm run build
Publish Directory: dist
```

3. **Add Environment Variables**
- Site Settings → Build & Deploy → Environment
- Add `VITE_API_URL=https://api.trackly.com`

4. **Deploy**
- Auto-deployed on push

---

### Option 3: GitHub Pages

#### Steps

1. **Create gh-pages Branch**
```bash
cd client
npm run build
git add dist/
git commit -m "build: production build"
git subtree push --prefix dist origin gh-pages
```

2. **Configure Repository**
- Settings → Pages
- Source: gh-pages branch
- Custom domain (optional)

---

### Option 4: AWS S3 + CloudFront

#### Steps

1. **Build Frontend**
```bash
cd client
npm run build
```

2. **Create S3 Bucket**
- S3 → Create bucket
- Enable static website hosting
- Upload contents of `dist/` folder

3. **Setup CloudFront**
- CloudFront → Create distribution
- Origin: S3 bucket
- Redirect HTTP to HTTPS

4. **Add Custom Domain**
- Route 53 → Create record
- Point to CloudFront distribution

---

## ⚙️ Environment Variables

### Backend Production Variables

```env
# Application
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://prod_user:secure_password@cluster.mongodb.net/ExpenseTracker?retryWrites=true&w=majority

# Authentication
JWT_SECRET=very_long_cryptographically_secure_random_string_min_64_characters_here_for_security

# CORS (Frontend URL)
CORS_ORIGIN=https://trackly.com

# Optional: Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@trackly.com
SMTP_PASS=app_specific_password

# Optional: Error Tracking (Sentry)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project
```

### Frontend Production Variables

```env
# API Base URL
VITE_API_URL=https://api.trackly.com

# Optional: Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Cloud - Recommended)

1. **Create Cluster**
- Go to https://cloud.mongodb.com
- Create new project
- Create M0 (free) cluster
- Select region closest to users

2. **Configure Network**
- IP Whitelist → Add IP
- For production: Add your server IP
- For testing: Allow from anywhere (0.0.0.0/0)

3. **Create Database User**
- Create username & password
- Copy connection string
- Replace placeholders in connection string

4. **Enable Backups**
- Cluster Settings → Backup
- Enable automatic backups

5. **Create Indexes**
```javascript
// For users
db.users.createIndex({ email: 1 }, { unique: true });

// For expenses
db.expenses.createIndex({ userId: 1 });
db.expenses.createIndex({ date: 1 });

// For tasks
db.tasks.createIndex({ userId: 1 });
db.tasks.createIndex({ date: 1 });
```

### Connection String

```
mongodb+srv://username:password@cluster.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Trackly
```

---

## 🔒 Security Hardening

### 1. HTTPS/SSL

**Get Free SSL Certificate**
```bash
# Using Let's Encrypt (certbot)
certbot certonly --standalone -d api.trackly.com
```

**Update Nginx**
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/api.trackly.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.trackly.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

### 2. Environment Security

- ✅ Never commit `.env` file
- ✅ Use `.env.example` template only
- ✅ Rotate JWT_SECRET regularly
- ✅ Use 64+ character secrets
- ✅ Store secrets in vault/manager

### 3. Database Security

- ✅ Create separate DB user for prod
- ✅ Use strong passwords (32+ chars)
- ✅ Enable IP whitelisting
- ✅ Enable database backups
- ✅ Use encrypted connections

### 4. API Security

- ✅ CORS limited to frontend domain only
- ✅ Rate limiting enabled
- ✅ CSRF protection (for session auth)
- ✅ Input validation on all endpoints
- ✅ Output encoding to prevent XSS

### 5. Code Security

- ✅ No hardcoded credentials
- ✅ No console.logs in production
- ✅ Dependencies up to date
- ✅ Security patches applied immediately
- ✅ Regular dependency audits

---

## 📊 Monitoring & Logging

### Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/node @sentry/tracing
```

**Backend Setup**
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.errorHandler());
```

### Application Logging

```javascript
// Use winston or similar
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log important events
logger.info('User registered', { userId, email });
logger.error('Database error', { error: err.message });
```

### Performance Monitoring

**New Relic, DataDog, or similar**
- Monitor CPU/memory usage
- Database query performance
- API response times
- Error rates

---

## 🔧 Troubleshooting

### Backend Won't Start

1. **Check MongoDB Connection**
```bash
# Test connection
mongo "your_connection_string"
```

2. **Check Environment Variables**
```bash
# Verify all required vars are set
echo $MONGO_URI
echo $JWT_SECRET
```

3. **Check Port**
```bash
# Verify port 5000 is available
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

### Frontend Build Fails

1. **Clear Cache**
```bash
cd client
rm -rf node_modules dist .vite
npm install
npm run build
```

2. **Check Build Command**
```bash
npm run build -- --debug
```

### API Calls Failing

1. **Check CORS**
- Verify frontend URL in backend CORS config
- Check browser console for CORS errors

2. **Check Token**
- Verify JWT token is valid
- Check token expiry (7 days)

3. **Check Rate Limiting**
- Verify IP is not rate limited
- Check headers for `RateLimit-Remaining`

---

## 📈 Post-Deployment

### 1. Verify Everything Works

- [ ] Frontend loads
- [ ] Can register new user
- [ ] Can login
- [ ] Can create expense
- [ ] Can create task
- [ ] Dashboard loads with data
- [ ] Dark mode works
- [ ] Mobile responsive

### 2. Setup Monitoring

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Log aggregation
- [ ] Alerts configured

### 3. Backup Strategy

- [ ] Database backups automated
- [ ] Backups tested for restore
- [ ] Retention policy set
- [ ] Disaster recovery plan

### 4. Documentation

- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Team access granted
- [ ] Runbook created

---

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "trackly-api"
          heroku_email: "your-email@example.com"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: cd client && npm install && npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{secrets.VERCEL_TOKEN}}
          vercel-org-id: ${{secrets.VERCEL_ORG_ID}}
          vercel-project-id: ${{secrets.VERCEL_PROJECT_ID}}
```

---

## 📞 Support

**Deployment Issues?**
- Check documentation
- Review logs
- Contact DevOps team
- Create GitHub issue

---

**Happy Deploying! 🚀**
