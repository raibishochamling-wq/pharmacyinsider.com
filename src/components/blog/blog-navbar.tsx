"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, Pill, Moon, Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Vitamins", "Minerals", "Supplements"];

export function BlogNavbar({
  activeCategory,
  onCategoryChange,
  onSearch,
  searchQuery,
  onHomeClick,
}: {
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  onSearch: (q: string) => void;
  searchQuery: string;
  onHomeClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border/60 shadow-sm"
          : "bg-background border-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2.5 group"
          >
            <span className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-teal-gradient shadow-md text-white transition-transform group-hover:scale-105">
              <Pill className="size-4 sm:size-5" />
            </span>
            <span className="flex flex-col leading-none text-left">
              <span className="font-serif-display font-bold text-base sm:text-lg text-foreground tracking-tight">
                PharmacyInsider
              </span>
              <span className="text-[10px] sm:text-[11px] text-primary tracking-wider uppercase font-medium">
                Health · Wellness · Truth
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors",
                  activeCategory === cat
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="size-4" />
            </button>
            <button
              onClick={() => setDark((v) => !v)}
              className="hidden sm:inline-flex size-9 items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Search bar (expandable) */}
        {searchOpen && (
          <div className="pb-3 pt-1">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search articles, supplements, vitamins…"
                autoFocus
                className="w-full h-11 pl-10 pr-4 rounded-full bg-muted border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile category drawer */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat);
                  setOpen(false);
                }}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium rounded-lg text-left transition-colors flex items-center justify-between",
                  activeCategory === cat
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {cat}
                {activeCategory === cat && <ArrowRight className="size-4" />}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
