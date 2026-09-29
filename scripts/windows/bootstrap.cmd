@echo off
setlocal
cd /d "%~dp0\..\.."
powershell -NoProfile -ExecutionPolicy Bypass -File ".\scripts\windows\bootstrap.ps1"
if errorlevel 1 exit /b %errorlevel%
endlocal
