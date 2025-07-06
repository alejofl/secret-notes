# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :x: |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

The Secret Notes team takes security seriously. We appreciate your efforts to responsibly disclose security vulnerabilities.

### Where to Report

For **critical security vulnerabilities**, please email us directly at:
- **Email**: alejo@misterflores.com
- **Subject**: [SECURITY] Secret Notes Vulnerability Report

For **non-critical security issues**, you may create a GitHub issue using our security template.

### What to Include

When reporting a security vulnerability, please include:

1. **Description**: Clear description of the vulnerability
2. **Impact**: Potential impact and affected components
3. **Reproduction**: Step-by-step instructions to reproduce
4. **Proof of Concept**: Code or screenshots (if applicable)
5. **Suggested Fix**: Your recommendations (if any)

### Security Measures

Secret Notes implements multiple security layers:

#### Application Security
- **Symetric encryption** with AES-256-GCM
- **Secure key derivation** using PBKDF2 with 100.000 iterations
- **Input validation** and sanitization
- **XSS protection** with Content Security Policy
- **SQL injection protection** via Prisma ORM

#### Infrastructure Security
- **Docker container** security best practices
- **Regular dependency updates** and vulnerability scanning

#### Data Protection
- **No plaintext storage** of sensitive data
- **Unique salt and IV** per encrypted note
- **Secure passphrase handling**
- **No server-side key storage**

### Security Best Practices for Users

1. **Use strong passphrases** (minimum 8 characters)
2. **Don't share passphrases** via insecure channels
3. **Keep passphrases secure** and backed up safely
4. **Use HTTPS** when accessing the application