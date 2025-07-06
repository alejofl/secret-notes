# Error Handling and Troubleshooting Guide

This document provides comprehensive information about error handling, common issues, and troubleshooting steps for Secret Notes.

## Table of Contents

- [Quick Troubleshooting](#quick-troubleshooting)
- [Docker Compose Issues](#docker-compose-issues)
- [Environment Configuration](#environment-configuration)
- [Database Issues](#database-issues)
- [Backend API Errors](#backend-api-errors)
- [Frontend Issues](#frontend-issues)
- [Encryption/Decryption Errors](#encryptiondecryption-errors)
- [Development Environment Issues](#development-environment-issues)
- [Performance Issues](#performance-issues)
- [Deployment Issues](#deployment-issues)
- [Getting Help](#getting-help)

## Quick Troubleshooting

### Application Won't Start

1. **Check if all services are running:**
   ```bash
   docker compose ps
   ```

2. **View logs for specific service:**
   ```bash
   docker compose logs backend
   docker compose logs frontend
   docker compose logs postgres
   ```

3. **Restart all services:**
   ```bash
   docker compose down
   docker compose up -d
   ```

### Cannot Access Application

- **Frontend**: Check http://localhost:${FRONTEND_PORT_BINDING}
- **Backend**: Check http://localhost:${BACKEND_PORT_BINDING}/healthcheck
- **Verify environment variables are set correctly**

## Docker Compose Issues

### Service Won't Start

**Error:** `ERROR: No such file or directory`
```bash
ERROR: Couldn't find env file: /path/to/.env
```

**Solution:**
```bash
# Copy sample environment files
cp backend/.env.sample backend/.env
cp frontend/.env.sample frontend/.env

# Edit with your values
vim backend/.env
vim frontend/.env
```

### Port Already in Use

**Error:** `bind: address already in use`
```bash
ERROR: for postgres  Cannot start service postgres: driver failed programming external connectivity
```

**Solutions:**

1. **Find what's using the port:**
   ```bash
   lsof -i :5432  # For PostgreSQL
   lsof -i :3000  # For frontend
   lsof -i :4000  # For backend
   ```

2. **Kill the process:**
   ```bash
   sudo kill -9 <PID>
   ```

3. **Or change port in environment:**
   ```bash
   # In backend/.env
   POSTGRES_PORT_BINDING=5433
   BACKEND_PORT_BINDING=4001
   
   # In frontend/.env
   FRONTEND_PORT_BINDING=3001
   ```

### Build Failures

**Error:** Docker build context issues
```bash
ERROR [backend 4/8] COPY package*.json ./
```

**Solution:**
```bash
# Clean build cache
docker builder prune

# Rebuild from scratch
docker compose build --no-cache

# Check Dockerfile paths
ls backend/package.json  # Should exist
ls frontend/package.json  # Should exist
```

### Service Dependencies

**Error:** `service "postgres" is not ready`
```bash
ERROR: for migrations  Container "secret-notes-postgres-1" is unhealthy
```

**Solutions:**

1. **Check health status:**
   ```bash
   docker compose ps
   # Look for "healthy" status
   ```

2. **View PostgreSQL logs:**
   ```bash
   docker compose logs postgres
   ```

3. **Manually test database connection:**
   ```bash
   docker compose exec postgres pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}
   ```

4. **Restart in correct order:**
   ```bash
   docker compose down
   docker compose up postgres -d
   # Wait for healthy status
   docker compose up -d
   ```

## Environment Configuration

### Missing Environment Variables

**Error:** `POSTGRES_URL is not defined`

**Solution:**
```bash
# Check backend/.env file exists and contains:
BACKEND_HOST=
BACKEND_PORT=
BACKEND_PORT_BINDING=

POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_PORT_BINDING=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_URL=
```

### Frontend API Connection

**Error:** `Network Error` or `CORS Error`

**Solution:**
```bash
# Check frontend/.env file contains:
VITE_API_BASE_URL=
VITE_PUBLIC_POSTHOG_KEY=
VITE_PUBLIC_POSTHOG_HOST=

FRONTEND_PORT_BINDING=
```

**Common mistakes:**
- Using `localhost` instead of container name in backend
- Wrong port numbers
- Missing `http://` prefix in `VITE_API_BASE_URL`

### Environment Variable Loading

**Error:** Variables not being loaded

**Solutions:**

1. **Check file location:**
   ```bash
   ls -la backend/.env
   ls -la frontend/.env
   # Files should exist and not be named .env.sample
   ```

2. **Verify compose file references:**
   ```yaml
   # In compose.yaml
   services:
     backend:
       env_file: ./backend/.env
     frontend:
       env_file: ./frontend/.env
   ```

3. **Test variable loading:**
   ```bash
   docker compose config
   # Should show resolved environment variables
   ```

## Database Issues

### Connection Refused

**Error:** `Connection refused` to PostgreSQL
```bash
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**

1. **Check PostgreSQL is running:**
   ```bash
   docker compose ps postgres
   # Should show "Up" and "healthy"
   ```

2. **Check network connectivity:**
   ```bash
   docker compose exec backend ping postgres
   ```

3. **Verify connection string:**
   ```bash
   # In backend/.env
   POSTGRES_URL=
   ```

### Prisma Migration Issues

**Error:** `Schema drift detected`
```bash
Error: P3009: migrate found failed migration
```

**Solutions:**

1. **Reset development database:**
   ```bash
   # WARNING: This deletes all data
   docker compose down -v
   docker compose up postgres -d
   # Wait for healthy status
   docker compose up migrations -d
   ```

2. **Fix specific migration:**
   ```bash
   docker compose exec backend npx prisma migrate resolve --rolled-back <migration_name>
   docker compose exec backend npx prisma migrate deploy
   ```

3. **Check migration status:**
   ```bash
   docker compose exec backend npx prisma migrate status
   ```

## Backend API Errors

### Server Won't Start

**Error:** `Error: listen EADDRINUSE`
```bash
Error: listen EADDRINUSE :::4000
```

**Solutions:**

1. **Change port:**
   ```bash
   # In backend/.env
   BACKEND_PORT=
   BACKEND_PORT_BINDING=
   ```

2. **Kill conflicting process:**
   ```bash
   lsof -ti:<CONFLICTING_PORT> | xargs kill -9
   ```

### API Request Failures

**Error:** `400 Bad Request` - Missing fields
```json
{"error": "Missing title, text or passphrase"}
```

**Solution:** Ensure all required fields are provided:
```javascript
// Correct API call
fetch('/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Note',
    text: 'Note content',
    passphrase: 'secure-passphrase'
  })
});
```

## Frontend Issues

### Build Failures

**Error:** `Failed to compile`
```bash
ERROR in ./src/main.tsx
Module not found: Can't resolve '@/components/...'
```

**Solutions:**

1. **Check TypeScript configuration:**
   ```bash
   # Verify frontend/tsconfig.json has correct paths
   cat frontend/tsconfig.json | grep -A 5 "paths"
   ```

2. **Rebuild with clean cache:**
   ```bash
   docker compose build frontend --no-cache
   ```

3. **Check import paths:**
   ```typescript
   // Use correct import paths as defined in vite.config.ts
   import { Component } from '@/components/Component';
   ```

### Development Server Issues

**Error:** `VITE v4.x.x ready in Xms` but page not loading

**Solutions:**

1. **Check port mapping:**
   ```bash
   docker compose ps frontend
   # Verify port mapping is correct
   ```

2. **Check environment variables:**
   ```bash
   # In frontend/.env
   VITE_API_BASE_URL=
   ```

3. **Test API connectivity:**
   ```bash
   curl http://localhost:<BACKEND_PORT_BINDING>/healthcheck
   ```

## Encryption/Decryption Errors

### Decryption Failed

**Error:** `Decryption failed` when retrieving notes

**Common Causes:**
- Wrong passphrase

**Solutions:**

1. **Verify passphrase:**
   ```bash
   # Check if same passphrase works for encryption/decryption
   # This is handled client-side, check browser console
   ```

## Development Environment Issues

### Node.js Version Mismatch

**Error:** `The engine "node" is incompatible`

**Solutions:**

1. **Check Node.js version in containers:**
   ```bash
   docker compose exec backend node --version
   docker compose exec frontend node --version
   ```

2. **Update base image if needed:**
   ```dockerfile
   # In backend/Dockerfile and frontend/Dockerfile
   FROM node:22-alpine
   ```

---

This troubleshooting guide covers the most common issues encountered with Secret Notes. If you encounter an issue not listed here, please contribute by submitting a pull request with the solution.
