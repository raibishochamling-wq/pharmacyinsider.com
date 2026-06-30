"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Pill, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin({
  onLogin,
  onBack,
}: {
  onLogin: (password: string) => Promise<{ success: boolean; error?: string }>;
  onBack: () => void;
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await onLogin(password);
    if (!res.success) setError(res.error || "Login failed");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-4">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-card rounded-3xl shadow-2xl border border-border/60 p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-teal-gradient shadow-lg text-white mb-4">
              <Pill className="size-8" />
            </span>
            <h1 className="font-serif-display text-2xl font-bold text-foreground">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">PharmacyInsider</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pl-9 pr-10 h-11"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-teal-gradient text-white hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/60 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to blog
            </button>
          </div>

          <p className="mt-4 text-xs text-center text-muted-foreground">
            Demo password: <code className="font-mono bg-muted px-1.5 py-0.5 rounded">admin123</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
