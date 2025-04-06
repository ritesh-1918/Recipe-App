# Deployment Troubleshooting Guide

Based on the issues observed with your deployed Recipe App, here are the steps to fix both the frontend and backend deployments.

## Frontend Issues (Vercel)

Your frontend is currently only showing "Hello world!" instead of the full application. Here's how to fix it:

### 1. Fix File Extension Mismatches

There's a mismatch between imported file extensions in App.js and actual file extensions:

1. Open `frontend/src/App.js` and update these imports to match the actual file extensions:
   ```javascript
   // Change this:
   import Home from './pages/Home'
   // To this:
   import Home from './pages/Home.jsx'
   
   // Also check other imports like:
   import CreateRecipe from './pages/CreateRecipe.jsx'
   import Dashboard from './pages/Dashboard.jsx'
   ```

### 2. Update Vercel Configuration

1. Make sure your `frontend/.env` file contains the correct backend URL:
   ```
   REACT_APP_API_URL=https://recipe-app-backend.onrender.com
   ```

2. In your Vercel dashboard:
   - Go to your project settings
   - Under "Environment Variables", verify that `REACT_APP_API_URL` is set correctly
   - Make sure the "Root Directory" is set to `frontend` (not the entire repository)
   - Ensure the "Framework Preset" is set to "Create React App"

3. Redeploy your frontend by pushing changes to GitHub or using the "Redeploy" button in Vercel dashboard

## Backend Issues (Render)

Your backend is showing "Not Found", which indicates routing or server configuration issues:

### 1. Check Render Configuration

1. In your Render dashboard:
   - Verify that the "Start Command" is set to `node server.js`
   - Confirm that the "Build Command" is set to `npm install`
   - Make sure the environment variables are set correctly:
     - `MONGODB_ATLAS_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `PORT`: 10000

2. Check the logs in Render dashboard for any errors during deployment

### 2. Update CORS Configuration

Your server.js has CORS configured, but make sure the frontend URL is correct:

```javascript
app.use(cors({
    origin: ['http://localhost:3000', 'https://recipe-app-frontend.vercel.app'],
    credentials: true
}));
```

Update the Vercel domain if it's different from what's listed above.

### 3. Check API Routes

Make sure your API routes are working correctly:

1. Test the root route by visiting `https://recipe-app-backend.onrender.com/`
2. Test the debug route by visiting `https://recipe-app-backend.onrender.com/debug`
3. Check if API endpoints are accessible: `https://recipe-app-backend.onrender.com/api/recipes`

## General Troubleshooting

### 1. Redeploy Both Services

Sometimes a fresh deployment can resolve issues:

1. Make small changes to both frontend and backend code
2. Commit and push to GitHub
3. Render and Vercel should automatically redeploy

### 2. Check Network Requests

Use browser developer tools to check network requests:

1. Open your deployed frontend in Chrome
2. Press F12 to open developer tools
3. Go to the Network tab
4. Reload the page and look for failed API requests
5. Check the console for any JavaScript errors

### 3. Verify MongoDB Connection

Ensure your MongoDB Atlas connection is working:

1. Check if your IP address is whitelisted in MongoDB Atlas
2. Verify that your database user has the correct permissions
3. Make sure your connection string is correctly formatted

## Next Steps

If you're still experiencing issues after trying these steps:

1. Check the deployment logs in both Vercel and Render dashboards
2. Try deploying a simplified version of your app to isolate the issue
3. Consider using environment-specific configuration for development vs. production

Remember that deployment issues are common and usually fixable with the right configuration adjustments!