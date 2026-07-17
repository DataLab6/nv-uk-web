"use client";

import { Pin, PinOff } from "lucide-react";
import { useId, useState } from "react";
import type { SiteValue } from "../config/types";
import { cn } from "../lib/cn";
import { RevealGroup } from "./RevealGroup";

/** Shared width classes so the desktop/tablet card row centers its last, incomplete row. */
const CARD_WIDTH =
  "w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] xl:w-[calc(20%-1rem)]";

/**
 * Flip card with exactly two ways to show its back: a temporary hover (pure
 * CSS, no JS state) and a click/tap/Enter that pins it open regardless of
 * hover. The single source of truth for "is this card pinned" lives in the
 * parent (`pinnedIndex`); this component holds no state of its own. Visually,
 * "flipped" is simply "hovered OR pinned" — the `.is-pinned` class only ever
 * adds the pinned half of that rule.
 */
function ValueCard({
  value,
  isPinned,
  onTogglePin,
}: {
  value: SiteValue;
  isPinned: boolean;
  onTogglePin: () => void;
}) {
  const descriptionId = useId();

  return (
    <article
      className={cn(
        "value-card min-w-0 [perspective:1200px]",
        isPinned && "is-pinned",
        CARD_WIDTH
      )}
    >
      <div className="value-card-inner relative grid aspect-[4/5] w-full [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]">
        {/* Front: always in the tab order except while pinned, so keyboard
            focus naturally lands on the front unless the back is pinned open. */}
        <button
          type="button"
          onClick={onTogglePin}
          aria-expanded={isPinned}
          aria-describedby={descriptionId}
          aria-label={`${value.title}. ${isPinned ? "Toca o haz clic para volver al frente." : "Pasa el cursor, toca o presiona Enter para ver la descripción."}`}
          tabIndex={isPinned ? -1 : 0}
          aria-hidden={isPinned}
          className="col-start-1 row-start-1 flex min-h-full flex-col justify-between overflow-hidden rounded-xl border border-primary bg-primary p-4 text-left text-primary-foreground shadow-sm [-webkit-backface-visibility:hidden] [backface-visibility:hidden] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span id={descriptionId} className="sr-only">
            {value.title}. {value.description}
          </span>
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
        </button>

        {/* Back: only hit-testable while actually shown (hover or pinned),
            thanks to backface-visibility. Clicking its header toggles the
            pin — the same action as the front button — because the front is
            not hit-testable while the back is visible. The description itself
            stops propagation so scrolling, dragging its scrollbar or
            selecting text never toggles the pin. */}
        <div
          onClick={onTogglePin}
          aria-hidden={!isPinned}
          className="col-start-1 row-start-1 flex min-h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-primary bg-card shadow-card [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border p-4">
            <span className="text-base font-bold tracking-tight text-card-foreground">
              {value.title}
            </span>
            {isPinned ? (
              <Pin
                className="h-4 w-4 shrink-0 fill-primary text-primary"
                aria-hidden="true"
              />
            ) : (
              <PinOff
                className="h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </div>
          <div
            tabIndex={isPinned ? 0 : -1}
            data-lenis-prevent
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            className="value-card-scroll min-h-0 flex-1 cursor-auto overflow-y-auto overscroll-contain p-4 pt-3 text-sm leading-relaxed text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {value.description}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Shared, accessible presentation of corporate values and pillars. */
export function ValuesSection({ values }: { values: readonly SiteValue[] }) {
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

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

        <RevealGroup
          className="flex flex-wrap justify-center gap-4 lg:gap-5"
          stagger={0.06}
        >
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              value={value}
              isPinned={pinnedIndex === index}
              onTogglePin={() =>
                setPinnedIndex((current) => (current === index ? null : index))
              }
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
