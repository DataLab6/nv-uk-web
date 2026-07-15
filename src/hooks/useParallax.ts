"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseParallaxOptions {
  speed?: number;
  direction?: "y" | "x";
  triggerStart?: string;
  triggerEnd?: string;
}

/**
 * Creates a parallax effect on an element synced with scroll position.
 * Returns a ref to attach to the element.
 */
export function useParallax<T extends HTMLElement>(
  options: UseParallaxOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    speed = 0.3,
    direction = "y",
    triggerStart = "top bottom",
    triggerEnd = "bottom top",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      [direction]: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        end: triggerEnd,
        scrub: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed, direction, triggerStart, triggerEnd]);

  return ref;
}
