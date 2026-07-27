import type { MetadataRoute } from "next";
import { createRobotsConfig } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return createRobotsConfig(siteConfig);
}
