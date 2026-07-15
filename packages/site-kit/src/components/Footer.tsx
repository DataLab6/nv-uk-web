"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { BrandLogo } from "./BrandLogo";

/**
 * Shared footer populated only with app-owned brand information and mirrored
 * corporate routes.
 */
export function Footer({ site }: { site: SiteConfig }) {
  const footerRef = useRevealAnimation<HTMLElement>({
    type: "fadeUp",
    duration: 0.7,
  });
  const legalRoutes =
    site.navigation.find((item) => item.page === "legal")?.children ?? [];

  return (
    <footer ref={footerRef} className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-white/95 px-3 shadow-sm">
              <BrandLogo logo={site.logo} size="footer" />
            </div>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              {site.footerDescription}
            </p>
            <p className="mt-3 text-sm font-semibold text-primary">
              {site.slogan}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground">Explorar</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {legalRoutes.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Legal y atención
                </h3>
                <ul className="mt-3 space-y-2">
                  {legalRoutes.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-foreground">
              Información corporativa
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {site.contact.location && (
                <p className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {site.contact.location}
                </p>
              )}
              {site.contact.email && (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {site.contact.email}
                </a>
              )}
              {site.contact.phone && (
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {site.contact.phone}
                </a>
              )}
              {!site.contact.location &&
                !site.contact.email &&
                !site.contact.phone && (
                  <p>Canales oficiales en proceso de validación.</p>
                )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos los derechos
            reservados.
          </p>
          <p>Contenido corporativo sujeto a validación oficial.</p>
        </div>
      </div>
    </footer>
  );
}
