import { createPageMetadata, DataPolicyPage } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "dataPolicy");

/** Renders the draft personal-data treatment page. */
export default function Page() {
  return <DataPolicyPage site={siteConfig} />;
}
