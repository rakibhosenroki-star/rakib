@echo off
title Push Md Rakib Hasan Portfolio to GitHub
echo ========================================================
echo   Pushing Portfolio to GitHub:
echo   https://github.com/rakibhosenroki-star/rakib.git
echo ========================================================
echo.

set "PATH=C:\Program Files\Git\cmd;%PATH%"

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed on this system!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo After installing Git, double-click this file again.
    echo.
    pause
    exit /b
)

echo [1/5] Initializing Git repository...
git init

echo [2/5] Staging files...
git add .

echo [3/5] Creating initial commit...
git commit -m "feat: initial commit for Md Rakib Hasan portfolio website"

echo [4/5] Setting default branch to main...
git branch -M main

echo [5/5] Configuring remote repository...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/rakibhosenroki-star/rakib.git

echo.
echo ========================================================
echo   Pushing to GitHub (main branch)...
echo ========================================================
git commit -m "feat(update): update portfolio data and site assets" >nul 2>nul
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Your portfolio has been pushed to GitHub!
    echo Visit: https://github.com/rakibhosenroki-star/rakib
) else (
    echo [NOTICE] If prompted, please sign in with your GitHub account in the browser or enter your GitHub Personal Access Token.
)

echo.
pause
