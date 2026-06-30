#!/bin/bash
# ============================================================
#  PharmacyInsider — One-Click Setup & Deploy Script
# ============================================================
#  This script does EVERYTHING locally:
#  1. Installs dependencies
#  2. Asks for your Neon database URL
#  3. Switches to PostgreSQL
#  4. Creates database tables
#  5. Seeds all 12 blog posts
#  6. Gives you next steps for Vercel deploy
# ============================================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "============================================================"
echo -e "${CYAN}  PharmacyInsider — Setup & Deploy Script${NC}"
echo "============================================================"
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
  echo -e "${RED}✗ Bun is not installed. Installing Bun...${NC}"
  curl -fsSL https://bun.sh/install | bash
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"
  echo -e "${GREEN}✓ Bun installed${NC}"
  echo ""
fi

# Step 1: Install dependencies
echo -e "${YELLOW}STEP 1/5: Installing dependencies...${NC}"
bun install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 2: Ask for database URL
echo -e "${YELLOW}STEP 2/5: Database setup${NC}"
echo ""
echo "You need a FREE PostgreSQL database from Neon.tech:"
echo "  1. Go to: https://neon.tech"
echo "  2. Sign up with GitHub (free)"
echo "  3. Create a new project called 'pharmacyinsider'"
echo "  4. Copy the connection string (looks like):"
echo "     postgresql://neondb_owner:xxx@ep-xxx.neon.tech/neondb?sslmode=require"
echo ""
read -p "Paste your Neon database URL here: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
  echo -e "${RED}✗ No database URL provided. Exiting.${NC}"
  exit 1
fi

# Save to .env
echo "DATABASE_URL=\"$DATABASE_URL\"" > .env
echo -e "${GREEN}✓ Saved to .env${NC}"
echo ""

# Step 3: Switch to PostgreSQL
echo -e "${YELLOW}STEP 3/5: Switching database to PostgreSQL...${NC}"
bun run scripts/switch-db.ts prod
bun run db:generate
echo -e "${GREEN}✓ Database switched to PostgreSQL${NC}"
echo ""

# Step 4: Create tables
echo -e "${YELLOW}STEP 4/5: Creating database tables...${NC}"
bun run db:push
echo -e "${GREEN}✓ Tables created${NC}"
echo ""

# Step 5: Seed blog posts
echo -e "${YELLOW}STEP 5/5: Seeding 12 blog posts...${NC}"
bun run seed
echo -e "${GREEN}✓ All 12 posts seeded${NC}"
echo ""

# Done!
echo "============================================================"
echo -e "${GREEN}  🎉 LOCAL SETUP COMPLETE!${NC}"
echo "============================================================"
echo ""
echo "Your blog is ready. Next steps to go LIVE:"
echo ""
echo -e "${CYAN}1. Push to GitHub:${NC}"
echo "   - Go to https://github.com/new"
echo "   - Create a repo named 'pharmacyinsider'"
echo "   - Upload all files from this folder"
echo ""
echo -e "${CYAN}2. Deploy to Vercel:${NC}"
echo "   - Go to https://vercel.com"
echo "   - Sign in with GitHub"
echo "   - Click 'Add New Project'"
echo "   - Import your 'pharmacyinsider' repo"
echo "   - Add Environment Variable:"
echo "       Name:  DATABASE_URL"
echo "       Value: $DATABASE_URL"
echo "   - Click Deploy!"
echo ""
echo -e "${CYAN}3. Visit your live site!${NC}"
echo "   - Vercel gives you a URL like:"
echo "     https://pharmacyinsider-xxx.vercel.app"
echo "   - Admin panel: add /#admin to the URL"
echo "   - Default password: admin123"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Change the admin password!${NC}"
echo "   Login → Settings → Admin Password → Save"
echo ""
echo "============================================================"
echo ""
read -p "Press Enter to finish..."
