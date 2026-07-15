import { CulturePage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "culture");

/** Renders the customer resources area for Distribuciones La Nieve. */
export default function Page() {
  return <CulturePage site={siteConfig} />;
}
