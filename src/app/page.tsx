import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Brands } from "@/components/Brands/Brands";
import { Products } from "@/components/Products/Products";
import { WhyChooseUs } from "@/components/WhyChooseUs/WhyChooseUs";
import { Coverage } from "@/components/Coverage/Coverage";
import { Stats } from "@/components/Stats/Stats";
import { Clients } from "@/components/Clients/Clients";
import { CTA } from "@/components/CTA/CTA";
import { Footer } from "@/components/Footer/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

/**
 * Main page for La Nieve corporate website.
 * Assembles all sections in the defined visual architecture order.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Brands />
        <Products />
        <WhyChooseUs />
        <Coverage />
        <Stats />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
