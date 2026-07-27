import { HomePage, createPageMetadata } from "@corporativo/site-kit";
import { siteConfig } from "@/site.config";

export const metadata = createPageMetadata(siteConfig, "home");

export default function Page() {
  return <HomePage site={siteConfig} />;
}
