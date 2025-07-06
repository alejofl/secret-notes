---
name: 🔒 Security Issue
about: Report a security vulnerability (please use email for critical issues)
title: '[SECURITY] '
labels: ['security', 'needs-triage']
assignees: ['alejofl']

---

⚠️ **For critical security vulnerabilities, please email alejo@misterflores.com instead of creating a public issue.**

## Security Issue Description
A clear and concise description of the security issue or vulnerability.

## Severity Level
- [ ] Critical (Immediate action required)
- [ ] High (Action required within 24-48 hours)
- [ ] Medium (Action required within 1 week)
- [ ] Low (Action required within 1 month)
- [ ] Informational (No immediate action required)

## Issue Type
- [ ] Authentication vulnerability
- [ ] Authorization vulnerability
- [ ] Data exposure
- [ ] Injection vulnerability (SQL, XSS, etc.)
- [ ] Cryptographic issue
- [ ] Configuration issue
- [ ] Dependency vulnerability
- [ ] Other: ___________

## Affected Components
- [ ] Frontend (React application)
- [ ] Backend (Fastify API)
- [ ] Database (PostgreSQL)
- [ ] Encryption system
- [ ] Authentication system
- [ ] Docker configuration
- [ ] CI/CD pipeline
- [ ] Dependencies

## Steps to Reproduce
**Please provide minimal steps to reproduce the vulnerability:**

1. Go to '...'
2. Click on '....'
3. Execute '....'
4. Observe security issue

## Expected Behavior
What should happen from a security perspective?

## Actual Behavior
What actually happens that creates a security risk?

## Impact Assessment
**Who could be affected?**
- [ ] All users
- [ ] Specific user types
- [ ] Administrators only
- [ ] Limited to specific configurations

**What data could be compromised?**
- [ ] User passwords/passphrases
- [ ] Encrypted note content
- [ ] User metadata
- [ ] System configuration
- [ ] No data at risk

**What actions could an attacker perform?**
- [ ] Access unauthorized data
- [ ] Modify data
- [ ] Delete data
- [ ] Escalate privileges
- [ ] Denial of service
- [ ] Other: ___________

## Proof of Concept
If you have a proof of concept, please provide it here (sanitized of any real user data):

```
Provide code, commands, or steps here
```

## Mitigation Suggestions
If you have ideas for how to fix this vulnerability:

## Environment
- Version: [e.g. 0.1.0]
- Environment: [e.g. production, development, local]
- Browser: [if frontend related]
- Operating System: [if relevant]

## References
Any relevant security advisories, CVEs, or documentation:

## Additional Context
Any other context about the security issue.

## Responsible Disclosure
- [ ] I understand this is a public repository
- [ ] I have not disclosed this vulnerability publicly elsewhere
- [ ] I am willing to work with the maintainers to resolve this issue
- [ ] I understand that critical issues should be reported via email

## Checklist
- [ ] I have verified this is a security issue and not a feature request
- [ ] I have provided clear reproduction steps
- [ ] I have assessed the potential impact
- [ ] I have considered responsible disclosure practices
