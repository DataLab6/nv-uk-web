"use client";

import Image from "next/image";
import type { SiteCultureTopic } from "../config/types";
import { useTiltCard } from "../hooks/useTiltCard";
import { SiteIcon } from "./SiteIcon";

/**
 * Culture-specific editorial card. It keeps imagery scoped to this route so
 * the shared feature cards used by PQRS and other pages remain unchanged.
 */
export function CultureTopicCard({ topic }: { topic: SiteCultureTopic }) {
  const cardRef = useTiltCard<HTMLElement>({ maxTilt: 3, scale: 1.01 });

  return (
    <article
      ref={cardRef}
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl"
    >
      <figure className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={topic.image.src}
          alt={topic.image.alt}
          fill
          quality={92}
          sizes="(min-width: 1280px) 384px, (min-width: 768px) 31vw, calc(100vw - 2rem)"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
          style={{ objectPosition: topic.image.objectPosition }}
        />
      </figure>

      <div className="relative p-6 sm:p-7">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <SiteIcon name={topic.icon} className="h-5 w-5" />
        </span>
        <h2 className="mt-5 text-xl font-bold tracking-tight text-card-foreground">
          {topic.title}
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {topic.description}
        </p>
      </div>
    </article>
  );
}
