# 🚀 Deploy TARS: Vercel (Frontend) + Render (Backend)

## 📋 Quick Overview

- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary

---

## 🎯 Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username + password)
4. Whitelist IP: `0.0.0.0/0` (allow all) for Render
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/tars_db
   ```

---

## ☁️ Step 2: Setup Cloudinary

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Get your credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret

---

## 🔴 Step 3: Deploy Backend on Render

### Method 1: Using Render Dashboard (Recommended)

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Click "New +" → "Web Service"**

3. **Connect Your Repository:**
   - Connect your GitHub account
   - Select your repository
   - Click "Connect"

4. **Configure the Service:**
   ```
   Name: tars-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```env
   NODE_ENV=production
   PORT=4000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tars_db
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```
   
   ⚠️ **Important**: Leave `CORS_ORIGIN` as a placeholder for now. We'll update it after deploying the frontend.

6. **Click "Create Web Service"**

7. **Wait for Deployment** (3-5 minutes)

8. **Note Your Backend URL:**
   ```
   https://tars-backend.onrender.com
   ```
   Save this - you'll need it for the frontend!

### Method 2: Using render.yaml (Automatic)

The `render.yaml` file is already created. Just:
1. Push to GitHub
2. Go to Render → New → Blueprint
3. Connect your repo
4. It will auto-detect `render.yaml`
5. Add environment variables manually in Render dashboard

---

## ▲ Step 4: Deploy Frontend on Vercel

### Prerequisites

Make sure you have the backend URL from Step 3!

### Deploy Steps:

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New..." → "Project"**

3. **Import Repository:**
   - Connect your GitHub account
   - Select your repository
   - Click "Import"

4. **Configure Project:**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   Development Command: npm run dev (auto-detected)
   ```

5. **Add Environment Variables:**
   
   Click "Environment Variables" and add:
   
   ```env
   NEXT_PUBLIC_CONTACT_API=https://tars-backend.onrender.com/api/contact
   NEXT_PUBLIC_API_URL=https://tars-backend.onrender.com/api
   ```
   
   ⚠️ Replace `https://tars-backend.onrender.com` with YOUR actual Render backend URL!

6. **Click "Deploy"**

7. **Wait for Deployment** (2-3 minutes)

8. **Note Your Frontend URL:**
   ```
   https://tars-website-xxxxx.vercel.app
   ```

---

## 🔄 Step 5: Update Backend CORS

Now that you have your frontend URL, update the backend:

1. **Go to Render Dashboard**
2. **Select your backend service**
3. **Go to "Environment" tab**
4. **Update `CORS_ORIGIN`:**
   ```env
   CORS_ORIGIN=https://tars-website-xxxxx.vercel.app
   ```
   Use your actual Vercel URL!

5. **Click "Save Changes"**
6. Backend will automatically redeploy

---

## ✅ Step 6: Test Your Deployment

### Test Backend:
Visit: `https://tars-backend.onrender.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "db": "connected"
}
```

### Test Frontend:
Visit: `https://your-frontend.vercel.app`

Should see the TARS landing page!

### Test Full Integration:
1. Navigate to dashboard: `https://your-frontend.vercel.app/dashboard`
2. Try uploading a project with an image
3. Check if it appears on the homepage

---

## 🎨 Step 7: Custom Domain (Optional)

### For Frontend (Vercel):
1. Go to Vercel project → Settings → Domains
2. Add your domain (e.g., `tars.yourdomain.com`)
3. Follow DNS configuration instructions
4. Update backend `CORS_ORIGIN` with new domain

### For Backend (Render):
1. Go to Render service → Settings → Custom Domain
2. Add your domain (e.g., `api.yourdomain.com`)
3. Configure DNS CNAME record
4. Update frontend API URLs with new domain

---

## 🔧 Environment Variables Summary

### Backend (Render)
```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tars_db
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_CONTACT_API=https://tars-backend.onrender.com/api/contact
NEXT_PUBLIC_API_URL=https://tars-backend.onrender.com/api
```

---

## 🐛 Troubleshooting

### Issue: "CORS Error" in Browser Console

**Solution:**
1. Check backend `CORS_ORIGIN` matches frontend URL exactly
2. Include `https://` and no trailing slash
3. Redeploy backend after changing

### Issue: "Failed to fetch" API calls

**Solution:**
1. Check if backend is running: visit `/api/health`
2. Verify `NEXT_PUBLIC_API_URL` in frontend env
3. Check Render logs for errors

### Issue: Backend shows "Cannot connect to MongoDB"

**Solution:**
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas network access (whitelist `0.0.0.0/0`)
3. Ensure database user has read/write permissions

### Issue: Images not uploading

**Solution:**
1. Verify Cloudinary credentials in Render
2. Check Render logs: `View Logs` button
3. Test Cloudinary credentials locally first

### Issue: Render backend "sleeping" (Free tier)

**Note:** Free Render services sleep after 15 minutes of inactivity.
- First request after sleep takes 30-60 seconds
- Consider paid plan for production ($7/month)
- Or use [UptimeRobot](https://uptimerobot.com/) to ping every 14 minutes

---

## 🔄 How to Update Your Deployment

### Update Frontend:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel auto-deploys on every push!

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render auto-deploys on every push!

### Manual Deploy:
- **Vercel**: Dashboard → Project → Deployments → Redeploy
- **Render**: Dashboard → Service → Manual Deploy → Deploy latest commit

---

## 📊 Monitoring & Logs

### Vercel Logs:
1. Go to project dashboard
2. Click "Deployments"
3. Click on latest deployment
4. View "Build Logs" or "Function Logs"

### Render Logs:
1. Go to service dashboard
2. Click "Logs" tab
3. Real-time logs appear here
4. Or click "Events" for deployment history

---

## 💰 Pricing

### Free Tier Limits:

**Vercel:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

**Render:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Auto-sleep after 15 min inactivity
- ✅ 512 MB RAM
- ⚠️ Services spin down when inactive

**MongoDB Atlas:**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Enough for small-medium projects

**Cloudinary:**
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ 25,000 transformations/month

---

## 🎯 Production Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Atlas configured
- [ ] Cloudinary credentials added
- [ ] CORS_ORIGIN configured correctly
- [ ] API URLs updated in frontend
- [ ] Test `/api/health` endpoint
- [ ] Test frontend loads correctly
- [ ] Test image uploads work
- [ ] Test all dashboard features
- [ ] Configure custom domains (optional)
- [ ] Setup monitoring (optional)
- [ ] Add analytics (optional)

---

## 🆘 Need Help?

### Check Logs:
- **Vercel**: Project → Deployments → Function Logs
- **Render**: Service → Logs tab

### Common Log Locations:
- Build errors: Build logs
- Runtime errors: Function/Service logs
- Network errors: Browser console

### Support Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

## 🎉 You're Live!

Your TARS website is now live and accessible worldwide!

**Frontend:** `https://your-site.vercel.app`  
**Backend API:** `https://tars-backend.onrender.com/api`

Share your links and start showcasing your robotics society! 🤖✨

---

**Questions? Check logs or review this guide!**
