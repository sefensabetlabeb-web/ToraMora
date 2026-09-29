@echo off
setlocal
cd /d "%~dp0\..\.."
if not exist .env.local copy .env.example .env.local >nul
echo Generating Prisma Client...
call npx prisma generate
if errorlevel 1 exit /b 1
echo Creating/updating development database...
call npx prisma migrate dev
if errorlevel 1 exit /b 1
echo Seeding trips and settings...
call npx prisma db seed
if errorlevel 1 exit /b 1
echo Database setup complete.
