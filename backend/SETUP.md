# Quick Setup Guide

## Option 1: Using Docker (Recommended for Development)

1. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```

2. **Create .env file**
   ```bash
   cp env.template .env
   ```
   
   The default DATABASE_URL in docker-compose is:
   ```
   DATABASE_URL="postgresql://postulate:postulate_dev@localhost:5432/postulate?schema=public"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start server**
   ```bash
   npm run dev
   ```

## Option 2: Using Local PostgreSQL

1. **Install PostgreSQL** (if not already installed)
   - macOS: `brew install postgresql@15`
   - Linux: `sudo apt-get install postgresql`
   - Windows: Download from postgresql.org

2. **Create database**
   ```bash
   createdb postulate
   # Or using psql:
   # psql -U postgres
   # CREATE DATABASE postulate;
   ```

3. **Create .env file**
   ```bash
   cp env.template .env
   ```
   
   Update DATABASE_URL with your credentials:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/postulate?schema=public"
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

6. **Start server**
   ```bash
   npm run dev
   ```

## Verify Setup

1. **Check health endpoint**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Test waitlist endpoint**
   ```bash
   curl -X POST http://localhost:3001/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "name": "Test User",
       "type": "CREATOR"
     }'
   ```

## Next Steps

- Connect your frontend to `http://localhost:3001`
- Update CORS settings in `.env` if needed
- Check `README.md` for API documentation


