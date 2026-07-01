"use client";

import { Pill, Mail, Heart } from "lucide-react";

export function BlogFooter({ onAdminClick }: { onAdminClick: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background mt-auto">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-teal-gradient shadow-md text-white">
                <Pill className="size-5" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-serif-display font-bold text-lg text-white">
                  PharmacyInsider
                </span>
                <span className="text-[11px] tracking-widest uppercase text-amber-300">
                  Health · Wellness · Truth
                </span>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed max-w-md">
              Honest, research-backed health and wellness tips from a pharmacy
              professional. Helping you make better decisions about vitamins,
              minerals, and supplements.
            </p>
            <p className="mt-4 font-serif-display text-base italic text-amber-300">
              &ldquo;Your health is my priority.&rdquo;
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h4 className="font-serif-display text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-background/75 hover:text-amber-300 transition-colors">All Articles</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} className="text-background/75 hover:text-amber-300 transition-colors">About</a></li>
              <li>
                <a href="mailto:hello@pharmacyinsider.com" className="flex items-center gap-2 text-background/75 hover:text-amber-300 transition-colors">
                  <Mail className="size-4" /> Contact
                </a>
              </li>
              <li>
                <button onClick={onAdminClick} className="text-background/50 hover:text-amber-300 transition-colors text-xs">
                  Staff Login
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/55">
          <p>© {year} PharmacyInsider. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="size-3 fill-rose-400 text-rose-400" /> for healthier choices
          </p>
        </div>
      </div>
    </footer>
  );
}
