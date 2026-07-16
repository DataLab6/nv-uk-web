"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import type { SiteValue } from "../config/types";
import { cn } from "../lib/cn";
import { RevealGroup } from "./RevealGroup";

/** Shared width classes so the desktop/tablet card row centers its last, incomplete row. */
const CARD_WIDTH =
  "w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] xl:w-[calc(20%-1rem)]";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function StaticValueCard({ value }: { value: SiteValue }) {
  return (
    <article
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border border-border bg-card",
        CARD_WIDTH
      )}
    >
      <div className="bg-primary px-4 py-3.5">
        <h3 className="text-lg font-bold tracking-tight text-primary-foreground">
          {value.title}
        </h3>
      </div>
      <Image
        src={value.image.src}
        alt={value.image.alt}
        width={value.image.width}
        height={value.image.height}
        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {value.description}
        </p>
      </div>
    </article>
  );
}

function ValueFlipCard({ value }: { value: SiteValue }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const descriptionId = useId();

  return (
    <article className={cn("min-w-0 [perspective:1200px]", CARD_WIDTH)}>
      <button
        type="button"
        aria-expanded={isFlipped}
        aria-describedby={descriptionId}
        aria-label={`${isFlipped ? "Volver al frente de" : "Mostrar imagen y descripción de"} ${value.title}`}
        onClick={() => setIsFlipped((current) => !current)}
        className="value-card-trigger block aspect-[4/5] w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <span id={descriptionId} className="sr-only">
          {value.title}. {value.description}
        </span>

        <span
          className={cn(
            "value-card-inner relative grid h-full [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
            isFlipped && "[transform:rotateY(180deg)]"
          )}
          aria-hidden="true"
        >
          <span className="col-start-1 row-start-1 flex min-h-full flex-col justify-between overflow-hidden rounded-xl border border-primary bg-primary p-4 text-primary-foreground shadow-sm [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
            <span>
              <span
                className="block h-1 w-8 rounded-full bg-primary-foreground/75"
                aria-hidden="true"
              />
              <span className="mt-5 block text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl">
                {value.title}
              </span>
            </span>
            <span className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground/80">
              Conocer este valor
            </span>
          </span>

          <span className="col-start-1 row-start-1 flex min-h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="relative block overflow-hidden bg-muted">
              <Image
                src={value.image.src}
                alt=""
                width={value.image.width}
                height={value.image.height}
                sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </span>
            <span className="flex flex-1 flex-col p-4">
              <span className="block text-base font-bold tracking-tight text-card-foreground">
                {value.title}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </span>
            </span>
          </span>
        </span>
      </button>
    </article>
  );
}

/** Lightweight, touch-first accordion used on mobile instead of large flip cards. */
function ValuesAccordion({ values }: { values: readonly SiteValue[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
      {values.map((value, index) => {
        const isOpen = openIndex === index;
        const panelId = `value-panel-${index}`;
        const buttonId = `value-trigger-${index}`;

        return (
          <li key={value.title} className="bg-card">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full transition-colors",
                      isOpen ? "bg-primary" : "bg-border"
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-bold text-card-foreground">
                    {value.title}
                  </span>
                </span>
                <span
                  className={cn(
                    "shrink-0 text-primary transition-transform duration-300",
                    isOpen && "rotate-45"
                  )}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-4"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Shared, accessible presentation of corporate values and pillars. */
export function ValuesSection({ values }: { values: readonly SiteValue[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="valores"
      aria-labelledby="corporate-values-title"
      className="scroll-mt-24 border-y border-border bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Lo que nos orienta
          </span>
          <h2
            id="corporate-values-title"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Nuestros valores y pilares corporativos
          </h2>
        </div>

        {/* Mobile: lightweight accordion, five values visible without large cards. */}
        <div className="sm:hidden">
          <ValuesAccordion values={values} />
        </div>

        {/* Tablet and up: flip cards in a self-wrapping, centered row. */}
        <RevealGroup
          className="hidden flex-wrap justify-center gap-4 sm:flex lg:gap-5"
          stagger={prefersReducedMotion ? 0 : 0.06}
        >
          {values.map((value) =>
            prefersReducedMotion ? (
              <StaticValueCard key={value.title} value={value} />
            ) : (
              <ValueFlipCard key={value.title} value={value} />
            )
          )}
        </RevealGroup>
      </div>
    </section>
  );
}
