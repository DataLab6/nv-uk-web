"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RevealAnimationType =
  "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "bounce";

export interface UseRevealAnimationOptions {
  type?: RevealAnimationType;
  delay?: number;
  duration?: number;
  triggerStart?: string;
  stagger?: number;
}

/**
 * Reveals an element, or its direct children, when it enters the viewport.
 * Animations are scoped to this hook and disabled when reduced motion is set.
 */
export function useRevealAnimation<T extends HTMLElement>(
  options: UseRevealAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    type = "fadeUp",
    delay = 0,
    duration = 1,
    triggerStart = "top 85%",
    stagger = 0,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = stagger > 0 ? Array.from(element.children) : [element];
    if (targets.length === 0) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const from: gsap.TweenVars = { opacity: 0 };
      const to: gsap.TweenVars = {
        opacity: 1,
        delay,
        duration,
        ease: type === "bounce" ? "back.out(1.7)" : "power3.out",
        stagger: stagger > 0 ? stagger : 0,
      };

      switch (type) {
        case "fadeLeft":
          from.x = -60;
          to.x = 0;
          break;
        case "fadeRight":
          from.x = 60;
          to.x = 0;
          break;
        case "scale":
          from.scale = 0.8;
          to.scale = 1;
          break;
        case "bounce":
          from.y = 80;
          from.scale = 0.95;
          to.y = 0;
          to.scale = 1;
          break;
        case "fadeUp":
        default:
          from.y = 60;
          to.y = 0;
          break;
      }

      gsap.fromTo(targets, from, {
        ...to,
        scrollTrigger: {
          trigger: element,
          start: triggerStart,
          toggleActions: "play none none none",
        },
      });
    });

    return () => media.revert();
  }, [delay, duration, stagger, triggerStart, type]);

  return ref;
}
