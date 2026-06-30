"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Star,
  CalendarClock,
  MessageSquare,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DashboardData = {
  stats: {
    menuItems: number;
    availableItems: number;
    reviews: number;
    publishedReviews: number;
    avgRating: number;
    reservations: number;
    pendingReservations: number;
  };
  recentReviews: Array<{
    id: string;
    name: string;
    rating: number;
    title: string;
    createdAt: string;
  }>;
  recentReservations: Array<{
    id: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    status: string;
  }>;
};

const statCards = [
  { key: "menuItems", label: "Menu Items", icon: UtensilsCrossed, color: "text-amber-600", bg: "bg-amber-500/10" },
  { key: "reviews", label: "Total Reviews", icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-500/10" },
  { key: "avgRating", label: "Avg Rating", icon: Star, color: "text-amber-500", bg: "bg-amber-400/10" },
  { key: "reservations", label: "Reservations", icon: CalendarClock, color: "text-emerald-600", bg: "bg-emerald-500/10" },
] as const;

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (mounted) setData(d);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Loading your restaurant overview...</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load dashboard data.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening at your restaurant.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          const value = data.stats[card.key as keyof typeof data.stats];
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
                      <Icon className="size-5" />
                    </span>
                    <TrendingUp className="size-4 text-emerald-500" />
                  </div>
                  <div className="mt-3 font-serif-display text-3xl font-bold text-foreground">
                    {card.key === "avgRating" ? `${value}★` : value}
                  </div>
                  <div className="text-sm text-muted-foreground">{card.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Secondary stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-500" />
            <div>
              <div className="text-sm text-muted-foreground">Available Dishes</div>
              <div className="font-semibold text-foreground">
                {data.stats.availableItems} / {data.stats.menuItems}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <MessageSquare className="size-5 text-rose-500" />
            <div>
              <div className="text-sm text-muted-foreground">Published Reviews</div>
              <div className="font-semibold text-foreground">
                {data.stats.publishedReviews} / {data.stats.reviews}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <Clock className="size-5 text-amber-500" />
            <div>
              <div className="text-sm text-muted-foreground">Pending Reservations</div>
              <div className="font-semibold text-foreground">
                {data.stats.pendingReservations}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="size-4 text-amber-500" /> Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentReviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              data.recentReviews.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-spice-gradient text-white text-xs font-semibold shrink-0">
                    {r.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm text-foreground truncate">
                        {r.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {timeAgo(r.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`size-3 ${
                            i <= r.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {r.title}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent reservations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarClock className="size-4 text-emerald-500" /> Recent Reservations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentReservations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reservations yet.</p>
            ) : (
              data.recentReservations.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 shrink-0">
                    <Users className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm text-foreground truncate">
                        {r.name}
                      </span>
                      <Badge
                        variant={r.status === "confirmed" ? "default" : r.status === "cancelled" ? "destructive" : "secondary"}
                        className="text-[10px]"
                      >
                        {r.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.guests} guests · {r.date} at {r.time}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.phone}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
