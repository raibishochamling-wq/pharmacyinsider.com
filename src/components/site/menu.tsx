"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame, Leaf, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menuHighlights, restaurant } from "@/lib/restaurant-data";

export function Menu() {
  return (
    <section id="menu" className="relative py-20 sm:py-28 bg-cream-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
            <UtensilsCrossed className="size-3 mr-1" /> Menu Highlights
          </Badge>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            A taste of what&apos;s cooking
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            A small selection from our kitchen — from signature curries to
            comforting classics. The full menu has many more dishes waiting for
            you.
          </p>
        </motion.div>

        {/* Featured dish (first item — large) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <FeaturedDish dish={menuHighlights[0]} />
        </motion.div>

        {/* Grid of remaining dishes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuHighlights.slice(1).map((dish, idx) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <DishCard dish={dish} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Hungry for more? Browse the full menu and place your order online.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-spice-gradient text-white hover:opacity-90 shadow-md px-7 h-12"
          >
            <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
              See Full Menu &amp; Order
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

type Dish = (typeof menuHighlights)[number];

function tagIcon(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("spicy") || t.includes("chef")) return <Flame className="size-3" />;
  if (t.includes("veg")) return <Leaf className="size-3" />;
  return null;
}

function FeaturedDish({ dish }: { dish: Dish }) {
  return (
    <article className="group relative grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-border/60 bg-card">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[22rem] bg-muted overflow-hidden">
        <img
          src={dish.image}
          alt={dish.alt}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-spice-gradient text-white text-xs font-semibold px-3 py-1.5 shadow-md">
            {dish.badge}
          </span>
        </div>
      </div>

      <div className="p-7 sm:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-xs font-medium px-2.5 py-1">
            {tagIcon(dish.tag)} {dish.tag}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Signature Dish
          </span>
        </div>

        <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
          {dish.name}
        </h3>

        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {dish.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-serif-display text-3xl font-bold text-primary">
              {dish.price}
            </span>
          </div>
          <Button
            asChild
            className="bg-spice-gradient text-white hover:opacity-90"
          >
            <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
              Order <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group h-full flex flex-col rounded-2xl overflow-hidden shadow-md border border-border/60 bg-card hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={dish.image}
          alt={dish.alt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-[11px] font-semibold px-2.5 py-1 shadow-sm">
            {tagIcon(dish.tag)} {dish.tag}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-spice-gradient text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm">
            {dish.badge}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif-display text-lg font-bold text-foreground leading-snug">
          {dish.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {dish.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif-display text-xl font-bold text-primary">
            {dish.price}
          </span>
          <a
            href={restaurant.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Order <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
