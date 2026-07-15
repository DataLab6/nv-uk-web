"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { BRANDS } from "@/lib/constants";

/**
 * Brands section with infinite CSS marquee.
 * Logos are duplicated for seamless looping.
 * Pauses on hover via CSS.
 */
export function Brands() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative py-20 sm:py-28 bg-muted/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
          Nuestras Marcas
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Marcas que{" "}
          <span className="text-primary">confían en nosotros</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Representamos las marcas más importantes del consumo masivo colombiano
          e internacional.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative" aria-label="Carrusel de marcas aliadas">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex items-center justify-center h-16 px-8 rounded-xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
