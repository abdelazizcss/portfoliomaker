# GitHub Integration in Portfolio Maker

This document explains how the GitHub integration works in the Portfolio Maker application.

## Features

- **GitHub Authentication**: Users sign in with their GitHub accounts
- **Repository Fetching**: Fetch user's public repositories from GitHub
- **Project Import**: Import GitHub repositories as portfolio projects
- **Automatic Data Mapping**: Automatically extract project details from GitHub repositories

## How It Works

### 1. Authentication

The application uses NextAuth.js with GitHub provider to authenticate users:

```javascript
GitHubProvider({
  clientId: process.env.GITHUB_ID!,
  clientSecret: process.env.GITHUB_SECRET!,
  authorization: {
    params: {
      scope: 'read:user user:email',
    },
  },
})
```

When a user signs in, their GitHub username is stored in the user's session.

### 2. Repository Fetching

The application fetches the user's GitHub repositories using the GitHub API:

1. The client makes a request to `/api/github` endpoint
2. The server verifies the user's session and retrieves their GitHub username
3. The server makes a request to the GitHub API: `https://api.github.com/users/{username}/repos`
4. The response is mapped to the application's GitHubRepo interface and returned to the client

### 3. Project Import

Users can import repositories as projects:

1. User selects repositories from the GitHubSync component
2. The client sends a POST request to `/api/github` with the repository full name
3. The server fetches the repository details from GitHub
4. The server creates a new project with the repository data
5. The project is saved to the database and returned to the client

### 4. Data Mapping

GitHub repository data is mapped to project data:

- Repository name → Project title
- Repository description → Project description
- Repository URL → GitHub link
- Repository homepage → Demo link
- Repository language and topics → Technologies
- Repository type → Project category

## Implementation Details

### Components

- **GitHubSync**: UI component for fetching and selecting repositories
- **ProjectModal**: Modal for editing project details after import

### API Routes

- **GET /api/github**: Fetches user's GitHub repositories
- **POST /api/github**: Imports a repository as a project

### Utility Functions

- **fetchGitHubRepositories**: Fetches repositories from GitHub API
- **importGitHubRepository**: Imports a repository as a project
- **determineCategory**: Determines project category based on repository data

## Configuration

To use GitHub integration, ensure these environment variables are set:

```
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
NEXTAUTH_URL=your-app-url
NEXTAUTH_SECRET=your-secret-key
```

For higher rate limits, you can also provide a GitHub API token:

```
GITHUB_API_TOKEN=your-github-personal-access-token
```

## Troubleshooting

- If repositories aren't loading, check the GitHub username in the user's profile
- If import fails, check the GitHub API rate limits
- Check browser console for detailed error messages
