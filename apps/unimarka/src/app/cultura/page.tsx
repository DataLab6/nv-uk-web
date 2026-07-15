import { CulturePage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "culture");

/** Renders the customer resources area for Unimarka. */
export default function Page() {
  return <CulturePage site={siteConfig} />;
}
