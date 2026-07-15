"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import type { SiteAlly, SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { SiteIcon } from "./SiteIcon";

function getInitials(name: string) {
  return name
    .split(/[\s–—-]+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toLocaleUpperCase("es-CO"))
    .join("");
}

function AllySlot({ ally }: { ally: SiteAlly }) {
  return (
    <li className="w-64 shrink-0">
      <article className="flex h-28 items-center gap-4 rounded-2xl border border-primary/15 bg-card px-5 shadow-sm">
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-black tracking-wide text-primary-foreground shadow-md shadow-primary/15">
          <SiteIcon name="building" className="absolute h-9 w-9 opacity-15" />
          <span className="relative">{getInitials(ally.name)}</span>
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold leading-snug text-card-foreground">
            {ally.name}
          </span>
          <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            Logo pendiente
          </span>
        </span>
      </article>
    </li>
  );
}

/**
 * Accessible partner marquee with explicit pause control and branded logo
 * placeholders ready to be replaced by approved image assets.
 */
export function Brands({ site }: { site: SiteConfig }) {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const [isPaused, setIsPaused] = useState(false);

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

      <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
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

        {site.allies.items.length > 1 && (
          <button
            type="button"
            aria-controls="home-allies-track"
            aria-pressed={isPaused}
            onClick={() => setIsPaused((current) => !current)}
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground motion-reduce:hidden"
          >
            {isPaused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
            {isPaused ? "Reanudar aliados" : "Pausar aliados"}
          </button>
        )}
      </div>

      {site.allies.items.length > 0 ? (
        <div
          className="relative"
          role="region"
          aria-label={`Aliados comerciales de ${site.name}`}
        >
          <ul className="sr-only">
            {site.allies.items.map((ally) => (
              <li key={ally.name}>{ally.name}</li>
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
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex items-stretch gap-5 pr-5">
                  {site.allies.items.map((ally) => (
                    <AllySlot key={`${copy}-${ally.name}`} ally={ally} />
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
