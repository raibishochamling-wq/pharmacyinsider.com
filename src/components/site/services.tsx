"use client";

import { motion } from "framer-motion";
import { Utensils, ShoppingBag, Bike, type LucideIcon } from "lucide-react";
import { restaurant } from "@/lib/restaurant-data";

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  "shopping-bag": ShoppingBag,
  bike: Bike,
};

export function Services() {
  return (
    <section className="relative py-20 sm:py-24 bg-spice-gradient overflow-hidden">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 mb-3">
            How to enjoy
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
            Three ways to dine with us
          </h2>
          <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed">
            However you like your meal — at our table, at home, or on the go —
            we&apos;ve got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {restaurant.services.map((service, idx) => {
            const Icon = iconMap[service.icon] ?? Utensils;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute top-5 right-5 font-serif-display text-5xl font-bold text-white/10 leading-none">
                  0{idx + 1}
                </div>
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white group-hover:bg-white/25 transition-colors">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 font-serif-display text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-white/80 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
