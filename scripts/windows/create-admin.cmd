@echo off
setlocal
cd /d "%~dp0\..\.."
if not exist .env.local (
  echo ERROR: .env.local was not found.
  echo Copy .env.example to .env.local and set DATABASE_URL, AUTH_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD.
  exit /b 1
)
npm run admin:create
endlocal
