# Deployment Guide

## Current Setup
- **Frontend**: GitHub Pages (https://trypostulate.com)
- **Backend**: Railway (to be deployed)

## Step-by-Step Railway Deployment

### 1. Deploy Backend to Railway

1. **Sign up**: Go to https://railway.app and sign up with GitHub
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select Repo**: Choose `AliAbouelazm/postulate.ai`
4. **Set Root Directory**: 
   - Click on your service
   - Go to Settings → Root Directory
   - Set to: `backend`
5. **Add Environment Variables** (in Railway dashboard → Variables):
   ```
   DATABASE_URL=file:./prisma/dev.db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   FRONTEND_URL=https://trypostulate.com
   EMAIL_USER=trypostulate@gmail.com
   EMAIL_APP_PASSWORD=olsp lbha snss bgio
   NOTIFICATION_EMAIL=trypostulate@gmail.com
   ```
6. **Deploy**: Railway will automatically build and deploy
7. **Get Your Backend URL**: 
   - In Railway dashboard → Settings → Domains
   - Copy your Railway URL (e.g., `https://postulate-backend-production.up.railway.app`)

### 2. Update Frontend to Use Railway Backend

After you get your Railway backend URL, update the frontend:

**Option A: Update GitHub Actions Workflow** (Recommended)
1. Edit `.github/workflows/deploy.yml`
2. Add environment variable before build:
   ```yaml
   - name: Build
     working-directory: ./fc4ac4c8-08cb-4f38-85ef-165e4237a0ef
     env:
       VITE_API_URL: https://your-railway-url.railway.app
     run: npm run build
   ```

**Option B: Update API Service Directly**
1. Edit `fc4ac4c8-08cb-4f38-85ef-165e4237a0ef/src/services/api.ts`
2. Change line 1 to:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-railway-url.railway.app';
   ```

### 3. Rebuild and Deploy Frontend

After updating:
```bash
cd fc4ac4c8-08cb-4f38-85ef-165e4237a0ef
npm run build
cd ../..
git checkout gh-pages
rm -rf * .[^.]* 2>/dev/null
cp -r fc4ac4c8-08cb-4f38-85ef-165e4237a0ef/dist/* .
git add -A
git commit -m "Update frontend with Railway backend URL"
git push
git checkout main
```

## Testing

1. Visit https://trypostulate.com
2. Try joining the waitlist
3. Check your email (trypostulate@gmail.com) for notifications!

