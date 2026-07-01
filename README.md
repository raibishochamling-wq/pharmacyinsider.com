# 💊 PharmacyInsider — Dynamic Blog Website

A complete, production-ready blog with admin panel. Built with Next.js 16, TypeScript, Prisma, and Tailwind CSS.

![PharmacyInsider](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-blue) ![License](https://img.shields.io/badge/Deploy-FREE-success)

## ✨ Features

**Public Blog:**
- 🏠 Homepage with hero, featured post, and article grid
- 🔍 Live search (by title, content, tags)
- 🏷️ Category filtering (Vitamins, Minerals, Supplements)
- 📖 Beautiful article pages with share buttons
- 🌙 Dark mode
- 📱 Fully mobile responsive
- ⚡ SEO optimized

**Admin Panel (at `/#admin`):**
- 📊 Dashboard with stats and charts
- 📝 Post editor (write/edit/delete posts)
- 🏷️ Category and tag management
- ⭐ Featured post toggle
- 👁️ Draft/publish system
- ⚙️ Blog settings (name, about, password, etc.)

## 🚀 Go Live — Read These Two Files

| File | What it is |
|------|-----------|
| **`QUICKSTART.md`** | ⭐ START HERE — 15-minute deploy guide |
| **`DEPLOYMENT.md`** | Full detailed step-by-step guide with troubleshooting |

## 🏃 Quick Start (Local Development)

```bash
# Install dependencies
bun install

# Set up local database
bun run db:push
bun run seed

# Start dev server
bun run dev
```

Open `http://localhost:3000` → Admin: `http://localhost:3000/#admin` (password: `admin123`)

## 📁 Project Structure

```
pharmacyinsider/
├── src/
│   ├── app/
│   │   ├── api/              # Backend API routes
│   │   │   ├── posts/        # Blog post CRUD
│   │   │   ├── auth/         # Admin login
│   │   │   ├── dashboard/    # Dashboard stats
│   │   │   └── settings/     # Blog settings
│   │   ├── page.tsx          # Main page (routes blog/admin)
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Theme + styles
│   ├── components/
│   │   ├── blog/             # Public blog components
│   │   ├── admin-blog/       # Admin panel components
│   │   └── ui/               # shadcn/ui components
│   └── lib/
│       ├── db.ts             # Prisma client
│       └── utils.ts          # Utilities
├── prisma/
│   └── schema.prisma         # Database schema
├── scripts/
│   ├── seed-blog.ts          # Seed 12 blog posts
│   ├── switch-db.ts          # Switch SQLite/PostgreSQL
│   ├── reset-password.ts     # Reset admin password
│   └── fetch-all-posts.ts    # (used to import from Blogger)
├── setup.sh                  # One-click setup (Mac/Linux)
├── setup.bat                 # One-click setup (Windows)
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment variable template
├── QUICKSTART.md             # ⭐ 15-min deploy guide
└── DEPLOYMENT.md             # Full deployment guide
```

## 🆓 Free Deployment Stack

- **Vercel** (hosting) — free, unlimited static + 100GB bandwidth
- **Neon** (database) — free 0.5GB PostgreSQL
- **GitHub** (code storage) — free

## 📝 Default Admin Password

`admin123` — **CHANGE THIS IMMEDIATELY** after first login in Settings.

## 🆘 Need Help?

- Read `DEPLOYMENT.md` for detailed instructions and troubleshooting
- Common issues are covered in the troubleshooting section

---

**Your health is my priority.** 💊✨
<!-- Production deployment trigger Wed Jul  1 19:52:46 UTC 2026 -->
