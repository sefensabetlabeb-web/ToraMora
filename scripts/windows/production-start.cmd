@echo off
setlocal
cd /d "%~dp0\..\.."
set NODE_ENV=production
call npm run start
