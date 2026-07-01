"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Pill,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "./use-admin";
import { AdminLogin } from "./admin-login";
import { AdminDashboard } from "./admin-dashboard";
import { AdminPosts } from "./admin-posts";
import { AdminEditor } from "./admin-editor";
import { AdminSettings } from "./admin-settings";

type Tab = "dashboard" | "posts" | "settings";

export function AdminApp({ onExit }: { onExit: () => void }) {
  const { token, login, logout } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null | undefined>(undefined);
  // undefined = list view, null = new post, string = edit post

  if (!token) {
    return <AdminLogin onLogin={login} onBack={onExit} />;
  }

  const navItems: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "posts", label: "Posts", icon: FileText },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const handleEditPost = (id: string) => {
    setEditingPostId(id);
    setTab("posts");
  };

  const handleNewPost = () => {
    setEditingPostId(null);
    setTab("posts");
  };

  const handleBackToList = () => {
    setEditingPostId(undefined);
  };

  const currentTab = navItems.find((n) => n.key === tab);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/60 bg-card">
        <SidebarContent
          tab={tab}
          setTab={(t) => {
            setTab(t);
            setEditingPostId(undefined);
            setSidebarOpen(false);
          }}
          onExit={onExit}
          onLogout={logout}
          onNewPost={handleNewPost}
        />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 max-w-[80vw] flex flex-col border-r border-border/60 bg-card shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </button>
            <SidebarContent
              tab={tab}
              setTab={(t) => {
                setTab(t);
                setEditingPostId(undefined);
                setSidebarOpen(false);
              }}
              onExit={onExit}
              onLogout={logout}
              onNewPost={handleNewPost}
            />
          </aside>
        </div>
      )}

      {/* Main */}
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
                  <span className="flex size-8 items-center justify-center rounded-lg bg-teal-gradient text-white">
                    <currentTab.icon className="size-4" />
                  </span>
                )}
                <span className="font-serif-display text-lg font-semibold text-foreground">
                  {tab === "posts" && editingPostId !== undefined
                    ? editingPostId === null
                      ? "New Post"
                      : "Edit Post"
                    : currentTab?.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <a href="#" onClick={(e) => { e.preventDefault(); onExit(); }}>
                  <ExternalLink className="size-3.5" /> View Blog
                </a>
              </Button>
              <Button size="sm" variant="ghost" onClick={logout} className="text-destructive hover:text-destructive">
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            key={`${tab}-${editingPostId}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-6xl"
          >
            {tab === "dashboard" && <AdminDashboard onEditPost={handleEditPost} />}
            {tab === "posts" && editingPostId === undefined && (
              <AdminPosts onEditPost={handleEditPost} onNewPost={handleNewPost} />
            )}
            {tab === "posts" && editingPostId !== undefined && (
              <AdminEditor postId={editingPostId} onBack={handleBackToList} />
            )}
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
  onExit,
  onLogout,
  onNewPost,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  onExit: () => void;
  onLogout: () => void;
  onNewPost: () => void;
}) {
  const navItems: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "posts", label: "Posts", icon: FileText },
    { key: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <>
      <div className="p-5 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-teal-gradient shadow-md text-white">
            <Pill className="size-5" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-serif-display font-bold text-sm text-foreground">PharmacyInsider</span>
            <span className="text-[10px] tracking-widest uppercase text-primary">Admin</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <Button
          onClick={onNewPost}
          className="w-full bg-teal-gradient text-white hover:opacity-90"
        >
          <Plus className="size-4" /> New Post
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
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
                  ? "bg-teal-gradient text-white shadow-sm"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/60">
        <button
          onClick={onExit}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
        >
          <ExternalLink className="size-4" />
          View Blog
        </button>
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
