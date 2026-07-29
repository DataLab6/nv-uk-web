"use client";

import Image from "next/image";
import type { SiteConfig, SiteIconName } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";
import { SiteIcon } from "./SiteIcon";

const INNOVATION_IMAGES: Record<
  SiteConfig["id"],
  Partial<Record<SiteIconName, string>>
> = {
  "la-nieve": {
    target: "/images/technology/proyectos.png",
    shield: "/images/technology/infraestructura-operaciones.png",
    sparkles: "/images/technology/soluciones-transformacion-digital.png",
  },
  unimarka: {
    target: "/images/technology/proyectos.png",
    shield: "/images/technology/infraestructura-operaciones.png",
    sparkles: "/images/technology/soluciones-transformacion-digital.png",
  },
};

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
          {site.innovation.items.map((item, index) => {
            const image = INNOVATION_IMAGES[site.id][item.icon];

            return (
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
                {image && (
                  <figure className="relative aspect-[4/3] w-full max-w-[20rem] overflow-hidden rounded-2xl bg-primary/8">
                    <Image
                      src={image}
                      alt={`${item.title} en ${site.name}`}
                      fill
                      sizes="(min-width: 1024px) 27vw, (min-width: 640px) 42vw, 88vw"
                      className="object-cover"
                    />
                  </figure>
                )}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
