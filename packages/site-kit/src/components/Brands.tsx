"use client";

import type { SiteBrandLogo, SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { AllyLogo } from "./AllyLogo";

function AllySlot({ logo }: { logo: SiteBrandLogo }) {
  return (
    <li className="flex h-24 w-52 shrink-0 items-center justify-center px-4 sm:w-60 sm:px-5">
      <div className="flex h-20 w-full items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 dark:rounded-2xl dark:bg-white/90 dark:px-4 dark:py-3 dark:shadow-sm motion-reduce:transform-none">
        <AllyLogo
          name={logo.name}
          image={logo.image}
          className="h-16"
          displayWidth={logo.displayWidth}
          visualScale={logo.visualScale}
          sizes={`${logo.displayWidth ?? 160}px`}
        />
      </div>
    </li>
  );
}

/**
 * Accessible partner marquee with approved, brand-specific logo assets.
 */
export function Brands({ site }: { site: SiteConfig }) {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const logos = site.allies.logos;

  return (
    <section
      ref={sectionRef}
      id="brands"
      aria-labelledby="home-allies-title"
      className="relative overflow-hidden border-y border-primary/10 bg-surface py-20 sm:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden="true"
      />

      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {site.allies.eyebrow}
          </span>
          <h2
            id="home-allies-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            {site.allies.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {site.allies.description}
          </p>
        </div>
      </div>

      {logos.length > 0 ? (
        <div
          className="relative"
          role="region"
          aria-label={`Aliados comerciales de ${site.name}`}
        >
          <ul className="sr-only">
            {logos.map((logo) => (
              <li key={logo.name}>{logo.name}</li>
            ))}
          </ul>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-28"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-28"
            aria-hidden="true"
          />

          <div className="overflow-hidden" aria-hidden="true">
            <div
              id="home-allies-track"
              className="animate-marquee flex w-max items-center"
            >
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex items-stretch gap-5 pr-5">
                  {logos.map((logo) => (
                    <AllySlot key={`${copy}-${logo.name}`} logo={logo} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          Los aliados se incorporarán cuando sus recursos sean validados.
        </p>
      )}

      <p className="mx-auto mt-7 max-w-7xl px-4 text-xs leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
        {site.allies.imageNotice}
      </p>
    </section>
  );
}
