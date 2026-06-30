"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { QuickInfo } from "@/components/site/quick-info";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Menu } from "@/components/site/menu";
import { Reviews } from "@/components/site/reviews";
import { Location } from "@/components/site/location";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { AdminApp } from "@/components/admin/admin-app";

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

  if (isAdmin) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <QuickInfo />
        <About />
        <Services />
        <Menu />
        <Reviews />
        <Location />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
