# 🚀 Deploy PharmacyInsider for FREE — Step-by-Step Guide

This guide will take you from zero to a live blog website in about **20 minutes**.
**Total cost: $0** (free tiers only)

---

## What you'll get

- ✅ Live blog at `your-blog.vercel.app` (free)
- ✅ PostgreSQL database (free, 0.5GB — plenty for thousands of posts)
- ✅ Admin panel to manage posts
- ✅ HTTPS (padlock 🔒) automatically
- ✅ Global CDN (fast worldwide)
- ✅ Optional: connect your own domain (e.g. `pharmacyinsider.com`)

---

## Prerequisites (5 minutes)

You need 3 free accounts:

1. **GitHub account** — [github.com](https://github.com) (to store your code)
2. **Vercel account** — [vercel.com](https://vercel.com) (to host the website) — *Sign up with GitHub*
3. **Neon account** — [neon.tech](https://neon.tech) (free PostgreSQL database) — *Sign up with GitHub*

All three have free tiers that are more than enough for a personal blog.

---

## Step 1: Download your project files

First, you need to get all the project files from this chat onto your computer.

> Ask me to "package the project for download" and I'll create a ZIP file you can save.

Once downloaded, **unzip** the folder to your computer (e.g. to `Desktop/pharmacyinsider`).

---

## Step 2: Upload to GitHub (5 minutes)

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `pharmacyinsider`
3. **Private** (recommended) or Public — your choice
4. Click **"Create repository"**
5. **Upload your files**:
   - Click **"uploading an existing file"** (the link)
   - Drag ALL the files from your unzipped folder into GitHub
   - ⚠️ **DO NOT upload** these folders/files (they're in `.gitignore` so they'll be skipped, but just in case):
     - `node_modules/`
     - `db/`
     - `.next/`
     - `.env`
   - Write a commit message: `Initial commit — PharmacyInsider blog`
   - Click **"Commit changes"**

> **Tip**: If GitHub is slow uploading many files, you can use [GitHub Desktop](https://desktop.github.com/) instead — it's easier.

---

## Step 3: Create a free database on Neon (3 minutes)

1. Go to [neon.tech](https://neon.tech) and sign in with GitHub
2. Click **"New Project"**
3. **Project name**: `pharmacyinsider`
4. **Database name**: `pharmacyinsider`
5. **Region**: Pick the one closest to you (e.g. `US East` or `EU West`)
6. Click **"Create project"**
7. On the next page, you'll see a **"Connection string"** that looks like:
   ```
   postgresql://neondb_owner:abc123xyz@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
8. **COPY this string** — you'll need it in Step 5

> ⚠️ Keep this string secret — it's the password to your database.

---

## Step 4: Deploy to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Find your `pharmacyinsider` repository and click **"Import"**
4. **Framework Preset**: Next.js (should auto-detect)
5. **Build Command**: `bun run build:vercel` (should auto-fill from vercel.json)
6. **Install Command**: `bun install` (should auto-fill)
7. **DO NOT click Deploy yet!** First, add the database:

---

## Step 5: Add environment variables (1 minute)

On the same Vercel page, scroll down to **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | *(paste the Neon connection string from Step 3)* |

1. Paste your `postgresql://...` string into the value box
2. Make sure all three environments are checked: **Production, Preview, Development**
3. Click **"Add"**

---

## Step 5.5: Switch the database to PostgreSQL (30 seconds)

Before deploying, you need to switch the database provider from SQLite (local) to PostgreSQL (production). This is a one-line change.

**Option A: Easy way** — Run this command on your computer:
```bash
bun run scripts/switch-db.ts prod
```
Then commit and push the change to GitHub:
```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push
```

**Option B: Manual way** — Open `prisma/schema.prisma` and change line 10:
```prisma
datasource db {
  provider = "postgresql"   // ← change from "sqlite" to "postgresql"
  url      = env("DATABASE_URL")
}
```
Then commit and push to GitHub.

---

## Step 6: Deploy! (2 minutes)

1. Click **"Deploy"**
2. Wait ~2 minutes while Vercel builds your site
3. When it says **"Congratulations"**, click **"Visit"** 🎉

Your blog is now LIVE at `https://pharmacyinsider-xxxxx.vercel.app`!

---

## Step 7: Seed your database with all 12 blog posts (2 minutes)

Right now your live blog has NO posts (the database is empty). Let's fix that:

### Option A: Easy way (recommended)

1. Go to your **live Vercel site** → scroll to the footer → click **"Staff Login"**
2. Enter password: `admin123`
3. Click **"New Post"** and add your posts manually one by one

### Option B: Automated way (faster, all 12 posts at once)

You'll need to run a one-time command to seed the database. On your computer, open a terminal in the project folder:

```bash
# 1. Install dependencies
bun install

# 2. Switch to PostgreSQL mode
bun run scripts/switch-db.ts prod

# 3. Set your Neon database URL (replace with your actual string from Step 3)
export DATABASE_URL="postgresql://neondb_owner:abc123xyz@ep-...neon.tech/neondb?sslmode=require"

# 4. Create the database tables
bun run db:push

# 5. Seed all 12 blog posts
bun run seed
```

Done! Refresh your live site and all 12 posts will appear.

> **Note**: After seeding, switch back to local mode if you want to keep developing locally:
> ```bash
> bun run scripts/switch-db.ts local
> ```

---

## Step 8 (Optional): Change the admin password

The default password is `admin123` — **change it before sharing your site!**

1. Go to your live site → **"Staff Login"** → enter `admin123`
2. Go to **Settings** tab
3. In the **"Admin Password"** field, type your new password
4. Click **"Save Changes"**
5. Log out and test the new password

---

## Step 9 (Optional): Add your own domain

Want `pharmacyinsider.com` instead of `pharmacyinsider-xxxxx.vercel.app`?

1. **Buy the domain** (~$10/year from Namecheap, GoDaddy, or Cloudflare)
2. In Vercel: go to your project → **Settings** → **Domains**
3. Type your domain and click **"Add"**
4. Vercel gives you DNS records (like `A 76.76.21.21`)
5. Go to your domain registrar's DNS settings and add those records
6. Wait 10-60 minutes for DNS to propagate
7. Vercel automatically enables HTTPS (the padlock 🔒)

---

## Free tier limits (you'll likely never hit these)

| Service | Free tier limit | What it means |
|---------|----------------|----------------|
| **Vercel** | 100 GB bandwidth/month | ~50,000 page views |
| **Vercel** | 100 GB-hours of serverless | Plenty for a blog |
| **Neon** | 0.5 GB storage | ~10,000 long blog posts |
| **Neon** | Compute scales to zero when idle | Slight delay on first visit after idle |

For a personal health blog, you will likely **never exceed these limits**. If you do, you can upgrade later.

---

## Troubleshooting

### "Build failed" on Vercel
- Make sure `DATABASE_URL` is set correctly in Vercel environment variables
- Check the build logs — click on the failed deployment for details

### Site loads but no posts appear
- You need to run the seed script (Step 7, Option B)
- Or add posts manually via the admin panel

### Can't log in to admin
- Default password is `admin123` (change it in Settings after first login)
- If you forgot your password, run this on your computer:
  ```bash
  export DATABASE_URL="your-neon-connection-string"
  bun run scripts/reset-password.ts newpassword123
  ```

### Database connection errors
- Make sure your Neon project is "Active" (not suspended)
- Neon free tier suspends databases after 5 days of inactivity — just visit your site to wake it up

---

## Need help?

Ask me! I can help you:
- Package the project for download
- Fix any deployment errors
- Add features (newsletter, comments, etc.)
- Connect a custom domain

---

**Happy blogging! Your health tips deserve to reach the world. 💊✨**
