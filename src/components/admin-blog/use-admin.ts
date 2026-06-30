"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "pi_admin_token";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}
function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function getServerSnapshot() {
  return null;
}

export function useAdminAuth() {
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback(async (password: string) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok && data.success && data.token) {
      localStorage.setItem(STORAGE_KEY, data.token);
      window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
      return { success: true };
    }
    return { success: false, error: data.error || "Login failed" };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  return { token, loading: false, login, logout };
}
