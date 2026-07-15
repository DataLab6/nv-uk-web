"use client";

import { ArrowRight } from "lucide-react";
import { useGlowTracking } from "@/hooks/useGlowTracking";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

/**
 * Call-to-Action section with glow tracking, backdrop blur,
 * and microinteraction buttons.
 */
export function CTA() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "scale" });
  const glowRef = useGlowTracking<HTMLDivElement>({
    intensity: 0.1,
    size: 800,
  });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={glowRef}
          className="relative overflow-hidden rounded-3xl glass p-12 sm:p-16 lg:p-20 text-center"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              ¿Listo para{" "}
              <span className="text-primary">distribuir</span>
              <br />
              en todo Colombia?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
              Contáctanos hoy y descubre cómo podemos ayudarte a llevar tus
              productos a millones de hogares colombianos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contacto@lanieve.co"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Solicitar información
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+576011234567"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm font-semibold text-base hover:bg-muted transition-all hover:-translate-y-0.5"
              >
                Llamar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
