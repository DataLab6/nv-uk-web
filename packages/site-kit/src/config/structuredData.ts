import type { SiteConfig, SitePageKey } from "./types";

/**
 * Organization + WebSite structured data, combined in a single `@graph` to
 * avoid repeating `@context` and to keep the two schemas from ever
 * contradicting each other. Every property is sourced directly from the
 * brand's own configuration — nothing here is invented:
 *
 * - `sameAs` only lists the social profiles this brand actually has
 *   configured (`socialLinks`, already filtered to real, non-null URLs).
 * - `email`/`address` come from `footerContact`, the exact data already
 *   rendered, visibly, in this site's own footer.
 * - `telephone` comes from `contact.phone`, already rendered on the Contact
 *   page.
 * - `addressCountry` is not a separate claim: both brands' own metadata
 *   description already states they are Colombian companies.
 *
 * No ratings, reviews, prices or opening hours are included, since none of
 * that exists anywhere in the project.
 */
export function buildOrganizationAndWebsiteJsonLd(site: SiteConfig) {
  const sameAs = Object.values(site.socialLinks).filter((url): url is string =>
    Boolean(url)
  );
  const logoUrl =
    typeof site.logo.src === "string"
      ? new URL(site.logo.src, site.siteUrl).toString()
      : undefined;

  const organization = {
    "@type": "Organization",
    "@id": `${site.siteUrl}/#organization`,
    name: site.legalName,
    url: site.siteUrl,
    ...(logoUrl && { logo: logoUrl }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(site.footerContact.email && { email: site.footerContact.email }),
    ...(site.contact.phone && { telephone: site.contact.phone }),
    ...(site.footerContact.location && {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.footerContact.location,
        addressCountry: "CO",
      },
    }),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.siteUrl}/#website`,
    name: site.name,
    url: site.siteUrl,
    publisher: { "@id": `${site.siteUrl}/#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}

export interface BreadcrumbTrailItem {
  readonly label: string;
  readonly href: string;
}

/**
 * Breadcrumb structured data for a real navigation path (e.g. Home > Legal >
 * Tratamiento de datos). Never rendered as visible UI — purely for search
 * engines — and only ever built from labels/hrefs that already exist in
 * `site.navigation`, so it can't misrepresent the site's actual structure.
 */
export function buildBreadcrumbJsonLd(
  site: SiteConfig,
  trail: readonly BreadcrumbTrailItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, site.siteUrl).toString(),
    })),
  };
}

/** Convenience: builds the Home > Legal > {page} trail for the two nested legal pages. */
export function buildLegalBreadcrumbJsonLd(
  site: SiteConfig,
  page: SitePageKey
) {
  const legalItem = site.navigation.find((item) => item.page === "legal");
  const childItem = legalItem?.children?.find((item) => item.page === page);

  if (!legalItem || !childItem) {
    return buildBreadcrumbJsonLd(site, [{ label: "Inicio", href: "/" }]);
  }

  return buildBreadcrumbJsonLd(site, [
    { label: "Inicio", href: "/" },
    { label: legalItem.label, href: legalItem.href },
    { label: childItem.label, href: childItem.href },
  ]);
}
