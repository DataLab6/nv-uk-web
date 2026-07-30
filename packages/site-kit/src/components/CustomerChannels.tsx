"use client";

import Image from "next/image";
import { CUSTOMER_CHANNEL_IMAGES } from "../config/channelAssets";
import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";

/**
 * Presents configured customer channels as a responsive editorial grid.
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
      className="relative overflow-hidden bg-surface py-12 sm:py-14 lg:py-16"
    >
      <div
        className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {site.channels.eyebrow}
          </span>
          <h2
            id="home-channels-title"
            className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            {site.channels.title}
          </h2>
        </div>

        <ul
          ref={gridRef}
          className="mt-8 grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-8"
        >
          {site.channels.items.map((channel, index) => {
            const image = CUSTOMER_CHANNEL_IMAGES[site.id][channel.icon];

            return (
              <li
                key={channel.title}
                className="group grid min-w-0 grid-cols-[minmax(0,1.55fr)_minmax(7rem,0.8fr)] items-center gap-4"
              >
                {image && (
                  <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={image}
                      alt={`${channel.title} para ${site.name}`}
                      fill
                      quality={92}
                      sizes="(min-width: 1280px) 270px, (min-width: 1024px) 19vw, (min-width: 640px) 29vw, 64vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </figure>
                )}
                <div className="min-w-0">
                  <span
                    className="block text-2xl font-black tracking-tight text-primary/30 transition-colors duration-200 group-hover:text-primary"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-base font-extrabold leading-tight text-foreground transition-transform duration-200 ease-out group-hover:-translate-y-[3px] sm:text-lg">
                    {channel.title}
                  </h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
