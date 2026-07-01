import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PharmacyInsider — Honest, Research-Backed Health Tips from a Pharmacy Professional",
  description:
    "PharmacyInsider shares honest, research-backed health and wellness tips about vitamins, minerals, and supplements. Written by a pharmacy professional with 3+ years of hands-on experience in Qatar. Your health is my priority.",
  keywords: [
    "PharmacyInsider",
    "pharmacy blog",
    "vitamins",
    "supplements",
    "magnesium",
    "folic acid",
    "vitamin D",
    "iron",
    "omega-3",
    "biotin",
    "ashwagandha",
    "melatonin",
    "health tips Qatar",
  ],
  authors: [{ name: "PharmacyInsider" }],
  openGraph: {
    title: "PharmacyInsider — Honest Health Tips from a Pharmacy Professional",
    description:
      "Research-backed tips on vitamins, minerals, and supplements from a pharmacy professional with 3+ years of experience. Your health is my priority.",
    siteName: "PharmacyInsider",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PharmacyInsider",
    description: "Honest, research-backed health tips from a pharmacy professional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
