"use client";

import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { restaurant } from "@/lib/restaurant-data";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit Us" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span
              className={cn(
                "flex size-10 sm:size-11 items-center justify-center rounded-full bg-spice-gradient shadow-md transition-transform group-hover:scale-105",
                scrolled ? "text-primary-foreground" : "text-white"
              )}
            >
              <UtensilsCrossed className="size-5 sm:size-6" />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-serif-display font-bold text-base sm:text-lg tracking-tight transition-colors",
                  scrolled ? "text-foreground" : "text-white"
                )}
              >
                Wakra Salt &amp; Pepper
              </span>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-medium tracking-widest uppercase transition-colors",
                  scrolled ? "text-primary" : "text-amber-200"
                )}
              >
                Al Mashaf Branch
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors hover:bg-accent/10",
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-spice-gradient text-white hover:opacity-90 shadow-md"
            >
              <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            </Button>
            <a
              href={`tel:${restaurant.phone}`}
              className={cn(
                "hidden md:inline-flex size-10 items-center justify-center rounded-full transition-colors",
                scrolled
                  ? "text-primary hover:bg-primary/10"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Call us"
            >
              <Phone className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "lg:hidden inline-flex size-10 items-center justify-center rounded-full transition-colors",
                scrolled
                  ? "text-foreground hover:bg-accent/10"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-background/98 backdrop-blur-md border-b border-border",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium rounded-lg text-foreground hover:bg-accent/10 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2 pb-1">
            <Button
              asChild
              className="flex-1 bg-spice-gradient text-white hover:opacity-90"
            >
              <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href={`tel:${restaurant.phone}`}>
                <Phone className="size-4" /> Call
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
