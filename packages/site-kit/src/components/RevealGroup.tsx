"use client";

import type { ReactNode } from "react";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";

/**
 * Adds a scoped entrance animation to direct children without clientifying pages.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRevealAnimation<HTMLDivElement>({
    type: "fadeUp",
    stagger,
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
