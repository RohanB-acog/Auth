# Next.js Authentication System with Admin Dashboard

A secure authentication system built with Next.js 13, featuring OTP-based login, admin dashboard, and social authentication.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [OAuth Configuration](#oauth-configuration)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Admin Access](#admin-access)
- [Development & Deployment](#development--deployment)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)
- [License](#license)
- [Support](#support)

## Features
- 🔐 OTP-based email authentication
- 🌐 Social login (Google, GitHub)
- 👑 Admin dashboard
- 👤 User dashboard
- 📝 Profile management
- 📱 Responsive design

## Prerequisites
- Node.js 16.x or later
- npm or yarn
- Gmail account
- Google Cloud Console account
- GitHub account

## Installation

1. Clone and install:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   npm install
   ```

2. Environment variables setup (`.env`):
   ```env
   # App
   NEXTAUTH_SECRET=your-secret-key-min-32-chars-long
   NEXTAUTH_URL=http://localhost:3000
   
   # Email (Gmail)
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   
   # OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   GMAIL_USER=brohan2208@gmail.com

   ```

## OAuth Configuration

### Google OAuth Setup
1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Create New Project or Select Existing
3. Navigate to **APIs & Services > Credentials**
4. Configure OAuth Consent Screen:
   - User Type: External
   - App Name: Your App Name
   - Support Email: Your Email
   - Developer Contact: Your Email
5. Create OAuth Client ID:
   - Application Type: Web application
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://your-domain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-domain.com/api/auth/callback/google` (production)
6. Copy credentials to `.env` file

### GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in application details:
   - Application name: Your App Name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. After registration, copy credentials to `.env` file

## Database Schema
```sql
-- Users Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- OTP Codes Table
CREATE TABLE otp_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  code TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## API Documentation
### Authentication Endpoints
```typescript
// POST /api/auth/otp
{
  method: 'POST',
  body: {
    email: string // Required
  },
  response: {
    userId: string,
    code: string // Development only
  }
}
```

## Admin Access
### Setup Admin Account
- Delete existing `company.db` file (if exists)
- Register using email format: `username+admin@aganitha.ai`
- Example: `john+admin@aganitha.ai`
- OTP will be sent to `john@aganitha.ai`
- After verification, admin access is granted
- Access admin dashboard at `/admin`

## Development & Deployment
### Development
```sh
npm run dev
# or
yarn dev
```

### Docker
```
docker run -it --rm \
  -v "$(pwd):/app" \
  -w /app \
  -v "$(pwd)/database.sqlite:/app/database.sqlite" \
  --label security=none \
  --label port=3000 \
  -e NODE_ENV=development \
  --env-file .env.local \
  --name <name> \
  --label description "My auth app"
  node:lts-slim \
  sh -c "apt-get update && apt-get install -y python3 make g++ && npm install && npm run dev"
```
### Production
```sh
npm run build
npm start
# or using yarn
yarn build
yarn start
```

## Security Considerations
- Never commit `.env` file
- Regularly rotate secrets
- Use strong `NEXTAUTH_SECRET`

## Troubleshooting
### Common Issues
- **OTP Email Issues:**
  - Check spam folder
  - Verify `EMAIL_APP_PASSWORD`
  - Ensure 2FA is enabled on Gmail

## Maintenance
- Keep dependencies updated
- Check for security patches
- Monitor system logs

## License
This project is licensed under the MIT License.

## Support
For support, email `support@aganitha.ai` or create an issue in the repository.

