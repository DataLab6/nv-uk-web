"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface UseGlowTrackingOptions {
  intensity?: number;
  size?: number;
}

/**
 * Adds a pointer-following radial glow without triggering React renders.
 * The dynamic background is removed for users who prefer reduced motion.
 */
export function useGlowTracking<T extends HTMLElement>(
  options: UseGlowTrackingOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { intensity = 0.15, size = 600 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const safeIntensity = Math.min(1, Math.max(0, intensity));
    const safeSize = Math.max(0, size);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialBackgroundImage = element.style.backgroundImage;
    let frame: number | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let listening = false;

    const restoreBackground = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      element.style.backgroundImage = initialBackgroundImage;
    };

    const paintGlow = () => {
      frame = null;
      element.style.backgroundImage =
        `radial-gradient(${safeSize}px circle at ${pointerX}px ${pointerY}px, ` +
        `color-mix(in srgb, var(--primary) ${safeIntensity * 100}%, transparent), ` +
        "transparent 60%)";
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;

      if (frame === null) {
        frame = window.requestAnimationFrame(paintGlow);
      }
    };

    const attach = () => {
      if (listening) return;
      element.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      element.addEventListener("pointerleave", restoreBackground);
      element.addEventListener("pointercancel", restoreBackground);
      listening = true;
    };

    const detach = () => {
      if (!listening) return;
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", restoreBackground);
      element.removeEventListener("pointercancel", restoreBackground);
      listening = false;
    };

    const syncMotionPreference = () => {
      if (reducedMotion.matches) {
        detach();
        restoreBackground();
      } else {
        attach();
      }
    };

    reducedMotion.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      detach();
      restoreBackground();
    };
  }, [intensity, size]);

  return ref;
}
