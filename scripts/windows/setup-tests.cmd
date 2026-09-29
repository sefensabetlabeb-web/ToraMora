@echo off
setlocal
cd /d "%~dp0\..\.."
echo [1/3] Installing project dependencies...
call npm install
if errorlevel 1 exit /b 1
echo [2/3] Installing Playwright Chromium...
call npx playwright install chromium
if errorlevel 1 exit /b 1
echo [3/3] Running unit tests...
call npm run test:unit
if errorlevel 1 exit /b 1
echo Automated test environment is ready.
