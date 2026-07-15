import { CareersPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "careers");

/** Renders the independent careers page for Distribuciones La Nieve. */
export default function Page() {
  return <CareersPage site={siteConfig} />;
}
