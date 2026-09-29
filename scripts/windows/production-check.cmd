@echo off
setlocal
cd /d "%~dp0\..\.."
call npm run production:guard
if errorlevel 1 exit /b %errorlevel%
call npm run lint
if errorlevel 1 exit /b %errorlevel%
call npm run typecheck
if errorlevel 1 exit /b %errorlevel%
call npm run test:unit
if errorlevel 1 exit /b %errorlevel%
echo Production preflight checks passed.
