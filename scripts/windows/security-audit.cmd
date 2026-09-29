@echo off
setlocal
cd /d "%~dp0\..\.."
call npm run security:audit
exit /b %errorlevel%
