"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTiltCard } from "@/hooks/useTiltCard";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { Map, Truck, Handshake, Shield } from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Map,
  Truck,
  Handshake,
  Shield,
};

/**
 * Individual feature card with perspective tilt and glow effect.
 */
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  const tiltRef = useTiltCard<HTMLDivElement>({ maxTilt: 5 });
  const IconComponent = ICON_MAP[icon] || Shield;

  return (
    <div
      ref={tiltRef}
      className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all pointer-events-none" />

      <div className="relative z-10">
        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <IconComponent className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-semibold text-xl mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/**
 * WhyChooseUs section – 4 feature cards with SVG icons,
 * perspective tilt, and glow effects.
 */
export function WhyChooseUs() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    type: "bounce",
    stagger: 0.12,
    delay: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-24 sm:py-32 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Razones para{" "}
            <span className="text-primary">confiar en nosotros</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Nuestra experiencia, cobertura y compromiso nos convierten en el
            aliado ideal para la distribución de productos.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WHY_CHOOSE_US.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
