@echo off
setlocal
cd /d "%~dp0\..\.."
call scripts\windows\setup-database.cmd
if errorlevel 1 exit /b 1
call scripts\windows\create-admin.cmd
endlocal
