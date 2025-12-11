# Postulate.ai Backend API

Backend API for postulate.ai - A marketplace connecting idea creators with companies.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator & Zod

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Secret key for JWT tokens
   - `PORT`: Server port (default: 3001)
   - `FRONTEND_URL`: Frontend URL for CORS

3. **Set up database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Or run migrations (for production)
   npm run db:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3001` (or your configured PORT)

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database status

### Waitlist
- `POST /api/waitlist` - Join waitlist (creators or companies)
- `GET /api/waitlist/stats` - Get waitlist statistics

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Ideas
- `POST /api/ideas` - Create new idea (creators only)
- `GET /api/ideas` - List ideas (filtered by role)
- `GET /api/ideas/my-ideas` - Get user's ideas
- `GET /api/ideas/:id` - Get single idea
- `PATCH /api/ideas/:id` - Update idea (creator only)
- `POST /api/ideas/:id/submit` - Submit idea for review
- `POST /api/ideas/:id/review` - Review idea (company only)
- `DELETE /api/ideas/:id` - Delete idea (creator only)

## Database Schema

### Models
- **User**: Users (creators, companies, admins)
- **Company**: Company profiles
- **WaitlistEntry**: Waitlist signups
- **Idea**: Submitted ideas
- **NDA**: NDA agreements
- **Review**: Company reviews of ideas

## Development

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database tools
npm run db:studio  # Open Prisma Studio
npm run db:generate  # Generate Prisma Client
npm run db:push  # Push schema changes
npm run db:migrate  # Run migrations
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use a strong `JWT_SECRET`
3. Configure proper CORS origins
4. Use connection pooling for database
5. Set up proper logging and monitoring
6. Use environment-specific database URLs

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="https://yourdomain.com"
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Input validation
- CORS protection
- SQL injection protection (Prisma)
- Role-based access control

## License

ISC


