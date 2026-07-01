# 🚀 PharmacyInsider — Go Live in 15 Minutes

## The SHORT Version

You need **3 free accounts** and about **15 minutes**. Here's everything:

---

## Step 1 — Get the project files (1 min)

Download the ZIP file (`pharmacyinsider.zip`) and unzip it to your computer.

---

## Step 2 — Create 3 free accounts (5 min)

Sign up for all three using your GitHub account (free):

| # | Site | What it's for | URL |
|---|------|---------------|-----|
| 1 | **GitHub** | Store your code | [github.com](https://github.com) |
| 2 | **Neon** | Free database | [neon.tech](https://neon.tech) |
| 3 | **Vercel** | Free hosting | [vercel.com](https://vercel.com) |

---

## Step 3 — Upload to GitHub (3 min)

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `pharmacyinsider`
3. Click **Create repository**
4. Click **"uploading an existing file"**
5. Drag ALL files from the unzipped folder into GitHub
6. Click **Commit changes**

---

## Step 4 — Create your database (2 min)

1. Go to [neon.tech](https://neon.tech) → sign in with GitHub
2. Click **New Project** → name it `pharmacyinsider` → **Create**
3. **Copy the connection string** (looks like `postgresql://neondb_owner:xxx@ep-xxx.neon.tech/neondb?sslmode=require`)

---

## Step 5 — Deploy to Vercel (4 min)

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New** → **Project**
3. Find `pharmacyinsider` repo → **Import**
4. Scroll to **Environment Variables**:
   - Name: `DATABASE_URL`
   - Value: *(paste your Neon connection string)*
   - Click **Add**
5. Click **Deploy** ⚡
6. Wait 2 minutes → click **Visit** 🎉

Your site is now LIVE at `https://pharmacyinsider-xxx.vercel.app`!

---

## Step 6 — Add your 12 blog posts (3 min)

Your live site is empty right now. To add all 12 posts at once:

**On Windows:** Open Command Prompt in the project folder, then:
```
setup.bat
```

**On Mac/Linux:** Open Terminal in the project folder, then:
```
./setup.sh
```

The script will ask for your Neon database URL (paste it from Step 4) and do everything automatically.

---

## Step 7 — Change admin password (1 min)

1. Go to your live site → footer → **Staff Login**
2. Password: `admin123`
3. Go to **Settings** tab
4. Type a new password → **Save**

---

## 🎉 DONE!

Your blog is live! Share your URL with the world.

**Optional:** Buy `pharmacyinsider.com` (~$10/year) and connect it in Vercel → Settings → Domains.

---

## Need help?

Read the full `DEPLOYMENT.md` guide for detailed instructions, troubleshooting, and screenshots.
