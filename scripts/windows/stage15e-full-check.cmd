@echo off
setlocal
cd /d "%~dp0\..\.."

echo === Hurghada Journeys - Stage 15E Full Check ===
where node >nul 2>nul || (echo ERROR: Node.js is not installed.& exit /b 1)
where npm >nul 2>nul || (echo ERROR: npm is not installed.& exit /b 1)

if exist package-lock.json (
  echo [1/9] Installing exact dependencies with npm ci...
  call npm ci || exit /b 1
) else (
  echo [1/9] No package-lock.json yet. Running npm install to create it...
  call npm install || exit /b 1
)

echo [2/9] Generating Prisma client...
call npm run db:generate || exit /b 1

echo [3/9] Static project audit...
call npm run final:audit || exit /b 1

echo [4/9] Security audit...
call npm run security:audit || exit /b 1

echo [5/9] Translation audit...
call npm run i18n:audit || exit /b 1

echo [6/9] Lint...
call npm run lint || exit /b 1

echo [7/9] TypeScript...
call npm run typecheck || exit /b 1

echo [8/9] Unit tests...
call npm run test:unit || exit /b 1

echo [9/9] Production build...
call npm run build || exit /b 1

echo.
echo Base checks PASSED.
echo.
echo Installing Playwright Chromium if needed...
call npx playwright install chromium || exit /b 1
call npm run test:e2e || exit /b 1

echo.
echo ====================================================
echo ALL STAGE 15E CHECKS PASSED
if not exist package-lock.json echo WARNING: package-lock.json was not created.
echo Commit package-lock.json before production deployment.
echo ====================================================
exit /b 0
