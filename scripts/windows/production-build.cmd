@echo off
setlocal
cd /d "%~dp0\..\.."
call npm run production:guard
if errorlevel 1 exit /b %errorlevel%
call npm run db:generate
if errorlevel 1 exit /b %errorlevel%
call npm run build
exit /b %errorlevel%
