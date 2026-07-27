import type { MetadataRoute } from "next";
import { createSitemapEntries } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemapEntries(siteConfig);
}
