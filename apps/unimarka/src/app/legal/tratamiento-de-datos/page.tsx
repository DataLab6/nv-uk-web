import {
  DataPolicyPage,
  JsonLd,
  buildLegalBreadcrumbJsonLd,
  createPageMetadata,
} from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "dataPolicy");

/** Renders the configured personal-data treatment document or status. */
export default function Page() {
  return (
    <>
      <JsonLd data={buildLegalBreadcrumbJsonLd(siteConfig, "dataPolicy")} />
      <DataPolicyPage site={siteConfig} />
    </>
  );
}
