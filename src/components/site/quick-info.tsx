"use client";

import { motion } from "framer-motion";
import { Star, Users, Clock, Wallet } from "lucide-react";

const stats = [
  {
    icon: Star,
    value: "4.5",
    label: "Star Rating",
    sub: "83 Google reviews",
    accent: "text-amber-500",
  },
  {
    icon: Wallet,
    value: "QAR 1–50",
    label: "Per Person",
    sub: "Budget-friendly",
    accent: "text-emerald-600",
  },
  {
    icon: Clock,
    value: "9 AM – 1 AM",
    label: "Open Daily",
    sub: "Late-night dining",
    accent: "text-rose-600",
  },
  {
    icon: Users,
    value: "Family",
    label: "Restaurant",
    sub: "Dine-in · Takeaway · Delivery",
    accent: "text-orange-600",
  },
];

export function QuickInfo() {
  return (
    <section className="relative -mt-12 sm:-mt-16 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-xl border border-border/60 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60 overflow-hidden"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-5 sm:p-6 flex items-center gap-4 bg-card hover:bg-accent/5 transition-colors"
              >
                <span
                  className={`flex size-11 sm:size-12 items-center justify-center rounded-xl bg-accent/10 ${stat.accent}`}
                >
                  <Icon className="size-5 sm:size-6" />
                </span>
                <div className="min-w-0">
                  <div className="font-serif-display text-xl sm:text-2xl font-bold text-foreground leading-tight truncate">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-foreground/80">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
