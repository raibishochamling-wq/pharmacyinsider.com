"use client";

import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Globe,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { restaurant } from "@/lib/restaurant-data";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit Us" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-background mt-auto">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <span className="flex size-11 items-center justify-center rounded-full bg-spice-gradient shadow-md text-white">
                <UtensilsCrossed className="size-6" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif-display font-bold text-lg text-white">
                  Wakra Salt &amp; Pepper
                </span>
                <span className="text-[11px] font-medium tracking-widest uppercase text-amber-300">
                  Al Mashaf Branch
                </span>
              </span>
            </a>
            <p className="text-sm text-background/70 leading-relaxed max-w-sm">
              Authentic traditional Indian &amp; Chinese cuisine served with
              warmth in Al Wukair, Qatar. A family-friendly neighbourhood
              restaurant since day one.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="font-serif-display text-2xl font-bold text-amber-300">
                4.5
              </span>
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
              <span className="text-xs text-background/60 ml-1">
                · 83 Google reviews
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/75 hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {restaurant.services.map((s) => (
                <li
                  key={s.key}
                  className="text-sm text-background/75"
                >
                  {s.title}
                </li>
              ))}
              <li className="text-sm text-background/75">Family Dining</li>
              <li className="text-sm text-background/75">Birthday Parties</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Get in touch
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-background/75">
                <MapPin className="size-4 mt-0.5 text-amber-300 shrink-0" />
                <span>
                  {restaurant.address.line1},{" "}
                  {restaurant.address.line2}, {restaurant.address.city},{" "}
                  {restaurant.address.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${restaurant.phone}`}
                  className="flex items-center gap-2.5 text-sm text-background/75 hover:text-amber-300 transition-colors"
                >
                  <Phone className="size-4 text-amber-300 shrink-0" />
                  {restaurant.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={restaurant.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-background/75 hover:text-amber-300 transition-colors"
                >
                  <Globe className="size-4 text-amber-300 shrink-0" />
                  {restaurant.website}
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/75">
                <Clock className="size-4 mt-0.5 text-amber-300 shrink-0" />
                <span>
                  Open daily · 9:00 AM – 1:00 AM
                  <br />
                  <span className="text-xs text-emerald-400">● Currently open</span>
                </span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={restaurant.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full size-9 bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Order on Talabat"
              >
                <UtensilsCrossed className="size-4 text-amber-300" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full size-9 bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-4 text-amber-300" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full size-9 bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="size-4 text-amber-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/55">
          <p>
            © {year} Wakra Salt &amp; Pepper — Al Mashaf Branch. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5">
              Crafted with care for the Al Wukair community
            </p>
            <a
              href="#admin"
              className="text-background/40 hover:text-amber-300 transition-colors"
            >
              Staff Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
