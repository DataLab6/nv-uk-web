"use client";

import type { CSSProperties } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { cn } from "../lib/cn";

export interface ScrollProgressProps {
  ariaLabel?: string;
  className?: string;
  indicatorClassName?: string;
  trackClassName?: string;
}

/**
 * Displays an accessible vertical indicator for document scroll progress.
 */
export function ScrollProgress({
  ariaLabel = "Progreso de lectura de la página",
  className,
  indicatorClassName,
  trackClassName,
}: ScrollProgressProps) {
  const progress = useScrollProgress();
  const percentage = Math.round(progress * 100);
  const progressStyle: CSSProperties = {
    transform: `scaleY(${progress})`,
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed right-4 top-1/2 z-50 hidden",
        "-translate-y-1/2 lg:block",
        className
      )}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          "relative h-32 w-1 overflow-hidden rounded-full bg-border",
          trackClassName
        )}
      >
        <div
          className={cn(
            "absolute inset-0 origin-bottom rounded-full bg-primary",
            indicatorClassName
          )}
          style={progressStyle}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
