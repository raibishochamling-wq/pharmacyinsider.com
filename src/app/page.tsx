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

export default function Home() {
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
