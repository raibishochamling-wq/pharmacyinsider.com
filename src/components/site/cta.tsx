"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/lib/restaurant-data";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-spice-gradient">
      {/* Decorative blobs */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl" aria-hidden />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-amber-200 mb-4">
            Ready when you are
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
            Your next favourite meal is one click away
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
            Order online for delivery or pickup, call us to reserve a table for
            your celebration, or simply drop by — we&apos;ll have the kitchen
            fired up and the welcome warm.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-accent hover:bg-white/90 shadow-lg px-7 h-12 text-base font-semibold"
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
              className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white px-7 h-12 text-base"
            >
              <a href={`tel:${restaurant.phone}`}>
                <Phone className="size-4" /> {restaurant.phoneDisplay}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
