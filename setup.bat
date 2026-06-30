@echo off
REM ============================================================
REM  PharmacyInsider - One-Click Setup (Windows)
REM ============================================================

echo.
echo ============================================================
echo   PharmacyInsider - Setup ^& Deploy
echo ============================================================
echo.

REM Check if bun is installed
where bun >nul 2>nul
if errorlevel 1 (
  echo [!] Bun not found. Installing Bun...
  powershell -c "irm bun.sh/install.ps1 | iex"
  echo [*] Please close this window and re-open it, then run setup.bat again
  pause
  exit /b
)

echo STEP 1/5: Installing dependencies...
bun install
echo.

echo STEP 2/5: Database setup
echo.
echo You need a FREE PostgreSQL database from Neon.tech:
echo   1. Go to: https://neon.tech
echo   2. Sign up with GitHub (free)
echo   3. Create a new project called 'pharmacyinsider'
echo   4. Copy the connection string
echo.
set /p DATABASE_URL="Paste your Neon database URL here: "

if "%DATABASE_URL%"=="" (
  echo [!] No database URL provided. Exiting.
  pause
  exit /b
)

REM Save to .env
echo DATABASE_URL="%DATABASE_URL%" > .env
echo [*] Saved to .env
echo.

echo STEP 3/5: Switching database to PostgreSQL...
bun run scripts/switch-db.ts prod
bun run db:generate
echo.

echo STEP 4/5: Creating database tables...
bun run db:push
echo.

echo STEP 5/5: Seeding 12 blog posts...
bun run seed
echo.

echo ============================================================
echo   LOCAL SETUP COMPLETE!
echo ============================================================
echo.
echo Next steps to go LIVE:
echo   1. Push to GitHub (github.com/new - upload all files)
echo   2. Deploy to Vercel (vercel.com - import your repo)
echo   3. Add DATABASE_URL environment variable in Vercel
echo   4. Click Deploy!
echo.
echo Admin panel: your-site.vercel.app/#admin
echo Default password: admin123 (CHANGE IT in Settings!)
echo.
pause
