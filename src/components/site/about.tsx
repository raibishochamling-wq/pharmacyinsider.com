"use client";

import { motion } from "framer-motion";
import { Quote, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { interiorImage, restaurant } from "@/lib/restaurant-data";

const highlights = [
  "Authentic traditional Indian recipes",
  "Chinese & BBQ favourites",
  "Family-friendly dining space",
  "Budget-friendly pricing",
  "Dine-in, Takeaway & Delivery",
  "Late-night hours — open until 1 AM",
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pattern-dots opacity-50" aria-hidden />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[5/4] bg-muted">
              <img
                src={interiorImage}
                alt="Warm, inviting interior of Wakra Salt and Pepper restaurant"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-2 sm:-left-6 bg-card rounded-2xl shadow-xl border border-border/60 p-5 max-w-[14rem]"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-3xl font-bold text-primary">
                  4.5
                </span>
                <div className="flex flex-col">
                  <div className="flex">
                    {[0, 1, 2, 3].map((i) => (
                      <svg
                        key={i}
                        className="size-3.5 fill-amber-400 text-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.4 4.8 17.2l1-5.8L1.5 7.2l5.9-.9L10 1z" />
                      </svg>
                    ))}
                    <svg
                      className="size-3.5 fill-amber-400/50 text-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15.4 4.8 17.2l1-5.8L1.5 7.2l5.9-.9L10 1z" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    83 Google reviews
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                &ldquo;Yummy food, friendly staff, budget friendly food space.&rdquo;
              </p>
            </motion.div>

            {/* Decorative badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-spice-gradient text-primary-foreground rounded-full px-4 py-2 shadow-lg rotate-3">
              <span className="text-xs font-bold tracking-wider uppercase">
                Est. Family Restaurant
              </span>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              <Quote className="size-3 mr-1" /> Our Story
            </Badge>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              A neighbourhood table for{" "}
              <span className="text-primary">authentic Indian flavours</span>
            </h2>

            <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Tucked inside the Grand Express Hypermarket on Street 212, the{" "}
                <strong className="text-foreground">Al Mashaf branch</strong> of
                Wakra Salt &amp; Pepper has quietly become one of Al Wukair&apos;s
                most-loved family dining spots. What started as a humble kitchen
                serving traditional home-style meals has grown into a beloved
                gathering place for families, friends and celebration-makers
                across the neighbourhood.
              </p>
              <p>
                Our kitchen stays true to its roots — dishing out authentic{" "}
                <strong className="text-foreground">traditional Indian</strong>{" "}
                preparations alongside a carefully chosen selection of{" "}
                <strong className="text-foreground">Chinese</strong> and BBQ
                favourites. Every plate is cooked to order using fresh
                ingredients and proper spice blends, the kind of food that
                regulars keep coming back for, week after week.
              </p>
              <p>
                Whether you&apos;re here for a casual weekday dinner, a birthday
                celebration with the family, or a quick takeaway on the way home,
                our team makes sure every guest feels looked after — polite
                service, generous portions and prices that respect your wallet.
              </p>
            </div>

            {/* Highlights grid */}
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground/90"
                >
                  <CheckCircle2 className="size-4 mt-0.5 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
