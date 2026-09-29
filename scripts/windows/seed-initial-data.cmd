@echo off
setlocal
cd /d "%~dp0\..\.."
echo WARNING: This command seeds the bundled starter catalogue and translations.
echo Use it for first-time setup only; do not run it after editing production content unless you intend to refresh starter data.
call npm run db:seed
exit /b %errorlevel%
