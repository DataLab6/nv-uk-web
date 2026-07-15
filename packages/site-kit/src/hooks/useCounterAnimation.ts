"use client";

import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";

export interface UseCounterAnimationOptions {
  readonly end: number;
  readonly duration?: number;
  readonly suffix?: string;
  readonly locale?: string;
}

/**
 * Counts from zero with GSAP once the referenced element intersects the
 * viewport. Reduced-motion users receive the final value immediately.
 */
export function useCounterAnimation<T extends HTMLElement>({
  end,
  duration = 2,
  suffix = "",
  locale = "es-CO",
}: UseCounterAnimationOptions): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const format = (value: number) =>
      `${Math.round(value).toLocaleString(locale)}${suffix}`;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tween: gsap.core.Tween | null = null;
    let observer: IntersectionObserver | null = null;
    let hasRun = false;

    const finish = () => {
      tween?.kill();
      tween = null;
      element.textContent = format(end);
    };

    const run = () => {
      if (hasRun) return;
      hasRun = true;

      if (reducedMotion.matches) {
        finish();
        return;
      }

      const counter = { value: 0 };
      tween = gsap.to(counter, {
        value: end,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = format(counter.value);
        },
        onComplete: finish,
      });
    };

    const syncMotionPreference = () => {
      if (reducedMotion.matches && hasRun) finish();
    };

    element.textContent = format(0);
    reducedMotion.addEventListener("change", syncMotionPreference);

    if (typeof IntersectionObserver === "undefined") {
      run();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          run();
        },
        { rootMargin: "0px 0px -12%", threshold: 0.2 }
      );
      observer.observe(element);
    }

    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      observer?.disconnect();
      tween?.kill();
    };
  }, [duration, end, locale, suffix]);

  return ref;
}
