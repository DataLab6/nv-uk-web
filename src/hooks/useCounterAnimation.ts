"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseCounterAnimationOptions {
  end: number;
  duration?: number;
  suffix?: string;
  triggerStart?: string;
}

/**
 * Animates a number from 0 to `end` when the element enters the viewport.
 * Uses GSAP ScrollTrigger for scroll-synced triggering.
 */
export function useCounterAnimation<T extends HTMLElement>(
  options: UseCounterAnimationOptions
): { ref: RefObject<T | null>; display: string } {
  const ref = useRef<T | null>(null);
  const [display, setDisplay] = useState("0");
  const { end, duration = 2, suffix = "", triggerStart = "top 80%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setDisplay(Math.round(counter.value).toLocaleString("es-CO") + suffix);
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [end, duration, suffix, triggerStart]);

  return { ref, display };
}
