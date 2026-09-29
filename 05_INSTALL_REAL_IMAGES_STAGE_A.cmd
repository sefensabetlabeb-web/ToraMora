@echo off
setlocal
cd /d "%~dp0"
node scripts\images\install-stage-a.mjs
if errorlevel 1 (
  echo.
  echo IMAGE STAGE A FAILED.
  pause
  exit /b 1
)
echo.
echo IMAGE STAGE A INSTALLED SUCCESSFULLY.
pause
