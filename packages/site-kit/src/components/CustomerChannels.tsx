"use client";

import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";
import { SiteIcon } from "./SiteIcon";

/**
 * Presents configured customer channels as a responsive, brand-colour-led
 * card grid without deriving unverified client totals.
 */
export function CustomerChannels({ site }: { site: SiteConfig }) {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const gridRef = useRevealAnimation<HTMLUListElement>({
    type: "fadeUp",
    stagger: 0.08,
  });

  return (
    <section
      ref={sectionRef}
      id="canales"
      aria-labelledby="home-channels-title"
      className="relative overflow-hidden bg-surface py-20 sm:py-24"
    >
      <div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {site.channels.eyebrow}
          </span>
          <h2
            id="home-channels-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            {site.channels.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {site.channels.description}
          </p>
        </div>

        <ul
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {site.channels.items.map((channel, index) => {
            const isPrimary = index === 0;
            const isSecondary = index === site.channels.items.length - 1;

            return (
              <li
                key={channel.title}
                className={cn(
                  "group relative min-h-60 overflow-hidden rounded-3xl border p-7 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl",
                  isPrimary &&
                    "border-primary bg-primary text-primary-foreground",
                  isSecondary &&
                    !isPrimary &&
                    "border-secondary bg-secondary text-secondary-foreground",
                  !isPrimary &&
                    !isSecondary &&
                    "border-primary/15 bg-card text-card-foreground"
                )}
              >
                <span
                  className={cn(
                    "absolute right-5 top-3 text-6xl font-black opacity-10",
                    !isPrimary && !isSecondary && "text-primary"
                  )}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                    isPrimary && "bg-primary-foreground text-primary",
                    isSecondary &&
                      !isPrimary &&
                      "bg-secondary-foreground text-secondary",
                    !isPrimary && !isSecondary && "bg-primary/10 text-primary"
                  )}
                >
                  <SiteIcon name={channel.icon} className="h-6 w-6" />
                </span>
                <h3
                  className={cn(
                    "relative mt-8 text-xl font-extrabold",
                    isPrimary && "text-primary-foreground",
                    isSecondary && !isPrimary && "text-secondary-foreground"
                  )}
                >
                  {channel.title}
                </h3>
                <p
                  className={cn(
                    "relative mt-3 text-sm leading-relaxed",
                    isPrimary && "text-primary-foreground/80",
                    isSecondary && !isPrimary && "text-secondary-foreground/80",
                    !isPrimary && !isSecondary && "text-muted-foreground"
                  )}
                >
                  {channel.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
