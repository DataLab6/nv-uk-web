import { ContactPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "contact");

/** Renders the independent contact page for Unimarka. */
export default function Page() {
  return <ContactPage site={siteConfig} />;
}
