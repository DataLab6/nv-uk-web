import { LegalPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "legal");

/** Renders the legal information hub for Distribuciones La Nieve. */
export default function Page() {
  return <LegalPage site={siteConfig} />;
}
