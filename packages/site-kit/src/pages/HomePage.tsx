import { Brands } from "../components/Brands";
import { CustomerChannels } from "../components/CustomerChannels";
import { Hero } from "../components/Hero";
import { Innovation } from "../components/Innovation";
import { Stats } from "../components/Stats";
import { WhatsAppButton } from "../components/WhatsAppButton";
import type { SiteConfig } from "../config/types";

/**
 * Shared home composition for both corporate brands. Every section reads from
 * the active site's configuration, preserving independent content and assets.
 */
export function HomePage({ site }: { site: SiteConfig }) {
  return (
    <>
      <Hero site={site} />
      <Brands site={site} />
      <Stats site={site} />
      <CustomerChannels site={site} />
      <Innovation site={site} />
      <WhatsAppButton site={site} />
    </>
  );
}
