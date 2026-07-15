import { LegalPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "legal");

/** Renders the legal information hub for Unimarka. */
export default function Page() {
  return <LegalPage site={siteConfig} />;
}
