"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Eye,
  Star,
  TrendingUp,
  Clock,
  Pencil,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type DashboardData = {
  stats: {
    totalPosts: number;
    publishedPosts: number;
    featuredPosts: number;
    drafts: number;
    totalViews: number;
  };
  categoryStats: Record<string, { count: number; views: number }>;
  recentPosts: Array<{
    id: string;
    title: string;
    slug: string;
    category: string;
    views: number;
    publishedAt: string;
    isPublished: boolean;
  }>;
  topPosts: Array<{
    id: string;
    title: string;
    slug: string;
    views: number;
    category: string;
  }>;
};

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const statCards = [
  { key: "totalPosts", label: "Total Posts", icon: FileText, color: "text-teal-600", bg: "bg-teal-500/10" },
  { key: "totalViews", label: "Total Views", icon: Eye, color: "text-violet-600", bg: "bg-violet-500/10" },
  { key: "featuredPosts", label: "Featured", icon: Star, color: "text-amber-600", bg: "bg-amber-500/10" },
  { key: "publishedPosts", label: "Published", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-500/10" },
] as const;

export function AdminDashboard({ onEditPost }: { onEditPost: (id: string) => void }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => mounted && setData(d))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return <div>Failed to load.</div>;
  const maxCatViews = Math.max(...Object.values(data.categoryStats).map((c) => c.views), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your blog at a glance.</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="mt-3 font-serif-display text-3xl font-bold text-foreground">
                    {data.stats[card.key as keyof typeof data.stats].toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{card.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-serif-display text-lg font-bold text-foreground mb-4">
              Posts by Category
            </h3>
            <div className="space-y-3">
              {Object.entries(data.categoryStats).map(([cat, stats]) => (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{cat}</span>
                    <span className="text-muted-foreground">
                      {stats.count} posts · {stats.views.toLocaleString()} views
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.views / maxCatViews) * 100}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-teal-gradient rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top posts */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-serif-display text-lg font-bold text-foreground mb-4">
              Top Posts by Views
            </h3>
            <div className="space-y-3">
              {data.topPosts.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-start gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0 cursor-pointer hover:bg-muted/30 -mx-2 px-2 py-1 rounded-lg transition-colors"
                  onClick={() => onEditPost(p.id)}
                >
                  <span className="font-serif-display text-lg font-bold text-muted-foreground/50 w-5 shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{p.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="size-3" /> {p.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Pencil className="size-3.5 text-muted-foreground mt-1 shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-serif-display text-lg font-bold text-foreground mb-4">
            Recent Posts
          </h3>
          <div className="space-y-2">
            {data.recentPosts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0 cursor-pointer hover:bg-muted/30 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                onClick={() => onEditPost(p.id)}
              >
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  p.category === "Vitamins" ? "bg-amber-500/10 text-amber-700 border-amber-500/20" :
                  p.category === "Minerals" ? "bg-teal-500/10 text-teal-700 border-teal-500/20" :
                  p.category === "Supplements" ? "bg-violet-500/10 text-violet-700 border-violet-500/20" :
                  "bg-slate-500/10 text-slate-700 border-slate-500/20"
                }`}>
                  {p.category}
                </span>
                <span className="text-sm font-medium text-foreground line-clamp-1 flex-1 min-w-0">
                  {p.title}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="size-3" /> {timeAgo(p.publishedAt)}
                </span>
                {!p.isPublished && (
                  <span className="text-[10px] font-medium text-amber-700 bg-amber-500/15 px-2 py-0.5 rounded-full shrink-0">
                    Draft
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
