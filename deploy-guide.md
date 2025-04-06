# Deployment Guide for Recipe App

This guide will walk you through the process of deploying your Recipe App to GitHub, Render (backend), and Vercel (frontend).

## 1. Push Your Code to GitHub

First, let's push your code to the GitHub repository you've created.

### Initialize Git and Push to GitHub

1. Open a terminal/command prompt and navigate to your project root directory:
   ```
   cd c:\AICTE\Recipe-app 1918
   ```

2. Initialize a Git repository:
   ```
   git init
   ```

3. Add all files to staging:
   ```
   git add .
   ```

4. Commit the files:
   ```
   git commit -m "Initial commit"
   ```

5. Add your GitHub repository as the remote origin:
   ```
   git remote add origin https://github.com/ritesh-1918/Recipe-APP.git
   ```

6. Push your code to GitHub:
   ```
   git push -u origin main
   ```
   (If your default branch is 'master' instead of 'main', use `git push -u origin master`)

## 2. Deploy Backend to Render

1. Create a Render account if you don't have one: [https://render.com](https://render.com)

2. From your Render dashboard, click "New" and select "Web Service".

3. Connect your GitHub repository (you may need to authorize Render to access your GitHub account).

4. Configure your web service:
   - **Name**: recipe-app-backend
   - **Environment**: Node
   - **Region**: Choose the region closest to your users
   - **Branch**: main (or master)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

5. Add environment variables (click "Advanced" then "Add Environment Variable"):
   - `MONGODB_ATLAS_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: 10000

6. Click "Create Web Service". Render will deploy your backend.

7. Once deployed, note the URL of your backend service (e.g., https://recipe-app-backend.onrender.com).

## 3. Deploy Frontend to Vercel

1. Create a Vercel account if you don't have one: [https://vercel.com](https://vercel.com)

2. From your Vercel dashboard, click "Add New" and select "Project".

3. Import your GitHub repository.

4. Configure your project:
   - **Framework Preset**: Create React App
   - **Root Directory**: frontend

5. Add environment variables:
   - `REACT_APP_API_URL`: The URL of your Render backend (e.g., https://recipe-app-backend.onrender.com)

6. Click "Deploy". Vercel will deploy your frontend.

7. Once deployed, Vercel will provide you with a URL for your frontend application.

## 4. Verify Your Deployment

1. Visit your frontend URL and test the application:
   - Register a new user
   - Log in with the registered user
   - Create a new recipe
   - Search for recipes

2. If you encounter any issues:
   - Check the logs in Render and Vercel dashboards
   - Verify your environment variables are set correctly
   - Ensure your CORS configuration in the backend allows requests from your frontend URL

## 5. Update Your Application (If Needed)

If you need to make changes to your application:

1. Make your changes locally
2. Commit and push to GitHub:
   ```
   git add .
   git commit -m "Your commit message"
   git push
   ```

3. Render and Vercel will automatically redeploy your application when changes are pushed to GitHub.

## Congratulations!

Your Recipe App is now deployed and accessible to everyone on the internet. Users can register, create recipes, and use all the features of your application.