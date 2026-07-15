"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface UseTiltCardOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
}

/**
 * Applies a requestAnimationFrame-throttled perspective tilt to a card.
 * Pointer handlers and temporary styles are removed on cleanup or when the
 * user enables reduced motion.
 */
export function useTiltCard<T extends HTMLElement>(
  options: UseTiltCardOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { maxTilt = 8, scale = 1.02, speed = 400 } = options;

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const safeTilt = Math.max(0, maxTilt);
    const safeScale = Math.max(0.01, scale);
    const safeSpeed = Math.max(0, speed);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialTransform = card.style.transform;
    const initialTransition = card.style.transition;
    const initialWillChange = card.style.willChange;
    let frame: number | null = null;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let listening = false;

    const clearScheduledWork = () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
      if (resetTimer !== null) {
        clearTimeout(resetTimer);
        resetTimer = null;
      }
    };

    const restoreInitialStyles = () => {
      clearScheduledWork();
      card.style.transform = initialTransform;
      card.style.transition = initialTransition;
      card.style.willChange = initialWillChange;
    };

    const paintTilt = () => {
      frame = null;
      const bounds = card.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;

      const rotateX = ((pointerY - bounds.top) / bounds.height - 0.5) * -2;
      const rotateY = ((pointerX - bounds.left) / bounds.width - 0.5) * 2;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX * safeTilt}deg) ` +
        `rotateY(${rotateY * safeTilt}deg) scale3d(${safeScale}, ` +
        `${safeScale}, ${safeScale})`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      card.style.willChange = "transform";

      if (frame === null) {
        frame = window.requestAnimationFrame(paintTilt);
      }
    };

    const handlePointerEnter = () => {
      if (resetTimer !== null) {
        clearTimeout(resetTimer);
        resetTimer = null;
      }
      card.style.transform = initialTransform;
      card.style.transition = initialTransition;
      card.style.willChange = "transform";
    };

    const handlePointerLeave = () => {
      clearScheduledWork();
      card.style.transition = `transform ${safeSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) " + "scale3d(1, 1, 1)";

      resetTimer = setTimeout(() => {
        card.style.transform = initialTransform;
        card.style.transition = initialTransition;
        card.style.willChange = initialWillChange;
        resetTimer = null;
      }, safeSpeed);
    };

    const attach = () => {
      if (listening) return;
      card.addEventListener("pointerenter", handlePointerEnter);
      card.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      card.addEventListener("pointerleave", handlePointerLeave);
      card.addEventListener("pointercancel", handlePointerLeave);
      listening = true;
    };

    const detach = () => {
      if (!listening) return;
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      card.removeEventListener("pointercancel", handlePointerLeave);
      listening = false;
    };

    const syncMotionPreference = () => {
      if (reducedMotion.matches) {
        detach();
        restoreInitialStyles();
      } else {
        attach();
      }
    };

    reducedMotion.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      detach();
      restoreInitialStyles();
    };
  }, [maxTilt, scale, speed]);

  return ref;
}
