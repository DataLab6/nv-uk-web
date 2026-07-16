"use client";

import type { SiteConfig, SiteStat } from "../config/types";
import { useCounterAnimation } from "../hooks/useCounterAnimation";
import { useRevealAnimation } from "../hooks/useRevealAnimation";

function EditorialStat({ stat, index }: { stat: SiteStat; index: number }) {
  const counterRef = useCounterAnimation<HTMLSpanElement>({
    end: stat.value,
    suffix: stat.suffix,
    duration: 2.2,
  });

  return (
    <li className="relative flex min-w-0 flex-col items-center px-4 py-7 text-center sm:px-7 lg:border-r lg:border-border lg:last:border-r-0 lg:items-start lg:text-left">
      {index === 0 && (
        <span
          className="absolute left-0 top-0 h-1 w-16 bg-primary"
          aria-hidden="true"
        />
      )}
      <span
        ref={counterRef}
        aria-hidden="true"
        className="block text-5xl font-black tabular-nums tracking-[-0.06em] text-primary sm:text-6xl lg:text-7xl"
      >
        0{stat.suffix}
      </span>
      <span className="sr-only">
        Valor: {stat.value.toLocaleString("es-CO")}
        {stat.suffix}
      </span>
      <h3 className="mt-4 max-w-xs text-sm font-bold uppercase tracking-[0.12em] text-foreground sm:text-base">
        {stat.label}
      </h3>
      {stat.note && (
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
          {stat.note}
        </p>
      )}
    </li>
  );
}

/**
 * Compact editorial metrics strip without cards or supporting chrome.
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
      className="relative overflow-hidden border-y border-border bg-background py-8 sm:py-10"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="home-stats-title" className="sr-only">
          Indicadores de {site.name}
        </h2>

        <ul
          ref={listRef}
          className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4"
        >
          {site.stats.items.map((stat, index) => (
            <EditorialStat key={stat.label} stat={stat} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
