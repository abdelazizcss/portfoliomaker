# GitHub Integration Troubleshooting Guide

If you're experiencing issues with the GitHub integration in Portfolio Maker, here are some common problems and their solutions.

## Common Issues

### 1. Error: "Failed to parse URL from /api/projects"

**Cause**: This error occurs when the server-side code tries to use a relative URL.

**Solution**:
- The fix has been implemented by directly using the Supabase client in the server component instead of making an API call.
- If you see this error, make sure you're using the latest version of the code.

### 2. Error: "Database permission error: Row Level Security is blocking access"

**Cause**: Supabase Row Level Security (RLS) policies are preventing access to the database tables.

**Solution**:
- Run the SQL script to fix RLS policies: `fix_all_rls.sql`
- Alternatively, temporarily disable RLS for testing:
  ```sql
  ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
  ALTER TABLE users DISABLE ROW LEVEL SECURITY;
  ```

### 3. Error: "User not found in database"

**Cause**: The user's profile hasn't been created in the database yet.

**Solution**:
- Make sure the user has completed their profile setup first
- Check if the user exists in the `users` table in the database
- Update the user profile before attempting to import GitHub repositories

### 4. Error: "The projects table does not exist"

**Cause**: The database schema hasn't been properly initialized.

**Solution**:
- Run the database setup script: `create_tables.sql`
- Check the Supabase console to verify that all tables exist

## Debugging Steps

1. **Check GitHub Username**:
   - Make sure the user's GitHub username is correctly set in their profile
   - Verify that the GitHub account has public repositories

2. **Check API Responses**:
   - Look at the browser's developer console for API errors
   - Check the server logs for more detailed error information

3. **Verify Database Connection**:
   - Make sure Supabase credentials are correctly set in environment variables
   - Test the database connection using the diagnostic tools

4. **Check GitHub API Rate Limits**:
   - GitHub API has rate limits that might affect repository fetching
   - Consider using a GitHub token to increase rate limits

## Quick Fixes

If you're getting errors when importing GitHub repositories, try these quick fixes:

1. **Update profile information first**: Complete your profile setup before importing repositories
2. **Disable RLS temporarily**: Run `ALTER TABLE projects DISABLE ROW LEVEL SECURITY;`
3. **Check database setup**: Make sure all tables are created
4. **Verify GitHub connectivity**: Check if you can access GitHub API directly

If problems persist, check the error logs and reach out for support.
