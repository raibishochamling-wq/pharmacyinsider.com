"use client";

import { useAdminAuth } from "./use-admin";
import { AdminLogin } from "./admin-login";
import { AdminShell } from "./admin-shell";
import { Loader2 } from "lucide-react";

export function AdminApp() {
  const { token, loading, login, logout } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-spice-gradient">
        <Loader2 className="size-8 animate-spin text-white" />
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminShell onLogout={logout} />;
}
