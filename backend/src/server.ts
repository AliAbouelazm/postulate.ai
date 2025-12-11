import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { waitlistRoutes } from './routes/waitlist.js';
import { authRoutes } from './routes/auth.js';
import { ideaRoutes } from './routes/ideas.js';
import { healthRoutes } from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PRODUCTION_FRONTEND = 'https://trypostulate.com';

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [FRONTEND_URL, PRODUCTION_FRONTEND, 'https://AliAbouelazm.github.io']
    : FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: 'Postulate.ai API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      waitlist: {
        join: 'POST /api/waitlist',
        stats: 'GET /api/waitlist/stats'
      },
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      ideas: {
        create: 'POST /api/ideas',
        list: 'GET /api/ideas',
        myIdeas: 'GET /api/ideas/my-ideas',
        get: 'GET /api/ideas/:id',
        update: 'PATCH /api/ideas/:id',
        submit: 'POST /api/ideas/:id/submit',
        review: 'POST /api/ideas/:id/review',
        delete: 'DELETE /api/ideas/:id'
      }
    }
  });
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${FRONTEND_URL}`);
});

export default app;

