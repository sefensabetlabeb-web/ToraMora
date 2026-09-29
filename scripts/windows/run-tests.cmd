@echo off
setlocal
cd /d "%~dp0\..\.."
call npm run test:all
exit /b %errorlevel%
