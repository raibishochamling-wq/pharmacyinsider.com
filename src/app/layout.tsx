import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Wakra Salt and Pepper — Al Mashaf | Authentic Indian & Chinese Cuisine in Al Wukair",
  description:
    "Wakra Salt and Pepper, Al Mashaf Branch — a family-friendly restaurant in Al Wukair, Qatar serving authentic traditional Indian and Chinese dishes. Dine-in, takeaway & delivery. Rated 4.5 stars by 83 happy guests.",
  keywords: [
    "Wakra Salt and Pepper",
    "Al Mashaf restaurant",
    "Al Wukair restaurant",
    "Indian food Qatar",
    "Chinese food Qatar",
    "Butter Chicken",
    "Paneer 65",
    "Biryani Qatar",
    "family restaurant Al Wukair",
  ],
  authors: [{ name: "Wakra Salt and Pepper" }],
  openGraph: {
    title: "Wakra Salt and Pepper — Al Mashaf Branch",
    description:
      "Authentic traditional Indian & Chinese cuisine in Al Wukair, Qatar. Rated 4.5★ by 83 happy guests. Dine-in, takeaway & delivery available.",
    siteName: "Wakra Salt and Pepper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wakra Salt and Pepper — Al Mashaf Branch",
    description:
      "Authentic traditional Indian & Chinese cuisine in Al Wukair, Qatar.",
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
      </body>
    </html>
  );
}
