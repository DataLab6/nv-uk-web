"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { SiteConfig } from "../config/types";
import { Footer } from "./Footer";
import { LenisProvider } from "./LenisProvider";
import { Navigation } from "./Navigation";
import { ScrollProgress } from "./ScrollProgress";
import { ThemeProvider } from "./ThemeProvider";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Persistent application shell shared across all routes and both brands.
 */
export function SiteChrome({
  site,
  children,
}: {
  site: SiteConfig;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isLegal = pathname === "/legal" || pathname.startsWith("/legal/");

  return (
    <ThemeProvider>
      <LenisProvider>
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <Navigation site={site} />
        <ScrollProgress />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer site={site} />
        {!isLegal && <WhatsAppButton site={site} />}
      </LenisProvider>
    </ThemeProvider>
  );
}
