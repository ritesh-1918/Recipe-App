# FLAVORBook - Recipe Sharing Application

A full-stack web application for sharing and discovering recipes.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete recipes
- Browse recipes from other users
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication

## Live Demo

- Frontend: [https://recipe-app-frontendrecipe-app-frontend-3rkpq2g4r-ritesh-1918.vercel.app](https://recipe-app-frontendrecipe-app-frontend-3rkpq2g4r-ritesh-1918.vercel.app)
- Backend API: [https://recipe-app-backend-new-2.onrender.com](https://recipe-app-backend-new-2.onrender.com)

## API Endpoints

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get a specific recipe
- `POST /api/recipes` - Create a new recipe (requires authentication)
- `PUT /api/recipes/:id` - Update a recipe (requires authentication)
- `DELETE /api/recipes/:id` - Delete a recipe (requires authentication)
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create a `.env` file with the following variables: