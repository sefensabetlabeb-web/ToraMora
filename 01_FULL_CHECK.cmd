@echo off
setlocal
cd /d "%~dp0"
echo ====================================================
echo Hurghada Journeys - COMPLETE VALIDATION
echo ====================================================
echo.
call scripts\windows\stage15e-full-check.cmd
set "RC=%ERRORLEVEL%"
echo.
if "%RC%"=="0" (
  echo ====================================================
  echo SUCCESS: ALL CHECKS PASSED
  echo Next: run 02_RUN_SITE.cmd
  echo ====================================================
) else (
  echo ====================================================
  echo VALIDATION STOPPED WITH ERROR CODE %RC%
  echo Copy the FIRST error block shown above and send it to ChatGPT.
  echo Do not continue to production until it is fixed.
  echo ====================================================
)
pause
exit /b %RC%
