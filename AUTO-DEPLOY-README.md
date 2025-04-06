# Automated Deployment Guide for Recipe App

This guide explains how to use the automated deployment script to deploy both the frontend and backend of your Recipe App without manual intervention.

## Prerequisites

Before running the automated deployment script, make sure you have:

1. **Node.js and npm** installed on your system
2. **PowerShell** (already available on Windows)
3. **Git** installed and configured
4. **Vercel account** - Sign up at [vercel.com](https://vercel.com) if you don't have one
5. **Render account** - Sign up at [render.com](https://render.com) if you don't have one

## What the Script Does

The `deploy-auto.ps1` script automates the following tasks:

### For Frontend (Vercel)
1. Fixes file extension issues in App.js (adds .jsx extensions to imports)
2. Updates the .env file with the correct backend URL
3. Creates or updates vercel.json configuration
4. Installs Vercel CLI if not already installed
5. Logs in to Vercel (you'll be prompted to authenticate)
6. Deploys the frontend to Vercel with the correct environment variables

### For Backend (Render)
1. Ensures render.yaml is correctly configured
2. Installs Render CLI if not already installed
3. Logs in to Render (you'll be prompted to authenticate)
4. Deploys the backend to Render with the correct configuration

## How to Run the Script

1. Open PowerShell as Administrator
2. Navigate to your project directory:
   ```
   cd "C:\AICTE\Recipe-app 1918"
   ```
3. Run the deployment script:
   ```
   .\deploy-auto.ps1
   ```
4. Follow the authentication prompts when asked to log in to Vercel and Render

## First-Time Authentication

The first time you run the script, you'll need to authenticate with both Vercel and Render:

- For **Vercel**: A browser window will open asking you to log in
- For **Render**: You'll need to provide your API key from the Render dashboard

## Troubleshooting

If you encounter any issues during deployment:

1. **Check the console output** for specific error messages
2. Ensure you have proper internet connectivity
3. Verify that your Vercel and Render accounts have the necessary permissions
4. Make sure your MongoDB Atlas connection string is correctly configured in Render

## After Deployment

Once deployment is complete, you can access your application at:

- **Frontend**: https://recipe-app-frontend.vercel.app
- **Backend**: https://recipe-app-backend.onrender.com

The script will display these URLs upon successful deployment.