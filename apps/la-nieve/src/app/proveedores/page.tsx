import { SuppliersPage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "suppliers");

export default function Page() {
  return <SuppliersPage site={siteConfig} />;
}
