# User Authentication with Email/Password Login

Implement a secure user authentication system that supports email and password-based login. This includes user registration, login, logout, session management, and password reset functionality. The system should follow security best practices including password hashing, secure session tokens, and protection against common attacks like brute force and CSRF.

## Tasks

- [ ] Design database schema for users table (id, email, password_hash, created_at, updated_at, email_verified_at)
- [ ] Implement user registration endpoint (POST /auth/register) with email validation and password hashing using bcrypt
- [ ] Implement login endpoint (POST /auth/login) that validates credentials and returns a secure session token or JWT
- [ ] Implement logout endpoint (POST /auth/logout) that invalidates the session token or JWT
- [ ] Implement authentication middleware to protect routes by verifying session tokens on incoming requests
- [ ] Implement email verification flow: send verification email on registration and handle verification link (GET /auth/verify-email)
- [ ] Implement password reset flow: forgot password endpoint (POST /auth/forgot-password) and reset password endpoint (POST /auth/reset-password) with time-limited tokens
- [ ] Add rate limiting to authentication endpoints to prevent brute force attacks
- [ ] Build login and registration UI forms with validation, error handling, and loading states
- [ ] Write integration tests covering registration, login, logout, email verification, and password reset flows
