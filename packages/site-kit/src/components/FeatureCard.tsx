"use client";

import type { SiteFeature } from "../config/types";
import { useTiltCard } from "../hooks/useTiltCard";
import { SiteIcon } from "./SiteIcon";

/**
 * Reusable feature card with the 3D interaction inherited from the base app.
 */
export function FeatureCard({ feature }: { feature: SiteFeature }) {
  const cardRef = useTiltCard<HTMLDivElement>({ maxTilt: 4, scale: 1.01 });

  return (
    <article
      ref={cardRef}
      className="group relative h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 transition-colors group-hover:from-primary/8 group-hover:to-transparent"
        aria-hidden="true"
      />
      <div className="relative">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <SiteIcon name={feature.icon} className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-xl font-bold tracking-tight text-card-foreground">
          {feature.title}
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </article>
  );
}
