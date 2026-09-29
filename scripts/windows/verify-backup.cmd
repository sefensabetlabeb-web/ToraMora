@echo off
setlocal
if "%~1"=="" (
  echo Usage: scripts\windows\verify-backup.cmd "backups\hurghada_journeys_YYYYMMDD_HHMMSS.dump"
  exit /b 2
)
cd /d "%~dp0\..\.."
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\windows\verify-backup.ps1 -BackupFile "%~1"
exit /b %errorlevel%
