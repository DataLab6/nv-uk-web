import { AboutPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "about");

/** Renders the corporate identity page for Unimarka. */
export default function Page() {
  return <AboutPage site={siteConfig} />;
}
