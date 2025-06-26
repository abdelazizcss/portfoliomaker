# GitHub OAuth Integration for Portfolio Deployment

This document explains how to set up GitHub OAuth for automatic portfolio deployment to GitHub Pages.

## Overview

The Portfolio Maker application allows users to deploy their portfolios directly to GitHub Pages using OAuth authentication. This provides a seamless experience where users can:

1. Sign in with their GitHub account
2. Create their portfolio within the application
3. Deploy directly to GitHub Pages with one click
4. Get a public URL to share their portfolio

## Setup Requirements

### 1. GitHub OAuth Application

You need to create a GitHub OAuth application with the following settings:

```
Application name: Portfolio Maker
Homepage URL: https://your-app-domain.com
Authorization callback URL: https://your-app-domain.com/api/auth/callback/github
```

### 2. Required Environment Variables

```
GITHUB_ID=your-oauth-app-client-id
GITHUB_SECRET=your-oauth-app-client-secret
NEXTAUTH_URL=https://your-app-domain.com
NEXTAUTH_SECRET=your-nextauth-secret
```

### 3. OAuth Scopes

The application requires the following OAuth scopes:
- `read:user`: To access user profile information
- `user:email`: To access user email
- `repo`: To create and update repositories for portfolio deployment

## How It Works

### Authentication Flow

1. User signs in with GitHub using NextAuth.js
2. The application requests basic scopes (`read:user`, `user:email`)
3. When deploying, if repo scope isn't present, the user is redirected to grant additional permissions
4. The access token is stored securely in the user's session

### Deployment Process

1. User clicks "Deploy to GitHub" in the dashboard
2. The application checks if the user's token has the required scopes
3. If not, it redirects to GitHub to request additional permissions
4. Once permissions are granted, the application:
   - Creates a new repository (or updates an existing one)
   - Generates the HTML/CSS/JS files for the portfolio
   - Enables GitHub Pages for the repository
   - Returns links to both the repository and the live site

## Security Considerations

- Access tokens are stored securely in the user's session
- Tokens are not persisted in the database
- All API calls use HTTPS
- Users can revoke access at any time from their GitHub settings

## Troubleshooting

### "GitHub token not found"
- Ensure the user has authenticated with GitHub
- Try signing out and signing back in

### "Repository already exists"
- This is normal if deploying to an existing repository
- The application will update the repository rather than creating a new one

### "Error creating GitHub Pages site"
- Check that the repository doesn't already have GitHub Pages enabled on a different branch
- You may need to delete the repository and try again

### "Site doesn't appear after deployment"
- GitHub Pages can take a few minutes to build and deploy
- Wait 5-10 minutes and try again
