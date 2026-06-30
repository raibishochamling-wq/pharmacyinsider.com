"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Star,
  Settings,
  CalendarClock,
  LogOut,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminDashboard } from "./admin-dashboard";
import { AdminMenu } from "./admin-menu";
import { AdminReviews } from "./admin-reviews";
import { AdminSettings } from "./admin-settings";
import { AdminReservations } from "./admin-reservations";

type Tab = "dashboard" | "menu" | "reviews" | "reservations" | "settings";

const navItems: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "menu", label: "Menu", icon: UtensilsCrossed },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "reservations", label: "Reservations", icon: CalendarClock },
  { key: "settings", label: "Settings", icon: Settings },
];

export function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTab = navItems.find((n) => n.key === tab);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/60 bg-card">
        <SidebarContent
          tab={tab}
          setTab={(t) => {
            setTab(t);
            setSidebarOpen(false);
          }}
          onLogout={onLogout}
        />
      </aside>

      {/* Sidebar — mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 max-w-[80vw] flex flex-col border-r border-border/60 bg-card shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </button>
            <SidebarContent
              tab={tab}
              setTab={(t) => {
                setTab(t);
                setSidebarOpen(false);
              }}
              onLogout={onLogout}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border/60">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-muted-foreground hover:text-foreground"
                aria-label="Open sidebar"
              >
                <MenuIcon className="size-5" />
              </button>
              <div className="flex items-center gap-2">
                {currentTab && (
                  <span className="flex size-8 items-center justify-center rounded-lg bg-spice-gradient text-white">
                    <currentTab.icon className="size-4" />
                  </span>
                )}
                <span className="font-serif-display text-lg font-semibold text-foreground">
                  {currentTab?.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <a href="#">
                  <ExternalLink className="size-3.5" /> View Site
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onLogout}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-6xl"
          >
            {tab === "dashboard" && <AdminDashboard />}
            {tab === "menu" && <AdminMenu />}
            {tab === "reviews" && <AdminReviews />}
            {tab === "reservations" && <AdminReservations />}
            {tab === "settings" && <AdminSettings />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  tab,
  setTab,
  onLogout,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  onLogout: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-border/60">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="flex size-10 items-center justify-center rounded-xl bg-spice-gradient shadow-md text-white">
            <Utensils className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif-display font-bold text-sm text-foreground">
              Wakra S&amp;P
            </span>
            <span className="text-[10px] tracking-widest uppercase text-primary">
              Admin
            </span>
          </span>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-spice-gradient text-white shadow-sm"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/60">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </>
  );
}
