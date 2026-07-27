import {
  JsonLd,
  PqrsPage,
  buildLegalBreadcrumbJsonLd,
  createPageMetadata,
} from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "pqrs");

/** Renders the draft PQRS information page. */
export default function Page() {
  return (
    <>
      <JsonLd data={buildLegalBreadcrumbJsonLd(siteConfig, "pqrs")} />
      <PqrsPage site={siteConfig} />
    </>
  );
}
