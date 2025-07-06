# Secret Notes 🔐

A secure note-taking web application that stores encrypted notes using symetric encryption with passphrase protection.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
    * [Frontend](#frontend)
    * [Backend](#backend)
    * [DevOps &amp; Testing](#devops--testing)
* [Quick Start](#quick-start)
    * [Prerequisites](#prerequisites)
    * [Using Docker (Recommended)](#using-docker-recommended)
    * [Local Development](#local-development)
* [Environment Variables](#environment-variables)
    * [Backend (.env)](#backend-env)
    * [Frontend (.env)](#frontend-env)
* [API Documentation](#api-documentation)
    * [Endpoints](#endpoints)
        * [GET /healthcheck](#get-healthcheck)
        * [GET /notes](#get-notes)
        * [GET /notes/:id](#get-notesid)
        * [POST /notes](#post-notes)
* [Security](#security)
    * [Encryption](#encryption)
    * [Best Practices](#best-practices)
* [Testing](#testing)
    * [Frontend Tests](#frontend-tests)
    * [Backend Tests](#backend-tests)
* [Deployment](#deployment)
    * [Jenkins](#jenkins)
    * [GitHub Actions](#github-actions)
* [Development](#development)
    * [Project Structure](#project-structure)
    * [Contributing](#contributing)
* [License](#license)
* [Support](#support)
* [Final Remarks](#final-remarks)

## Features

- ✨ **Secure Encryption**: Symetric encryption using passphrases with AES-256-GCM
- 📝 **Markdown Support**: Write and render notes with full Markdown support including GitHub Flavored Markdown
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🔍 **Search & Filter**: Search notes by title with sorting options (title, creation date)
- 🌙 **Theme Support**: System theme detection with multiple color schemes
- 🚀 **Fast Performance**: Optimized with TanStack Router and React Query
- 📊 **Analytics**: Integrated PostHog analytics (configurable)
- 🔒 **Security-First**: No plain-text storage, only encrypted content

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN** - Accessible component primitives
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe backend development
- **Prisma** - Type-safe database client and ORM
- **PostgreSQL** - Robust relational database

### DevOps & Testing
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Jest** - Backend testing framework
- **Vitest** - Frontend unit testing
- **Playwright** - End-to-end testing
- **K6** - Performance testing
- **Jenkins & GitHub Actions** - CI/CD pipeline
- **SonarQube** - Code quality analysis
- **Snyk** - Security vulnerability scanning

## Quick Start

### Prerequisites

- **Docker** and **Docker Compose** (recommended)
- **Node.js 22+** and **npm** (for local development)
- **PostgreSQL** (if running without Docker)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/alejofl/secret-notes.git
   cd secret-notes
   ```

2. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp backend/.env.sample backend/.env
   cp frontend/.env.sample frontend/.env
   
   # Edit the files with your configuration
   vim backend/.env
   vim frontend/.env
   ```

3. **Start the application**
   ```bash
   npm run start
   ```

4. **Access the application**
   - Frontend: http://localhost:${FRONTEND_PORT_BINDING}
   - Backend API: http://localhost:${BACKEND_PORT_BINDING}
   - Database: localhost:${POSTGRES_PORT_BINDING}

### Local Development

1. **Start the database**
   ```bash
   npm run dev:db:up
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   cd backend
   npm run dev:prisma:generate
   npm run dev:prisma:migrate
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```env
# Backend
BACKEND_HOST=
BACKEND_PORT=
BACKEND_PORT_BINDING=

# Database
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_PORT_BINDING=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_URL=
```

### Frontend (.env)
```env
VITE_API_BASE_URL=
VITE_PUBLIC_POSTHOG_KEY=
VITE_PUBLIC_POSTHOG_HOST=

FRONTEND_PORT_BINDING=
```

## API Documentation

### Endpoints

#### `GET /healthcheck`
Health check endpoint for monitoring.

**Response:** `204 No Content`

#### `GET /notes`
Retrieve all notes (titles and metadata only).

**Query Parameters:**
- `orderBy` (optional): `title` | `createdAt` (default: `title`)
- `ascending` (optional): `true` | `false` (default: `true`)

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Note Title",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### `GET /notes/:id`
Retrieve a specific note's encrypted content.

**Query Parameters:**
- `passphrase` (required): The passphrase to decrypt the note

**Response:**
```json
{
  "id": "uuid",
  "title": "Note Title",
  "text": "Decrypted note content",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### `GET /notes/:id` (Check Existence)
Check if a note exists without retrieving content.

**Headers:**
- `Accept: application/vnd.secret-notes.check-existance+json`

**Response:** `204 No Content` (exists) or `404 Not Found`

#### `POST /notes`
Create a new encrypted note.

**Request Body:**
```json
{
  "title": "Note Title",
  "text": "Note content in markdown",
  "passphrase": "encryption_passphrase"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Note Title",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

## Security

### Encryption
- **Algorithm**: AES-256-GCM
- **Key Derivation**: PBKDF2 with 100.000 iterations
- **Salt**: 16 random bytes per note
- **IV**: 16 random bytes per note
- **Storage**: Only encrypted data is stored in the database

### Best Practices
- Passphrases are never stored or transmitted in plain text
- Each note has unique salt and IV for maximum security
- HTTPS recommended for production deployment
- Regular security scans with Snyk
- Code quality monitoring with SonarQube

## Testing

### Frontend Tests
```bash
cd frontend

# Unit tests
npm run test

# E2E tests
# The TESTS_URL environment variable should be set to the app URL
npm run e2e

# Performance tests
# The TESTS_URL environment variable should be set to the app URL
npm run performance
```

### Backend Tests
```bash
cd backend

# Unit tests
npm run test

# Development tests
npm run dev:test
```

## Deployment

### Jenkins

The project includes a Jenkins pipeline for CI/CD, self-hosted in AWS. The pipeline handles:

- Linting and code quality checks with SonarQube and Snyk
- Running unit tests for both frontend and backend
- Building Docker images for both frontend and backend
- Pushing images to the Docker registry
- Deploying to production with blue-green deployment strategy
- Running end-to-end tests and performance tests after deployment
- Only switching traffic to the new version after successful tests

The Jenkinsfile is located in the `services/jenkins` directory.

### GitHub Actions

The project also includes a GitHub Actions workflow for CI/CD, which performs the same tasks as the Jenkins pipeline. The workflow is defined in `.github/workflows/ci.yml`.

## Development

### Project Structure
```
secret-notes/
├── backend/               # Fastify API server
│   ├── src/
│   │   ├── database/      # Prisma schema and migrations
│   │   ├── services/      # Business logic (crypto, etc.)
│   │   └── index.ts       # Server entry point
│   └── package.json
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── routes/        # TanStack Router pages
│   │   ├── api/           # API client functions
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── package.json
├── services/             # DevOps and deployment
│   ├── app/              # Application deployment scripts
│   ├── jenkins/          # CI/CD pipeline configuration
│   └── sonarqube/        # Code quality analysis
└── package.json          # Workspace configuration
```

### Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
1. Check the [documentation](README.md)
2. Search [existing issues](https://github.com/alejofl/secret-notes/issues)
3. Create a [new issue](https://github.com/alejofl/secret-notes/issues/new) if needed

## Final Remarks

This project was done in an academic environment, as part of the curriculum of **Continuous Integration** from [University of Applied Sciences Technikum Wien (UASTW)](https://www.technikum-wien.at/en/). The project was carried out by Alejo Flores Lucey (ID: if24x390) and Hongseok Choi (ID: if24x387).