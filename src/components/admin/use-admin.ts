"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "wsp_admin_token";

// Subscribe to localStorage changes — React 19 recommended pattern
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
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
  // useSyncExternalStore handles external state (localStorage) properly.
  // On first client render getSnapshot returns the actual value; SSR returns null.
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
      // Manually dispatch storage event so useSyncExternalStore updates
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

export function useHashRoute() {
  const hash = useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      return () => window.removeEventListener("hashchange", cb);
    },
    () => (typeof window !== "undefined" ? window.location.hash || "" : ""),
    () => ""
  );
  return hash;
}
