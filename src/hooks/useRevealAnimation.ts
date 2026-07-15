"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "bounce";

interface UseRevealAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  triggerStart?: string;
  stagger?: number;
}

/**
 * Triggers GSAP entrance animations when an element enters the viewport.
 * Supports fadeUp, fadeLeft, fadeRight, scale, and bounce variants.
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
    const el = ref.current;
    if (!el) return;

    const children = stagger > 0 ? el.children : [el];
    if (children.length === 0) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: type === "bounce" ? "back.out(1.7)" : "power3.out",
      stagger: stagger > 0 ? stagger : 0,
    };

    switch (type) {
      case "fadeUp":
        fromVars.y = 60;
        toVars.y = 0;
        break;
      case "fadeLeft":
        fromVars.x = -60;
        toVars.x = 0;
        break;
      case "fadeRight":
        fromVars.x = 60;
        toVars.x = 0;
        break;
      case "scale":
        fromVars.scale = 0.8;
        toVars.scale = 1;
        break;
      case "bounce":
        fromVars.y = 80;
        fromVars.scale = 0.95;
        toVars.y = 0;
        toVars.scale = 1;
        break;
    }

    gsap.set(children, fromVars);

    const tween = gsap.to(children, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [type, delay, duration, triggerStart, stagger]);

  return ref;
}
