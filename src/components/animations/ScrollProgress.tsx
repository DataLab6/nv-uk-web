"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * A vertical progress line fixed to the right side of the viewport.
 * Fills proportionally as the user scrolls through the page.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura de la página"
    >
      <div className="relative h-32 w-1 rounded-full bg-border overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full rounded-full bg-primary transition-none"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
