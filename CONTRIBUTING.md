# Contributing to Secret Notes

Thank you for your interest in contributing to Secret Notes! This document provides guidelines and instructions for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- **Be respectful** and inclusive in all interactions
- **Be collaborative** and open to feedback
- **Be constructive** in criticism and suggestions
- **Be patient** with newcomers and different skill levels
- **Report** unacceptable behavior to the maintainers

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 22+** installed
- **Docker** and **Docker Compose** for local development
- **Git** for version control
- Basic knowledge of **TypeScript**, **React**, and **Fastify**

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/your-username/secret-notes.git
   cd secret-notes
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/alejofl/secret-notes.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp backend/.env.sample backend/.env.local
   cp frontend/.env.sample frontend/.env.local
   # Edit the files with your local configuration
   ```

5. **Start development environment**
   ```bash
   # Start database
   npm run dev:db:up
   
   # In separate terminals:
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

## How to Contribute

### Reporting Issues

Before creating an issue:

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** provided
3. **Provide clear reproduction steps** for bugs
4. **Include environment details** (OS, Node version, etc.)

### Suggesting Features

For feature requests:

1. **Check the roadmap** in README.md first
2. **Open a discussion** before implementing large features
3. **Explain the use case** and benefits
4. **Consider the impact** on existing functionality

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes**
   - Follow the coding standards (see below)
   - Write tests for new functionality
   - Update documentation if needed
   - Ensure all tests pass

3. **Commit your changes**
   ```bash
   # Use conventional commit messages
   git commit -m "feat: add user authentication feature"
   git commit -m "fix: resolve database connection issue"
   git commit -m "docs: update API documentation"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR through GitHub interface
   ```

5. **PR Requirements**
   - Clear description of changes
   - Link to related issues
   - All tests passing
   - Code review approval
   - Documentation updates (if applicable)

## Coding Standards

### TypeScript/JavaScript

- **Use TypeScript** for all new code
- **Use meaningful variable names** and comments
- **Handle errors gracefully** with proper error messages

### React Components

- **Use functional components** with hooks
- **Follow naming conventions**: PascalCase for components, camelCase for functions
- **Keep components small** and focused on single responsibility
- **Use TypeScript interfaces** for prop types
- **Implement proper error boundaries**

### Backend Development

- **Use Fastify patterns** for route handlers
- **Implement proper validation** with Zod schemas
- **Use Prisma** for database interactions
- **Add proper error handling** and logging
- **Write unit tests** for all business logic

### Database

- **Use Prisma migrations** for schema changes
- **Add proper indexes** for performance
- **Follow PostgreSQL best practices**
- **Consider data privacy** and security implications

## Documentation

### Code Documentation

- **Add JSDoc comments** for complex functions
- **Include examples** in documentation
- **Keep README.md updated** with new features

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add user authentication system
fix(api): resolve note encryption issue
docs(readme): update installation instructions
test(frontend): add unit tests for note components
```

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. Update version in `package.json`
3. Run full test suite
4. Create release PR
5. Tag release after merge
6. Deploy to production

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: alejo@misterflores.com for sensitive issues

### Development Support

- Check existing documentation first
- Search closed issues for similar problems
- Provide minimal reproduction examples
- Include relevant environment details

## Recognition

Contributors will be recognized in:
- **README.md contributors section**
- **Release notes** for significant contributions

Thank you for contributing to Secret Notes! 🚀
