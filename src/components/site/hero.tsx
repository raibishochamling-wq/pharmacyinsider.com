"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowRight, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { restaurant, heroImage } from "@/lib/restaurant-data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Spread of authentic Indian dishes"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-5 bg-amber-400/20 text-amber-100 border-amber-300/30 backdrop-blur-sm hover:bg-amber-400/30"
            >
              <MapPin className="size-3 mr-1" /> Al Wukair, Qatar
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] text-shadow-warm text-balance"
          >
            Wakra Salt &amp; Pepper
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-3 text-lg sm:text-xl font-medium text-amber-200 tracking-wide"
          >
            Al Mashaf Branch
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl text-balance"
          >
            Authentic traditional Indian &amp; Chinese dishes, served warm in a
            family-friendly space. Loved by the neighbourhood — and rated{" "}
            <span className="font-semibold text-amber-200">4.5 stars</span> by{" "}
            <span className="font-semibold text-amber-200">83 happy guests</span>.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/15">
              <div className="flex">
                {[0, 1, 2, 3].map((i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
                <Star className="size-3.5 fill-amber-400/50 text-amber-400" />
              </div>
              <span className="text-sm font-semibold text-white">4.5</span>
              <span className="text-xs text-white/70">(83 reviews)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/15">
              <Clock className="size-3.5 text-amber-200" />
              <span className="text-sm text-white/90">Open · Closes 1 AM</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/15">
              <span className="text-sm font-semibold text-amber-200">
                {restaurant.priceRange}
              </span>
              <span className="text-xs text-white/70">/ person</span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-spice-gradient text-white hover:opacity-90 shadow-lg shadow-black/20 px-7 h-12 text-base"
            >
              <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
                <UtensilsCrossed className="size-4" /> Order Now
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/25 backdrop-blur-md hover:bg-white/20 hover:text-white px-7 h-12 text-base"
            >
              <a href="#menu">View Menu</a>
            </Button>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80"
          >
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-300" /> Dine-in
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-300" /> Takeaway
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-amber-300" /> Delivery
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
