import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteChrome, createSiteMetadata } from "@corporativo/site-kit";
import "@corporativo/site-kit/styles.css";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = createSiteMetadata(siteConfig);

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es"
      className={`brand-${siteConfig.id}`}
      suppressHydrationWarning
    >
      <body>
        <SiteChrome site={siteConfig}>{children}</SiteChrome>
      </body>
    </html>
  );
}
