"use client";

import { useEffect, useRef, type RefObject } from "react";

interface UseGlowTrackingOptions {
  intensity?: number;
  size?: number;
}

/**
 * Creates a radial gradient glow that follows the mouse cursor within an element.
 * Returns a ref to attach to the container element.
 */
export function useGlowTracking<T extends HTMLElement>(
  options: UseGlowTrackingOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { intensity = 0.15, size = 600 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, hsl(var(--primary) / ${intensity}), transparent 60%)`;
    };

    const handleMouseLeave = () => {
      el.style.background = "transparent";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, size]);

  return ref;
}
