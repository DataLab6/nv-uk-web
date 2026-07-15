"use client";

import Image from "next/image";
import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";
import { SiteIcon } from "./SiteIcon";

/**
 * Technology and continuous-innovation home block backed by brand-owned image
 * and highlight configuration.
 */
export function Innovation({ site }: { site: SiteConfig }) {
  const copyRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeLeft",
    stagger: 0.08,
  });
  const imageRef = useRevealAnimation<HTMLDivElement>({ type: "fadeRight" });

  return (
    <section
      id="innovation"
      aria-labelledby="home-innovation-title"
      className="relative overflow-hidden bg-background py-20 sm:py-24"
    >
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-secondary/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div ref={copyRef}>
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

          <ul className="mt-8 grid gap-4">
            {site.innovation.items.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-2xl border border-primary/15 bg-card p-4 shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md shadow-primary/20">
                  <SiteIcon name={item.icon} className="h-5 w-5" />
                </span>
                <span>
                  <strong className="block text-card-foreground">
                    {item.title}
                  </strong>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={imageRef} className="relative">
          <div
            className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <figure
            className={cn(
              "relative aspect-[3/2] overflow-hidden rounded-3xl border border-primary/20 bg-surface shadow-2xl shadow-primary/15",
              site.innovation.image.treatment === "character" &&
                "bg-gradient-to-br from-primary/15 via-card to-secondary/20"
            )}
          >
            <Image
              src={site.innovation.image.src}
              alt={site.innovation.image.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 2rem), 45vw"
              className={cn(
                site.innovation.image.treatment === "character"
                  ? "object-contain p-6 sm:p-10"
                  : "object-cover"
              )}
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/55 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md">
              Tecnología e innovación continua al servicio de cada canal.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
