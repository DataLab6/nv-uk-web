import { AlliesPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "allies");

/** Renders the commercial allies directory for Unimarka. */
export default function Page() {
  return <AlliesPage site={siteConfig} />;
}
