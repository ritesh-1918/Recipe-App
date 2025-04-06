# Recipe App

A full-stack recipe application with user authentication, recipe creation, and search functionality.

## Project Structure

This project consists of two main parts:

- **Frontend**: React application with Bootstrap for styling
- **Backend**: Node.js/Express API with MongoDB database

## Features

- User registration and authentication
- Create and share recipes
- Search for recipes
- User profiles
- Responsive design

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Bootstrap
- React Bootstrap

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Local Development Setup

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_ATLAS_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=10000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variable:
   ```
   REACT_APP_API_URL=http://localhost:10000
   ```

4. Start the development server:
   ```
   npm start
   ```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables from your `.env` file

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the following:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Add environment variables from your `.env` file

## Live Demo

- Frontend: [(https://recipe-app-frontendrecipe-app-frontend-6o2gkd4dv-ritesh-1918.vercel.app/home)
- Backend API:[ [https://recipe-app-backend.onrender.com](https://recipe-app-backend.onrender.com)](https://recipe-app-backend-new-2.onrender.com/)

## License

This project is licensed under the MIT License.
