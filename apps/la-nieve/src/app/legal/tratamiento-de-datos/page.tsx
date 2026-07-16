import { createPageMetadata, DataPolicyPage } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "dataPolicy");

/** Renders the configured personal-data treatment document or status. */
export default function Page() {
  return <DataPolicyPage site={siteConfig} />;
}
