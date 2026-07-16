"use client";

import { useState } from "react";
import type { SiteTimelineMilestone } from "../config/types";
import { cn } from "../lib/cn";

/**
 * Accessible two-point company history. Hover activates a milestone instantly
 * on pointer devices; touch, click and keyboard selection keep working and
 * stay pinned to the last chosen milestone.
 */
export function CompanyTimeline({
  milestones,
  siteName,
}: {
  readonly milestones: readonly SiteTimelineMilestone[];
  readonly siteName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentYear = new Date().getFullYear();
  const slug = siteName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const titleId = `company-timeline-${slug}`;
  const detailId = `${titleId}-detail`;
  const activeMilestone = milestones[activeIndex] ?? milestones[0];

  if (!activeMilestone) return null;

  return (
    <section
      aria-labelledby={titleId}
      className="relative overflow-hidden border-y border-border bg-muted/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id={titleId}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Nuestra Historia
        </h2>

        <div className="relative mt-10">
          <span
            className="absolute bottom-8 left-6 top-8 w-px bg-primary/20 md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:top-6 md:h-px md:w-auto"
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute origin-top bg-primary transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              "left-6 top-8 bottom-8 w-px md:inset-y-auto md:left-[12.5%] md:top-6 md:h-px md:w-auto md:origin-left md:right-[12.5%]"
            )}
            style={{
              transform:
                activeIndex === 0 ? "scaleY(0) scaleX(0)" : undefined,
            }}
            aria-hidden="true"
          />
          <div
            className="relative grid gap-4 md:grid-cols-2 md:gap-8"
            role="group"
            aria-label="Seleccionar hito histórico"
          >
            {milestones.map((milestone, index) => {
              const selected = activeIndex === index;
              const period = milestone.isCurrent
                ? String(currentYear)
                : milestone.period;
              const isoDate = milestone.isCurrent
                ? String(currentYear)
                : milestone.isoDate;
              const label = index === 0 ? "Fundación" : "Actualidad";

              return (
                <button
                  key={`${milestone.period}-${label}`}
                  type="button"
                  aria-pressed={selected}
                  aria-controls={detailId}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={cn(
                    "group relative flex min-h-24 items-center gap-5 rounded-2xl border px-5 py-4 text-left",
                    "transition-[background-color,border-color,color,transform,box-shadow] duration-300",
                    "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none",
                    selected
                      ? "border-primary bg-primary text-primary-foreground shadow-card"
                      : "border-border bg-background/90 text-foreground hover:border-primary/40"
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 shrink-0 rounded-full border-4 transition-all duration-300 motion-reduce:transform-none",
                      selected
                        ? "h-5 w-5 border-primary-foreground bg-primary scale-110"
                        : "h-4 w-4 border-primary bg-background group-hover:scale-110"
                    )}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] opacity-75">
                      {label}
                    </span>
                    <time
                      dateTime={isoDate}
                      className="mt-1 block text-2xl font-black tracking-tight"
                    >
                      {period}
                    </time>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={detailId}
            className="mt-6 border-l-2 border-primary px-6 py-3 transition-opacity duration-300 md:mx-auto md:max-w-4xl"
            aria-live="polite"
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
              {activeIndex === 0 ? "Fundación" : "Actualidad"}
            </p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {activeMilestone.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
