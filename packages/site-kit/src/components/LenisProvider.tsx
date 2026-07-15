"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis, { type LenisOptions } from "lenis";

gsap.registerPlugin(ScrollTrigger);

export interface LenisProviderProps {
  children: ReactNode;
  options?: LenisOptions;
}

/**
 * Synchronizes Lenis scrolling with GSAP while reduced motion is disabled.
 * Every listener and the exact GSAP ticker callback are removed on teardown.
 */
export function LenisProvider({ children, options }: LenisProviderProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;
    let unsubscribeFromScroll: (() => void) | null = null;
    let refreshFrame: number | null = null;

    const stop = () => {
      if (refreshFrame !== null) {
        window.cancelAnimationFrame(refreshFrame);
        refreshFrame = null;
      }
      if (ticker) {
        gsap.ticker.remove(ticker);
        ticker = null;
      }
      unsubscribeFromScroll?.();
      unsubscribeFromScroll = null;
      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      if (lenis || reducedMotion.matches) return;

      const instance = new Lenis({
        duration: 1.2,
        easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        touchMultiplier: 2,
        infinite: false,
        ...options,
        autoRaf: false,
      });

      lenis = instance;
      unsubscribeFromScroll = instance.on("scroll", () => {
        ScrollTrigger.update();
      });
      ticker = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = null;
        ScrollTrigger.refresh();
      });
    };

    const syncMotionPreference = () => {
      if (reducedMotion.matches) {
        stop();
      } else {
        start();
      }
    };

    reducedMotion.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
      stop();
    };
  }, [options]);

  return <>{children}</>;
}
