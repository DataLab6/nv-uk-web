import { createPageMetadata, PqrsPage } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "pqrs");

/** Renders the draft PQRS information page. */
export default function Page() {
  return <PqrsPage site={siteConfig} />;
}
