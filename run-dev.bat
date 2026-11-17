@echo off
title Md Rakib Hasan - Development Server
set "PATH=C:\Program Files\nodejs;%APPDATA%\npm;%PATH%"
echo ========================================================
echo   Starting Portfolio Dev Server (npm run dev)...
echo ========================================================
echo.
cd /d "%~dp0"

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js and npm are not found in your PATH.
    echo Please ensure Node.js is installed, or restart your terminal/PC.
    pause
    exit /b 1
)

if not exist "frontend\node_modules" (
    echo [INFO] First time run detected. Installing dependencies...
    cd frontend
    call npm install
    cd ..
)

start /b "" node port-forward.cjs >nul 2>nul

echo Starting Vite development server...
echo Local address will be shown below (http://localhost:5173/)...
echo.
call npm run dev
pause
