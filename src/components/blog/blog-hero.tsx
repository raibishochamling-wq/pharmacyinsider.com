"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, ShieldCheck, Stethoscope } from "lucide-react";

const TRUST_BADGES = [
  { icon: Stethoscope, label: "Pharmacy Professional" },
  { icon: ShieldCheck, label: "Research-Backed" },
  { icon: TrendingUp, label: "3+ Years in Qatar" },
];

const POPULAR_SEARCHES = ["Magnesium", "Vitamin D", "Folic Acid", "Omega-3", "Iron"];

export function BlogHero({
  onSearch,
  searchQuery,
}: {
  onSearch: (q: string) => void;
  searchQuery: string;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      {/* Glow blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-1.5 text-xs font-medium text-amber-200 tracking-wider uppercase">
            <ShieldCheck className="size-3.5" /> Honest Health Guidance
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] text-balance"
        >
          The truth about vitamins,
          <br />
          <span className="text-amber-300">supplements & medicines</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto"
        >
          Honest, research-backed health and wellness tips from a pharmacy
          professional with hands-on experience in medicines, supplements, and
          patient care. <span className="text-amber-200 font-medium">Your health is my priority.</span>
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 max-w-xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search for a supplement, vitamin, or health topic…"
              className="w-full h-13 py-3.5 pl-12 pr-4 rounded-full bg-white shadow-xl border border-white/20 text-sm focus:outline-none focus:ring-4 focus:ring-amber-400/30"
            />
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-white/60 self-center">Popular:</span>
            {POPULAR_SEARCHES.map((s) => (
              <button
                key={s}
                onClick={() => onSearch(s)}
                className="text-xs text-amber-200 hover:text-amber-100 underline-offset-2 hover:underline transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5"
              >
                <Icon className="size-3.5 text-amber-300" />
                <span className="text-xs text-white/85 font-medium">{badge.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
