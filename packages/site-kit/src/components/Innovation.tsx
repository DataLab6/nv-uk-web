"use client";

import type { SiteConfig, SiteIconName } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";
import { SiteIcon } from "./SiteIcon";

/**
 * Small, brand-neutral corporate illustrations for the three technology
 * areas. They use currentColor so each brand's accent recolors them
 * automatically, avoiding stock imagery, embedded text or invented logos.
 */
function TechIllustration({
  icon,
  className,
}: {
  icon: SiteIconName;
  className?: string;
}) {
  if (icon === "target") {
    // Proyectos: hoja de ruta con hitos conectados.
    return (
      <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
        <circle
          cx="48"
          cy="48"
          r="44"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="2"
        />
        <path
          d="M20 66 L38 46 L54 58 L76 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="66" r="5" fill="currentColor" />
        <circle cx="38" cy="46" r="5" fill="currentColor" />
        <circle cx="54" cy="58" r="5" fill="currentColor" />
        <circle cx="76" cy="30" r="6" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "shield") {
    // Infraestructura y operaciones: plataforma protegida y continua.
    return (
      <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
        <circle
          cx="48"
          cy="48"
          r="44"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="2"
        />
        <rect
          x="26"
          y="40"
          width="44"
          height="10"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <rect
          x="26"
          y="54"
          width="44"
          height="10"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <circle cx="34" cy="45" r="1.8" fill="currentColor" />
        <circle cx="34" cy="59" r="1.8" fill="currentColor" />
        <path
          d="M48 40 V26 M40 30 L48 26 L56 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Soluciones y transformación digital: datos e integración inteligente.
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
      <circle
        cx="48"
        cy="48"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="2"
      />
      <circle
        cx="48"
        cy="48"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M48 33 V22 M48 74 V63 M63 48 H74 M22 48 H33"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="4.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Technology and continuous-innovation home block, presented as a horizontal,
 * editorial "album" of three connected areas rather than isolated white cards.
 */
export function Innovation({ site }: { site: SiteConfig }) {
  const introRef = useRevealAnimation<HTMLDivElement>({ type: "fadeUp" });
  const rowRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeUp",
    stagger: 0.1,
  });

  return (
    <section
      id="innovation"
      aria-labelledby="home-innovation-title"
      className="relative overflow-hidden bg-background py-20 sm:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-secondary/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={introRef} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-primary">
            <SiteIcon name="sparkles" className="h-4 w-4" />
            {site.innovation.eyebrow}
          </span>
          <h2
            id="home-innovation-title"
            className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {site.innovation.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {site.innovation.description}
          </p>
        </div>

        <div
          ref={rowRef}
          className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-0 lg:divide-x lg:divide-border"
        >
          {site.innovation.items.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "flex flex-col items-center px-2 text-center lg:px-8",
                index === 0 && "lg:pl-0",
                index === site.innovation.items.length - 1 && "lg:pr-0",
                index === site.innovation.items.length - 1 &&
                  site.innovation.items.length % 2 !== 0 &&
                  "sm:col-span-2 lg:col-span-1"
              )}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/8 text-primary sm:h-28 sm:w-28">
                <TechIllustration icon={item.icon} className="h-14 w-14 sm:h-16 sm:w-16" />
              </div>
              <span
                className="mt-6 block h-1 w-10 rounded-full bg-primary/60"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
