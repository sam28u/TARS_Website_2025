# 🚀 TARS Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- MongoDB database (Atlas recommended)
- Cloudinary account for image storage
- Domain names (optional but recommended)

---

## 🔧 Environment Setup

### Backend Environment Variables

Create `backend/.env` file with:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tars_db

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# Server Configuration
PORT=4000
NODE_ENV=production
```

### Frontend Environment Variables

Create `frontend/.env.local` file with:

```env
# Backend API URL
NEXT_PUBLIC_CONTACT_API=https://your-backend-domain.com/api/contact
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

#### **Deploy Backend:**

**Using Railway:**
1. Push code to GitHub
2. Go to [Railway](https://railway.app)
3. Create new project → Deploy from GitHub
4. Select `backend` folder
5. Add environment variables in Railway dashboard
6. Set start command: `npm start`
7. Deploy!

**Using Render:**
1. Go to [Render](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Root directory: `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Deploy!

#### **Deploy Frontend:**

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Root directory: `frontend`
4. Framework preset: Next.js
5. Add environment variables
6. Deploy!

---

### Option 2: VPS (Ubuntu/Debian)

#### **1. Setup Server:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### **2. Deploy Backend:**

```bash
# Clone repository
git clone <your-repo-url>
cd tars-monorepo/backend

# Install dependencies
npm install --production

# Create .env file with production values
nano .env

# Start with PM2
pm2 start src/index.js --name tars-backend
pm2 save
pm2 startup
```

#### **3. Deploy Frontend:**

```bash
cd ../frontend

# Install dependencies
npm install

# Build production
npm run build

# Start with PM2
pm2 start npm --name tars-frontend -- start
pm2 save
```

#### **4. Configure Nginx:**

```nginx
# /etc/nginx/sites-available/tars

# Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/tars /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```

---

### Option 3: Docker Deployment

#### **Create Backend Dockerfile:**

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
```

#### **Create Frontend Dockerfile:**

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
```

#### **Create docker-compose.yml:**

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    env_file:
      - ./backend/.env
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    env_file:
      - ./frontend/.env.local
    depends_on:
      - backend
    restart: unless-stopped
```

```bash
# Deploy with Docker Compose
docker-compose up -d
```

---

## ✅ Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB database created and accessible
- [ ] Cloudinary account setup
- [ ] CORS_ORIGIN updated to production frontend URL
- [ ] API URLs updated in frontend env
- [ ] Test build locally (`npm run build`)
- [ ] Remove any console.logs in production code
- [ ] Setup error monitoring (Sentry, LogRocket, etc.)
- [ ] Setup analytics (Google Analytics, etc.)
- [ ] Configure custom domain
- [ ] Setup SSL certificates
- [ ] Test all API endpoints
- [ ] Test image uploads
- [ ] Test mobile responsiveness
- [ ] Setup backup strategy for MongoDB

---

## 🔍 Testing Production Build Locally

### Backend:
```bash
cd backend
NODE_ENV=production npm start
```

### Frontend:
```bash
cd frontend
npm run build
npm start
```

Test at http://localhost:3000

---

## 📊 Monitoring & Maintenance

### PM2 Commands:
```bash
pm2 list                 # List all processes
pm2 logs tars-backend    # View backend logs
pm2 logs tars-frontend   # View frontend logs
pm2 restart all          # Restart all services
pm2 stop all             # Stop all services
pm2 delete all           # Remove all processes
```

### Update Deployment:
```bash
git pull origin main
cd backend && npm install && pm2 restart tars-backend
cd ../frontend && npm install && npm run build && pm2 restart tars-frontend
```

---

## 🐛 Troubleshooting

### Issue: Cannot connect to MongoDB
- Check MONGODB_URI is correct
- Whitelist server IP in MongoDB Atlas
- Verify network connectivity

### Issue: CORS errors
- Update CORS_ORIGIN in backend .env
- Ensure frontend URL is correct
- Check if backend is accessible

### Issue: Images not uploading
- Verify Cloudinary credentials
- Check file size limits
- Ensure multer is configured correctly

### Issue: 502 Bad Gateway (Nginx)
- Check if backend/frontend is running: `pm2 list`
- Check Nginx config: `sudo nginx -t`
- Check logs: `sudo tail -f /var/log/nginx/error.log`

---

## 📞 Support

For issues, contact the development team or check:
- Backend logs: `pm2 logs tars-backend`
- Frontend logs: `pm2 logs tars-frontend`
- Nginx logs: `/var/log/nginx/error.log`

---

## 🔐 Security Best Practices

1. Never commit `.env` files
2. Use strong MongoDB passwords
3. Keep dependencies updated: `npm audit fix`
4. Enable rate limiting on API
5. Setup firewall rules
6. Regular backups of database
7. Monitor for security vulnerabilities
8. Use HTTPS only in production
9. Implement proper authentication for dashboard
10. Sanitize user inputs

---

**Happy Deploying! 🚀**
