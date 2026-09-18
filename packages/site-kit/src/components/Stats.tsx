"use client";

import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { WarehouseMap } from "./WarehouseMap";

export function Stats({ site }: { site: SiteConfig }) {
  const figureRef = useRevealAnimation<HTMLDivElement>({ type: "fadeLeft" });
  const contentRef = useRevealAnimation<HTMLDivElement>({ type: "fadeUp" });

  const coverage = site.stats.groups
    .flatMap((group) => group.figures)
    .find((figure) => figure.value.endsWith("%"));
  const departments = site.stats.groups
    .flatMap((group) => group.figures)
    .find((figure) => figure.unit === "departamentos");

  return (
    <section
      id="cobertura"
      aria-labelledby="home-stats-title"
      className="scroll-mt-24 border-y border-border bg-surface py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-brand-primary bg-gradient-to-br from-brand-primary to-[color-mix(in_srgb,var(--brand-primary)_78%,black)] px-6 py-10 text-white shadow-card sm:px-10 lg:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div ref={contentRef} className="min-w-0 max-w-lg">
              {site.id === "la-nieve" && (
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Nuestra cobertura
                </span>
              )}
              <h2
                id="home-stats-title"
                className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2rem]"
              >
                {site.id === "unimarka"
                  ? "Cobertura nacional"
                  : "Presencia en Colombia"}
              </h2>
              <dl className="mt-8 grid grid-cols-2 gap-x-5 border-t border-white/20 pt-7 sm:mt-10 sm:gap-x-8 sm:pt-8">
                {departments && (
                  <div className="flex min-w-0 flex-col">
                    <dt className="order-2 mt-3 max-w-[10rem] text-sm leading-relaxed text-white/75">
                      Departamentos de Colombia con presencia
                    </dt>
                    <dd className="order-1 whitespace-nowrap text-[2.25rem] font-bold leading-none tracking-tight text-white tabular-nums sm:text-[3rem]">
                      {departments.value}
                    </dd>
                  </div>
                )}
                {coverage && (
                  <div className="flex min-w-0 flex-col">
                    <dt className="order-2 mt-3 max-w-[10rem] text-sm leading-relaxed text-white/75">
                      De los departamentos de Colombia
                    </dt>
                    <dd className="order-1 whitespace-nowrap text-[2.25rem] font-bold leading-none tracking-tight text-white tabular-nums sm:text-[3rem]">
                      {coverage.value.replace(".", ",")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <div ref={figureRef} className="relative min-w-0">
              <WarehouseMap site={site.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
