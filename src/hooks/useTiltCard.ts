"use client";

import { useEffect, useRef, type RefObject } from "react";

interface UseTiltCardOptions {
  maxTilt?: number;
  scale?: number;
  speed?: number;
}

/**
 * Adds a 3D tilt effect to a card element on mouse move.
 * Returns a ref to attach to the card element.
 */
export function useTiltCard<T extends HTMLElement>(
  options: UseTiltCardOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { maxTilt = 8, scale = 1.02, speed = 400 } = options;

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const handleMouseLeave = () => {
      card.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      setTimeout(() => {
        card.style.transition = "";
      }, speed);
    };

    const handleMouseEnter = () => {
      card.style.transition = "";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [maxTilt, scale, speed]);

  return ref;
}
