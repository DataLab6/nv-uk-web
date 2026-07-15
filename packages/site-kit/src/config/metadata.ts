import type { Metadata } from "next";
import type { SiteConfig, SitePageKey } from "./types";

const PAGE_COPY_KEYS = {
  home: "home",
  about: "about",
  allies: "allies",
  culture: "culture",
  contact: "contact",
  careers: "careers",
  legal: "legal",
  dataPolicy: "dataPolicy",
  pqrs: "pqrs",
} as const satisfies Record<SitePageKey, keyof SiteConfig>;

/**
 * Builds root metadata from one app-owned brand configuration.
 */
export function createSiteMetadata(site: SiteConfig): Metadata {
  return {
    applicationName: site.name,
    title: {
      default: site.metadata.title,
      template: site.metadata.titleTemplate,
    },
    description: site.metadata.description,
    keywords: [...site.metadata.keywords],
    icons: {
      icon: site.logo.src,
      shortcut: site.logo.src,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: site.name,
      title: site.metadata.title,
      description: site.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Builds route metadata without introducing claims beyond each page's copy.
 */
export function createPageMetadata(
  site: SiteConfig,
  page: SitePageKey
): Metadata {
  const copy = site[PAGE_COPY_KEYS[page]] as SitePageCopyLike;

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: `${copy.title} | ${site.name}`,
      description: copy.description,
    },
  };
}

interface SitePageCopyLike {
  readonly title: string;
  readonly description: string;
}
