@echo off
setlocal
cd /d "%~dp0\..\.."
call npm run production:guard
if errorlevel 1 exit /b %errorlevel%
call npm run db:deploy
if errorlevel 1 exit /b %errorlevel%
echo Production migrations applied. Existing trip/admin content was NOT reseeded.
exit /b 0
