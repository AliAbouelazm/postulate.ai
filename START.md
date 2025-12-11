# Postulate.ai - Getting Started

## 🚀 Quick Start

Both frontend and backend are now set up and ready to run!

### Backend (Port 3001)
The backend API is running on `http://localhost:3001`

**To start the backend:**
```bash
cd backend
npm run dev
```

**API Endpoints:**
- Health: `GET http://localhost:3001/api/health`
- Join Waitlist: `POST http://localhost:3001/api/waitlist`
- Register: `POST http://localhost:3001/api/auth/register`
- Login: `POST http://localhost:3001/api/auth/login`
- Ideas: `GET/POST http://localhost:3001/api/ideas`

### Frontend (Port 5173)
The frontend is running on `http://localhost:5173`

**To start the frontend:**
```bash
cd fc4ac4c8-08cb-4f38-85ef-165e4237a0ef
npm run dev
```

## ✅ What's Working

1. **Backend API** - Fully functional with:
   - Waitlist management
   - User authentication
   - Idea submission and review system
   - SQLite database (easy development setup)

2. **Frontend** - Connected to backend:
   - Waitlist signup forms (Creator & Company)
   - Modal forms with validation
   - Success/error feedback
   - Beautiful UI with animations

3. **Integration**:
   - Frontend can submit waitlist entries
   - API service handles all backend communication
   - CORS configured for local development

## 🧪 Test It Out

1. Open `http://localhost:5173` in your browser
2. Click "Join Creator Waitlist" or "Join Company Waitlist"
3. Fill out the form and submit
4. You should see a success message!

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-secret-change-in-production-12345"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (optional - uses defaults)
Create `.env` in frontend directory:
```env
VITE_API_URL=http://localhost:3001
```

## 🐛 Troubleshooting

**Backend not responding?**
- Check if port 3001 is in use: `lsof -ti:3001`
- Verify database exists: `ls backend/prisma/dev.db`
- Check logs in terminal

**Frontend not connecting?**
- Verify backend is running on port 3001
- Check browser console for CORS errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL

**Database issues?**
- Reset database: `cd backend && npm run db:push`
- View data: `cd backend && npm run db:studio`

## 📚 Next Steps

1. **Production Setup:**
   - Switch to PostgreSQL (update `prisma/schema.prisma`)
   - Set strong `JWT_SECRET`
   - Configure production database URL
   - Set up environment variables on hosting platform

2. **Features to Add:**
   - User dashboard
   - Idea submission interface
   - Company review interface
   - NDA workflow
   - Email notifications

3. **Deployment:**
   - Backend: Railway, Render, or AWS
   - Frontend: Vercel, Netlify, or AWS
   - Database: PostgreSQL on Railway, Supabase, or AWS RDS

## 🎉 You're All Set!

Both servers should be running. Open `http://localhost:5173` to see your app!


