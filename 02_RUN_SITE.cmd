@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo ERROR: Dependencies are not installed.
  echo Run 01_FULL_CHECK.cmd first.
  pause
  exit /b 1
)
echo Starting Hurghada Journeys at http://localhost:3000
start "Hurghada Journeys Browser" http://localhost:3000
call npm run dev
