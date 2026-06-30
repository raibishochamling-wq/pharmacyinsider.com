"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquareHeart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { reviews, reviewTags, restaurant } from "@/lib/restaurant-data";

function RatingStars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-4 ${
            i <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i <= rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-muted text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function initialsAvatarColor(initials: string) {
  const colors = [
    "bg-amber-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-purple-500",
  ];
  const idx = initials.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/10 rounded-full blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
            <MessageSquareHeart className="size-3 mr-1" /> Guest Reviews
          </Badge>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Loved by the neighbourhood
          </h2>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-5xl font-bold text-primary">
                4.5
              </span>
              <div className="text-left">
                <RatingStars rating={4.5} />
                <p className="text-xs text-muted-foreground mt-1">
                  Based on {restaurant.reviewCount} reviews
                </p>
              </div>
            </div>
            <div className="hidden sm:block h-12 w-px bg-border" />
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {reviewTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-accent/10 text-accent text-xs font-medium px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Rating distribution bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-md mb-14 bg-card rounded-2xl border border-border/60 p-5 shadow-sm"
        >
          {[
            { stars: 5, pct: 78 },
            { stars: 4, pct: 14 },
            { stars: 3, pct: 5 },
            { stars: 2, pct: 2 },
            { stars: 1, pct: 1 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3 py-1">
              <span className="text-xs font-medium text-muted-foreground w-6 text-right">
                {row.stars}★
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-spice-gradient rounded-full"
                />
              </div>
              <span className="text-xs text-muted-foreground w-9 text-right">
                {row.pct}%
              </span>
            </div>
          ))}
        </motion.div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col rounded-2xl bg-card border border-border/60 shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-11 items-center justify-center rounded-full ${initialsAvatarColor(
                      review.initials
                    )} text-white font-semibold text-sm shadow-sm`}
                  >
                    {review.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-tight">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {review.meta}
                    </p>
                  </div>
                </div>
                <Quote className="size-6 text-primary/30 shrink-0" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <RatingStars rating={review.rating} />
                <span className="text-xs text-muted-foreground">{review.time}</span>
              </div>

              <h3 className="font-serif-display font-bold text-foreground text-base mb-2">
                {review.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {review.text}
              </p>

              {review.ownerResponse && (
                <div className="mt-4 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center size-5 rounded-full bg-spice-gradient text-white text-[10px] font-bold">
                      S
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      Response from the owner
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {review.ownerResponse}
                  </p>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          Showing 3 of {restaurant.reviewCount} reviews ·{" "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Wakra+Salt+and+Pepper+Al+Mashaf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            Read all on Google Maps
          </a>
        </motion.p>
      </div>
    </section>
  );
}
