"use client";

import { useEffect, useState } from "react";

/**
 * Returns document scroll progress as a clamped value between zero and one.
 * Updates are throttled to the browser animation frame and fully cleaned up.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    const scheduleUpdate = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleUpdate);
    resizeObserver?.observe(document.documentElement);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return progress;
}
