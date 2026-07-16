"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { BrandLogo } from "./BrandLogo";

const SOCIAL_NETWORKS = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
] as const satisfies readonly {
  key: keyof SiteConfig["socialLinks"];
  label: string;
}[];

type SocialNetwork = (typeof SOCIAL_NETWORKS)[number]["key"];

/** Small local SVG marks avoid coupling the shared footer to remote assets. */
function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (network === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M13.6 21v-8h2.75l.4-3.15H13.6V7.82c0-.91.26-1.53 1.59-1.53H17V3.48a24 24 0 0 0-2.62-.14c-2.6 0-4.38 1.58-4.38 4.49v2.02H7.1V13H10v8h3.6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10v7M8 7.25v.01M12 17v-7M12 13.25c0-1.8 1.2-3.25 2.8-3.25 1.55 0 2.2 1.05 2.2 2.8V17" />
    </svg>
  );
}

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
    <footer
      ref={footerRef}
      className="border-t border-footer-border bg-footer text-footer-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_0.9fr]">
          <div>
            <BrandLogo logo={site.chromeLogo} size="footer" />
            <p className="mt-5 max-w-md leading-relaxed text-footer-muted">
              {site.footerDescription}
            </p>
            <p className="mt-3 text-sm font-semibold text-footer-accent">
              {site.slogan}
            </p>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-footer-foreground">
                Redes sociales
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_NETWORKS.filter(({ key }) =>
                  site.socialNetworks.includes(key)
                ).map(({ key, label }) => {
                  const href = site.socialLinks[key];
                  const className =
                    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-footer-border text-footer-foreground transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-footer-accent hover:bg-footer-accent hover:text-footer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-accent motion-reduce:transform-none";

                  return href ? (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} de ${site.name}`}
                      className={className}
                    >
                      <SocialIcon network={key} />
                    </a>
                  ) : (
                    <button
                      key={key}
                      type="button"
                      aria-disabled="true"
                      aria-label={`${label} de ${site.name}: enlace oficial pendiente`}
                      title="Enlace oficial pendiente de confirmación"
                      className={`${className} cursor-not-allowed opacity-45 hover:translate-y-0 hover:border-footer-border hover:bg-transparent hover:text-footer-foreground`}
                    >
                      <SocialIcon network={key} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-footer-foreground">Explorar</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-footer-muted transition-colors hover:text-footer-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {legalRoutes.length > 0 && (
              <div className="mt-6 border-t border-footer-border pt-5">
                <h3 className="text-sm font-semibold text-footer-foreground">
                  Legal y atención
                </h3>
                <ul className="mt-3 space-y-2">
                  {legalRoutes.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-footer-muted transition-colors hover:text-footer-accent"
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
            <h2 className="font-semibold text-footer-foreground">
              Información corporativa
            </h2>
            <div className="mt-4 space-y-3 text-sm text-footer-muted">
              {site.footerContact.location && (
                <p className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-footer-accent"
                    aria-hidden="true"
                  />
                  <span>{site.footerContact.location}</span>
                </p>
              )}
              {site.footerContact.email && (
                <a
                  href={`mailto:${site.footerContact.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-footer-accent"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-footer-accent"
                    aria-hidden="true"
                  />
                  {site.footerContact.email}
                </a>
              )}
              {site.contact.phone && (
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-footer-accent"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-footer-accent"
                    aria-hidden="true"
                  />
                  {site.contact.phone}
                </a>
              )}
              {!site.footerContact.location &&
                !site.footerContact.email &&
                !site.contact.phone && (
                  <p>Canales oficiales en proceso de validación.</p>
                )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-footer-border pt-8 text-sm text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-footer-muted/80">
            <span>{site.developmentTeam}</span>
            <a
              href="https://github.com/starfront"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar perfil de desarrollo en GitHub"
              className="inline-flex shrink-0 opacity-70 transition-[opacity,filter,transform] duration-200 hover:-translate-y-px hover:opacity-100 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-accent motion-reduce:transform-none"
            >
              <Image
                src="/dev.png"
                alt="Firma del equipo de desarrollo"
                width={295}
                height={295}
                className="h-4 w-4 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
