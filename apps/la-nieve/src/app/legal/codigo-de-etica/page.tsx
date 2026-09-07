import {
  EthicsCodePage,
  JsonLd,
  buildLegalBreadcrumbJsonLd,
  createNoIndexPageMetadata,
  getPageHref,
} from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

/**
 * This route is intentionally `noindex`/`nofollow` while its content remains
 * fictional and unapproved, even though its page key is present in navigation.
 */
export const metadata = createNoIndexPageMetadata(siteConfig, {
  title: siteConfig.ethics.title,
  description: siteConfig.ethics.description,
  href: getPageHref(siteConfig, "ethics"),
});

export default function Page() {
  return (
    <>
      <JsonLd data={buildLegalBreadcrumbJsonLd(siteConfig, "ethics")} />
      <EthicsCodePage site={siteConfig} />
    </>
  );
}
