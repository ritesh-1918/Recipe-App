# Vercel Deployment Guide for Recipe App

This guide will walk you through deploying your Recipe App to Vercel, making it accessible online to anyone.

## Prerequisites

- A Vercel account (free at [vercel.com](https://vercel.com))
- Vercel CLI installed (we'll check this in the steps below)
- Your Recipe App code ready for deployment

## Step 1: Prepare Your Frontend

✅ **File Extensions Fixed**: All component imports in App.js have been updated to use .jsx extensions.

✅ **Files Renamed**: Component files have been renamed from .js to .jsx to match the imports.

✅ **Environment Variables**: Your frontend .env file is configured with:
```
REACT_APP_API_URL=https://recipe-app-backend.onrender.com
```

✅ **Vercel Configuration**: Your vercel.json file is properly configured.

## Step 2: Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```
   vercel login
   ```
   This will open a browser window for authentication.

3. **Deploy the Frontend**:
   ```
   cd frontend
   vercel
   ```
   
   When prompted:
   - Set up and deploy? **Yes**
   - Which scope? **Select your account**
   - Link to existing project? **No**
   - What's your project name? **recipe-app-frontend** (or your preferred name)
   - In which directory is your code located? **./** (current directory)
   - Want to override settings? **No**

4. **Set Environment Variables**:
   After deployment, go to the Vercel dashboard:
   - Select your project
   - Go to Settings > Environment Variables
   - Add: `REACT_APP_API_URL` = `https://recipe-app-backend.onrender.com`
   - Click Save
   - Redeploy your application for changes to take effect

## Step 3: Verify Deployment

1. **Check Your Frontend**:
   - Visit your Vercel deployment URL (provided after deployment)
   - Test user registration and login
   - Try creating and searching for recipes

2. **Troubleshooting**:
   - If you encounter CORS issues, ensure your backend CORS configuration includes your Vercel domain
   - Check Vercel deployment logs for any errors
   - Verify environment variables are correctly set

## Backend Configuration

Your backend is already configured with CORS settings that allow requests from:
- http://localhost:3000 (local development)
- https://recipe-app-frontend.vercel.app (production)

If your Vercel domain is different, update the CORS configuration in your backend's server.js file.

## Congratulations!

Your Recipe App should now be successfully deployed and accessible online. Share your Vercel URL with friends and family to let them use your application!