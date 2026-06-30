"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Navigation,
  ExternalLink,
  Store,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { restaurant, mapsLink, mapsDirectionsLink } from "@/lib/restaurant-data";

export function Location() {
  return (
    <section id="visit" className="relative py-20 sm:py-28 bg-cream-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
            <MapPin className="size-3 mr-1" /> Visit Us
          </Badge>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Find us in Al Wukair
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Inside Grand Express Hypermarket on Street 212 — easy to spot, easier
            to love. Drop by for a meal or order ahead for pickup.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-xl border border-border/60 bg-card min-h-[22rem]"
          >
            <iframe
              title="Map showing Wakra Salt and Pepper Al Mashaf Branch location"
              src="https://www.google.com/maps?q=Wakra+Salt+and+Pepper+Al+Mashaf+Al+Wukair+Qatar&output=embed"
              className="size-full min-h-[22rem] lg:min-h-[28rem] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Address card */}
            <InfoCard icon={MapPin} title="Address" accent>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {restaurant.address.line1}
                <br />
                {restaurant.address.line2}
                <br />
                {restaurant.address.city}, {restaurant.address.country}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Plus Code:{" "}
                <span className="font-mono">{restaurant.address.plusCode}</span>
              </p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="mt-3 w-full"
              >
                <a href={mapsDirectionsLink} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-3.5" /> Get Directions
                </a>
              </Button>
            </InfoCard>

            {/* Hours card */}
            <InfoCard icon={Clock} title="Opening Hours">
              <p className="text-sm font-semibold text-emerald-600 mb-2">
                ● Open Now · Closes 1 AM
              </p>
              <ul className="space-y-1.5">
                {restaurant.hours.weekly.map((day) => (
                  <li
                    key={day.day}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="size-3" />
                      {day.day}
                    </span>
                    <span className="text-foreground/80 font-medium">
                      {day.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </InfoCard>

            {/* Contact card */}
            <InfoCard icon={Phone} title="Contact & Orders">
              <div className="space-y-2.5">
                <a
                  href={`tel:${restaurant.phone}`}
                  className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <Phone className="size-4 text-primary shrink-0" />
                  <span className="font-medium">{restaurant.phoneDisplay}</span>
                </a>
                <a
                  href={restaurant.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Globe className="size-4 text-primary shrink-0" />
                  <span className="font-medium">{restaurant.website}</span>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </a>
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <Store className="size-4 text-primary shrink-0" />
                  <span className="font-medium">Order on Talabat</span>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </a>
              </div>
              <Button
                asChild
                size="sm"
                className="mt-4 w-full bg-spice-gradient text-white hover:opacity-90"
              >
                <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                  <MapPin className="size-3.5" /> View on Google Maps
                </a>
              </Button>
            </InfoCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import type { LucideIcon } from "lucide-react";

function InfoCard({
  icon: Icon,
  title,
  children,
  accent = false,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className={`inline-flex size-9 items-center justify-center rounded-lg ${
            accent ? "bg-spice-gradient text-white" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-4.5" />
        </span>
        <h3 className="font-serif-display text-lg font-bold text-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
