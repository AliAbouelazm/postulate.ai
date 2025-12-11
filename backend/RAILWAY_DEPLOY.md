# Railway Deployment Guide

## Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (recommended)
3. You'll get $5 free credit per month

## Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `postulate.ai` repository
4. Select the `backend` folder as the root directory

## Step 3: Configure Environment Variables
In Railway dashboard, go to your service → Variables tab, add:

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

## Step 4: Deploy
1. Railway will automatically detect the build and start commands
2. Wait for deployment to complete
3. Your backend will be live at: `https://your-project-name.railway.app`

## Step 5: Get Your Backend URL
1. In Railway dashboard, go to your service
2. Click on the "Settings" tab
3. Under "Domains", you'll see your Railway URL
4. Copy this URL (e.g., `https://postulate-backend-production.up.railway.app`)

## Step 6: Update Frontend
Update the frontend to use your Railway backend URL by setting the environment variable:
- In your frontend build, set `VITE_API_URL` to your Railway backend URL
- Or update the API service to use the Railway URL

## Step 7: Test
1. Visit your live site: https://trypostulate.com
2. Try joining the waitlist
3. Check your email for notifications!

