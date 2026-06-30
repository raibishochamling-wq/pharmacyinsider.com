"use client";

import { useEffect, useState } from "react";
import { BlogApp } from "@/components/blog/blog-app";
import { AdminApp } from "@/components/admin-blog/admin-app";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const h = window.location.hash.toLowerCase();
      setIsAdmin(h === "#admin" || h.startsWith("#admin/"));
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const exitAdmin = () => {
    window.location.hash = "";
    setIsAdmin(false);
  };

  const enterAdmin = () => {
    window.location.hash = "admin";
    setIsAdmin(true);
  };

  if (isAdmin) {
    return <AdminApp onExit={exitAdmin} />;
  }

  return <BlogApp onAdminClick={enterAdmin} />;
}
