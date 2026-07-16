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
            const image = CUSTOMER_CHANNEL_IMAGES[channel.icon];

            return (
              <li
                key={channel.title}
                className="group relative grid min-w-0 grid-cols-[7rem_1fr] gap-5 border-t border-primary/20 py-6 sm:grid-cols-1 sm:gap-0 sm:px-5 sm:py-8 lg:border-l lg:border-t-0 lg:px-7"
              >
                <span
                  className="absolute right-3 top-2 text-5xl font-black text-primary/10 sm:right-5 sm:top-4"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {image && (
                  <figure className="relative aspect-square w-28 overflow-hidden rounded-2xl sm:w-32">
                    <Image
                      src={image}
                      alt={`Ilustración conceptual de ${channel.title}`}
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none"
                    />
                  </figure>
                )}
                <div className="relative self-center sm:mt-6">
                  <h3 className="pr-8 text-xl font-extrabold text-foreground">
                    {channel.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {channel.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
