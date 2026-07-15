"use client";

import Image from "next/image";
import type { SiteConfig, SiteStat } from "../config/types";
import { useCounterAnimation } from "../hooks/useCounterAnimation";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { SiteIcon } from "./SiteIcon";

function StatCard({ stat }: { stat: SiteStat }) {
  const counterRef = useCounterAnimation<HTMLSpanElement>({
    end: stat.value,
    suffix: stat.suffix,
    duration: 2.2,
  });

  return (
    <li className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-card p-6 text-center shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl sm:p-8">
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary"
        aria-hidden="true"
      />
      <span
        ref={counterRef}
        aria-hidden="true"
        className="block text-4xl font-black tabular-nums tracking-tight text-primary sm:text-5xl"
      >
        0{stat.suffix}
      </span>
      <span className="sr-only">
        Valor de ejemplo: {stat.value.toLocaleString("es-CO")}
        {stat.suffix}
      </span>
      <h3 className="mt-3 text-base font-bold text-card-foreground">
        {stat.label}
      </h3>
      {stat.note && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {stat.note}
        </p>
      )}
    </li>
  );
}

/**
 * Home metrics section. Values are animated as presentation examples and are
 * paired with an unavoidable validation disclaimer.
 */
export function Stats({ site }: { site: SiteConfig }) {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const listRef = useRevealAnimation<HTMLUListElement>({
    type: "scale",
    stagger: 0.08,
    delay: 0.15,
  });

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-labelledby="home-stats-title"
      className="relative overflow-hidden bg-background py-20 sm:py-24"
    >
      <div
        className="absolute -right-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {site.stats.eyebrow}
          </span>
          <h2
            id="home-stats-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            {site.stats.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {site.stats.description}
          </p>
        </div>

        <figure className="relative mt-10 aspect-[16/7] min-h-72 overflow-hidden rounded-3xl border border-primary/20 bg-muted shadow-2xl shadow-primary/10">
          <Image
            src={site.stats.image.src}
            alt={site.stats.image.alt}
            fill
            sizes="(max-width: 1279px) calc(100vw - 2rem), 1216px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-5 left-5 max-w-sm rounded-2xl border border-white/20 bg-black/55 px-4 py-3 text-sm leading-relaxed text-white backdrop-blur-md sm:bottom-7 sm:left-7">
            Imagen conceptual de apoyo. Las cifras continúan siendo ejemplos
            pendientes de validación corporativa.
          </figcaption>
        </figure>

        <ul
          ref={listRef}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.stats.items.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </ul>

        <aside
          aria-label="Advertencia sobre las cifras"
          className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-secondary/30 bg-secondary/10 p-4 text-sm leading-relaxed text-foreground"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <SiteIcon name="lightbulb" className="h-4 w-4" />
          </span>
          <p>
            <strong>Datos de ejemplo.</strong> {site.stats.disclaimer}
          </p>
        </aside>
      </div>
    </section>
  );
}
