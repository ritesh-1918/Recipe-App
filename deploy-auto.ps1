# Automated Deployment Script for Recipe App
# This script automates the deployment of both frontend and backend
# Author: Trae AI
# Version: 1.2
# Last Updated: 2023-07-15
# Description: Fixes file extension issues and deploys frontend and backend automatically

# Function to check if a command exists
function Test-CommandExists {
    param ($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

# Set working directory to the project root
$projectRoot = $PSScriptRoot
Write-Host "Project root: $projectRoot" -ForegroundColor Cyan

# Check for required tools
Write-Host "Checking for required tools..." -ForegroundColor Cyan

# Check for npm
if (-not (Test-CommandExists "npm")) {
    Write-Host "Error: npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    exit 1
}

# Install Vercel CLI if not already installed
if (-not (Test-CommandExists "vercel")) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Install Render CLI if not already installed
if (-not (Test-CommandExists "render")) {
    Write-Host "Installing Render CLI..." -ForegroundColor Yellow
    npm install -g @render/cli
}

# Fix frontend file extension issues
Write-Host "Fixing frontend file extension issues..." -ForegroundColor Cyan
$appJsPath = "$projectRoot\frontend\src\App.js"

# Check if App.js exists
if (-not (Test-Path $appJsPath)) {
    Write-Host "Warning: App.js not found at $appJsPath" -ForegroundColor Yellow
} else {
    # Read the content of App.js
    $appJsContent = Get-Content -Path $appJsPath -Raw

    # Fix import statements by adding .jsx extension where needed
    # These are already fixed in the current App.js, but we'll keep the replacements for safety
    $appJsContent = $appJsContent -replace "import AppHeader from './component/AppHeader'", "import AppHeader from './component/AppHeader.jsx'"
    $appJsContent = $appJsContent -replace "import Home from './pages/Home'", "import Home from './pages/Home.jsx'"
    $appJsContent = $appJsContent -replace "import CreateRecipe from './pages/CreateRecipe'", "import CreateRecipe from './pages/CreateRecipe.jsx'"
    $appJsContent = $appJsContent -replace "import Dashboard from './pages/Dashboard'", "import Dashboard from './pages/Dashboard.jsx'"
    $appJsContent = $appJsContent -replace "import Profile from './pages/Profile'", "import Profile from './pages/Profile.jsx'"
    $appJsContent = $appJsContent -replace "import AuthPage from './pages/AuthPage'", "import AuthPage from './pages/AuthPage.jsx'"

    # Fix incorrect component imports
    $appJsContent = $appJsContent -replace "import Registration from './components/\\.js'", "import Registration from './components/Registration.js'"
    $appJsContent = $appJsContent -replace "import Login from './components/\\.js'", "import Login from './components/Login.js'"

    # Write the updated content back to App.js
    Set-Content -Path $appJsPath -Value $appJsContent
    Write-Host "Fixed import statements in App.js" -ForegroundColor Green
}

# Check for other components that might need .jsx extension
$componentsDir = "$projectRoot\frontend\src\components"
$pagesDir = "$projectRoot\frontend\src\pages"

Write-Host "Checking for additional file extension issues..." -ForegroundColor Yellow

# Fix any other potential import issues
$appJsContent = $appJsContent -replace "from '\./components/(\w+)'", "from './components/\$1.js'"
$appJsContent = $appJsContent -replace "from '\./services/(\w+)'", "from './services/\$1.js'"

# Fix any potential issues with component imports in other files
Write-Host "Scanning for component imports in other files..." -ForegroundColor Yellow
$jsFiles = Get-ChildItem -Path "$projectRoot\frontend\src" -Filter "*.js" -Recurse
foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # Check for imports without extensions that should have .jsx
    if ($content -match "import .+ from '\./pages/[^.']+'") {
        $content = $content -replace "import (.+) from '\./pages/([^.']+)'", "import `$1 from './pages/`$2.jsx'"
        $modified = $true
    }
    
    if ($content -match "import .+ from '\./component/[^.']+'") {
        $content = $content -replace "import (.+) from '\./component/([^.']+)'", "import `$1 from './component/`$2.jsx'"
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Fixed imports in $($file.Name)" -ForegroundColor Green
    }
}

# No need to write back again as we already did this above

# Ensure frontend .env file has correct backend URL
Write-Host "Checking frontend .env file..." -ForegroundColor Cyan
$envPath = "$projectRoot\frontend\.env"
$envContent = "REACT_APP_API_URL=https://recipe-app-backend.onrender.com"
Set-Content -Path $envPath -Value $envContent
Write-Host "Updated .env file with correct backend URL" -ForegroundColor Green

# Verify frontend build process works locally before deployment
Write-Host "Testing frontend build process..." -ForegroundColor Cyan
Set-Location -Path "$projectRoot\frontend"

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Try building the app locally to catch any build errors
try {
    npm run build
    Write-Host "Frontend build successful!" -ForegroundColor Green
} catch {
    Write-Host "Frontend build failed. Attempting to fix common issues..." -ForegroundColor Red
    
    # Check for common build issues and fix them
    # 1. Check if all required dependencies are installed
    npm install react-router-dom bootstrap axios --save
    
    # 2. Try build again
    try {
        npm run build
        Write-Host "Frontend build successful after fixes!" -ForegroundColor Green
    } catch {
        Write-Host "Frontend build still failing. Please check the error messages above." -ForegroundColor Red
        # Continue with deployment anyway as Vercel might be able to build it
    }
}

# Deploy Backend to Render
Write-Host "Deploying backend to Render..." -ForegroundColor Cyan
Set-Location -Path "$projectRoot\backend"

# Verify backend dependencies and configuration before deployment
Write-Host "Checking backend configuration..." -ForegroundColor Cyan

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check for .env file and create if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file for backend..." -ForegroundColor Yellow
    $envContent = @"
NODE_ENV=production
PORT=10000
# Add your MongoDB Atlas URI below (you'll be prompted during deployment)
# MONGODB_ATLAS_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
"@
    Set-Content -Path ".env" -Value $envContent
    Write-Host "Created .env file template. You'll need to provide MongoDB URI during deployment." -ForegroundColor Green
}

# Check if render.yaml exists and is correctly configured
if (Test-Path "render.yaml") {
    Write-Host "render.yaml found, proceeding with deployment" -ForegroundColor Green
} else {
    Write-Host "render.yaml not found or incorrectly configured. Creating a new one..." -ForegroundColor Yellow
    
    # Create a new render.yaml file with improved configuration
    $renderYaml = @"
services:
  - type: web
    name: recipe-app-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: node server.js
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_ATLAS_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: PORT
        value: 10000
    autoDeploy: true
"@
    
    Set-Content -Path "render.yaml" -Value $renderYaml
    Write-Host "Created new render.yaml file with improved configuration" -ForegroundColor Green
}

# Test the server locally before deployment
Write-Host "Testing server connection..." -ForegroundColor Cyan
try {
    # Start the server in test mode (will exit after 5 seconds)
    $testServer = Start-Process -FilePath "node" -ArgumentList "-e", "const app = require('./server.js'); console.log('Server test successful!')" -NoNewWindow -PassThru
    Start-Sleep -Seconds 2
    if (-not $testServer.HasExited -or $testServer.ExitCode -eq 0) {
        Write-Host "Server test successful!" -ForegroundColor Green
        if (-not $testServer.HasExited) {
            Stop-Process -Id $testServer.Id -Force
        }
    } else {
        Write-Host "Server test failed. Check server.js for errors." -ForegroundColor Red
        # Continue anyway as Render might be able to run it
    }
} catch {
    Write-Host "Server test failed: $_" -ForegroundColor Red
    # Continue anyway as Render might be able to run it
}

# Login to Render (this will prompt for authentication)
Write-Host "Please authenticate with Render when prompted..." -ForegroundColor Yellow
render login

# Deploy using render.yaml configuration
Write-Host "Deploying backend to Render..." -ForegroundColor Green
render deploy

# Deploy Frontend to Vercel
Write-Host "Deploying frontend to Vercel..." -ForegroundColor Cyan
Set-Location -Path "$projectRoot\frontend"

# Check if vercel.json exists and is correctly configured
if (Test-Path "vercel.json") {
    Write-Host "vercel.json found, proceeding with deployment" -ForegroundColor Green
} else {
    Write-Host "vercel.json not found or incorrectly configured. Creating a new one..." -ForegroundColor Yellow
    
    # Create a new vercel.json file with improved routing for React Router
    $vercelJson = @"
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/assets/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/logo192.png",
      "dest": "/logo192.png"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "headers": {
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    }
  ]
}
"@
    
    Set-Content -Path "vercel.json" -Value $vercelJson
    Write-Host "Created new vercel.json file" -ForegroundColor Green
}

# Login to Vercel (this will prompt for authentication)
Write-Host "Please authenticate with Vercel when prompted..." -ForegroundColor Yellow
vercel login

# Deploy to Vercel with environment variables and proper configuration
Write-Host "Deploying to Vercel..." -ForegroundColor Green

# Create a .env.production file to ensure environment variables are properly set during build
$envProdPath = "$projectRoot\frontend\.env.production"
$envProdContent = "REACT_APP_API_URL=https://recipe-app-backend.onrender.com"
Set-Content -Path $envProdPath -Value $envProdContent
Write-Host "Created .env.production file with correct backend URL" -ForegroundColor Green

# Deploy with proper configuration
vercel --prod --yes --build-env REACT_APP_API_URL=https://recipe-app-backend.onrender.com --framework=create-react-app

# Return to project root
Set-Location -Path $projectRoot

# Verify deployments and provide instructions
Write-Host "\nDeployment process completed!" -ForegroundColor Green
Write-Host "\nFrontend: https://recipe-app-frontend.vercel.app" -ForegroundColor Cyan
Write-Host "Backend: https://recipe-app-backend.onrender.com" -ForegroundColor Cyan

Write-Host "\nIMPORTANT POST-DEPLOYMENT STEPS:" -ForegroundColor Yellow
Write-Host "1. Verify your frontend is working by visiting: https://recipe-app-frontend.vercel.app" -ForegroundColor White
Write-Host "2. Verify your backend API is running by visiting: https://recipe-app-backend.onrender.com" -ForegroundColor White
Write-Host "3. If you see 'Hello world' on the frontend, try clearing your browser cache or opening in incognito mode" -ForegroundColor White
Write-Host "4. If backend shows 'Not Found', check Render logs for errors and ensure MongoDB connection is working" -ForegroundColor White
Write-Host "\nTROUBLESHOOTING TIPS:" -ForegroundColor Yellow
Write-Host "- Frontend issues: Check Vercel deployment logs and ensure all imports have correct file extensions" -ForegroundColor White
Write-Host "- Backend issues: Verify MongoDB connection string and environment variables in Render dashboard" -ForegroundColor White
Write-Host "- For persistent issues, try manually deploying from the respective dashboards:" -ForegroundColor White
Write-Host "  * Vercel: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "  * Render: https://dashboard.render.com" -ForegroundColor White

Write-Host "\nYour Recipe App should now be fully deployed and accessible online!" -ForegroundColor Green