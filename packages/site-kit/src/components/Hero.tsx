"use client";

import Image from "next/image";
import type { SiteConfig } from "../config/types";
import { useGlowTracking } from "../hooks/useGlowTracking";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";
import { SiteIcon } from "./SiteIcon";

/**
 * Primary home hero. It preserves the supplied Together composition while
 * giving the block a semantic, reusable name for both corporate sites.
 */
export function Hero({ site }: { site: SiteConfig }) {
  const textRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeRight",
    stagger: 0.1,
    triggerStart: "top 92%",
  });
  const imageRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeLeft",
    triggerStart: "top 92%",
  });
  const glowRef = useGlowTracking<HTMLDivElement>({
    intensity: 0.1,
    size: 700,
  });

  return (
    <section
      id="hero"
      aria-labelledby="home-hero-title"
      className="relative min-h-[100svh] overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28"
    >
      <div className="mesh-gradient absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-36 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
      </div>
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-11rem)] max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <div ref={imageRef} className="relative order-2 lg:order-1">
          <div
            className={cn(
              "relative aspect-square overflow-hidden rounded-3xl border border-primary/20 shadow-2xl shadow-primary/15",
              site.home.image.treatment === "character" &&
                "bg-gradient-to-br from-primary/15 via-background to-secondary/20"
            )}
          >
            <Image
              src={site.home.image.src}
              alt={site.home.image.alt}
              fill
              priority
              sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
              className={cn(
                site.home.image.treatment === "character"
                  ? "object-contain p-8 sm:p-12"
                  : "object-cover"
              )}
            />
          </div>
        </div>

        <div ref={textRef} className="order-1 lg:order-2">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {site.home.eyebrow}
          </span>
          <h1
            id="home-hero-title"
            className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {site.home.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {site.home.description}
          </p>

          <ul className="mt-8 flex flex-col gap-6">
            {site.home.points.map((point) => (
              <li key={point.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                  <SiteIcon name={point.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {point.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
