"use client";

import Image from "next/image";
import type { SiteConfig, SiteStatGroup } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { SiteIcon } from "./SiteIcon";

/**
 * Every colour inside the corporate panel derives from white overlays on
 * `--brand-primary`, so the same component renders blue-tinted surfaces for
 * La Nieve and red-tinted surfaces for Unimarka without brand conditionals.
 */
function StatGroup({ group }: { group: SiteStatGroup }) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl bg-white/[0.07] p-5">
      <h3 className="flex items-start gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white xl:min-h-10">
        <span className="min-w-0 text-balance">{group.title}</span>
        <span
          className="mt-2 h-px min-w-4 flex-1 bg-white/25"
          aria-hidden="true"
        />
      </h3>

      <div className="mt-4 space-y-4">
        {group.figures.map((figure) => (
          <p
            key={`${figure.value}-${figure.label}`}
            className="min-w-0 overflow-hidden"
          >
            {figure.prefix && (
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
                {figure.prefix}
              </span>
            )}
            <span className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
              <span className="max-w-full whitespace-nowrap text-[clamp(1.5rem,2vw,2rem)] font-black tabular-nums tracking-[-0.04em] text-white">
                {figure.value}
              </span>
              {figure.unit && (
                <span className="max-w-full text-sm font-bold text-white/85">
                  {figure.unit}
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-sm leading-snug text-white/75">
              {figure.label}
            </span>
          </p>
        ))}
      </div>

      {group.notes && group.notes.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {group.notes.map((note) => (
            <li
              key={note}
              className="flex items-start gap-2 text-sm leading-snug text-white/75"
            >
              <span
                className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-white/60"
                aria-hidden="true"
              />
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Reserved slot for the future static national-coverage image. While no image
 * is configured (`site.stats.image === null`) it shows a deliberate
 * composition directly over the corporate background instead of an empty box;
 * swapping in the final artwork only requires setting `stats.image` in the
 * site configuration.
 */
function CoverageImageSlot({ site }: { site: SiteConfig }) {
  if (site.stats.image) {
    return (
      <Image
        src={site.stats.image.src}
        alt={site.stats.image.alt}
        fill
        sizes="(min-width: 1024px) 38vw, calc(100vw - 2rem)"
        className="object-contain"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-25 [background-image:linear-gradient(to_right,rgb(255_255_255/0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.35)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
        aria-hidden="true"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
        <SiteIcon name="map-pin" className="h-7 w-7" />
      </span>
      <p className="relative mt-5 text-lg font-bold text-white">
        Cobertura nacional
      </p>
      <p className="relative mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
        Colombia
      </p>
    </div>
  );
}

/**
 * Single editorial section combining the national-coverage visual and the
 * corporate operation figures inside one large brand-coloured panel: figures
 * on the left, map integrated directly over the corporate background on the
 * right, with a controlled vertical overflow on desktop.
 */
export function Stats({ site }: { site: SiteConfig }) {
  const figureRef = useRevealAnimation<HTMLDivElement>({ type: "fadeLeft" });
  const contentRef = useRevealAnimation<HTMLDivElement>({ type: "fadeUp" });
  const groupsRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeUp",
    stagger: 0.08,
    delay: 0.1,
  });

  return (
    <section
      id="cobertura"
      aria-labelledby="home-stats-title"
      className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-brand-primary bg-gradient-to-br from-brand-primary to-[color-mix(in_srgb,var(--brand-primary)_78%,black)] px-6 py-12 text-white shadow-card sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
            <div className="min-w-0">
              <div ref={contentRef}>
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
                  {site.stats.eyebrow}
                </span>
                <h2
                  id="home-stats-title"
                  className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  {site.stats.title}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
                  {site.stats.description}
                </p>
              </div>

              <div
                ref={groupsRef}
                className="mt-10 grid items-stretch gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
              >
                {site.stats.groups.map((group) => (
                  <StatGroup key={group.title} group={group} />
                ))}
              </div>
            </div>

            <div ref={figureRef} className="relative min-w-0">
              {/* En escritorio el mapa se posiciona de forma absoluta para
                  sobresalir de manera controlada por arriba y por abajo del
                  panel, apoyado directamente sobre el fondo corporativo. */}
              <figure className="relative mx-auto h-80 w-full max-w-md sm:h-96 lg:absolute lg:-bottom-10 lg:-top-16 lg:left-0 lg:-right-4 lg:mx-0 lg:h-auto lg:max-w-none">
                <CoverageImageSlot site={site} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
