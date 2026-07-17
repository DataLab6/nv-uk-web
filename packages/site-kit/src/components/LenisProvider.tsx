"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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
 * Because this provider lives in the root layout, it never unmounts between
 * route changes, so Next.js's own scroll-to-top does not reset Lenis's
 * internal position (or the visible scroll can end up matching wherever the
 * previous page happened to be, e.g. its footer). A pathname-driven effect
 * forces both the native scroll position and the Lenis instance back to the
 * top on every navigation.
 *
 * For the same reason, persistent chrome rendered by SiteChrome (notably the
 * Footer) never remounts between routes, so its reveal-on-scroll
 * ScrollTrigger keeps the trigger position measured on whichever page first
 * mounted it. On a page with a different height, that stale position can sit
 * past the new page's scrollable range, so the reveal never fires and the
 * footer appears not to render until a full reload remeasures everything.
 * Refreshing ScrollTrigger after every navigation keeps existing triggers
 * (Footer's included) correct for the newly rendered page.
 */
export function LenisProvider({ children, options }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const start = () => {
      if (lenisRef.current || reducedMotion.matches) return;

      const instance = new Lenis({
        duration: 1.2,
        easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        touchMultiplier: 2,
        infinite: false,
        ...options,
        autoRaf: false,
      });

      lenisRef.current = instance;
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

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Wait a frame so the new route's content has been laid out before
    // ScrollTrigger remeasures every trigger (including Footer's, which
    // otherwise keeps the previous page's stale position).
    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
