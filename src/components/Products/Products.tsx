"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTiltCard } from "@/hooks/useTiltCard";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import {
  Wheat,
  GlassWater,
  Sparkles,
  PawPrint,
  Building2,
} from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Wheat,
  GlassWater,
  Sparkles,
  PawPrint,
  Building2,
};

/**
 * Individual product category card with glassmorphism and 3D tilt effect.
 */
function CategoryCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  const tiltRef = useTiltCard<HTMLDivElement>({ maxTilt: 6 });
  const IconComponent = ICON_MAP[icon] || Wheat;

  return (
    <div
      ref={tiltRef}
      className="group relative p-6 sm:p-8 rounded-2xl glass hover:shadow-xl transition-all duration-300 cursor-default will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />

      <div className="relative z-10">
        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
          <IconComponent className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-semibold text-xl mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/**
 * Products section displaying category cards with glassmorphism and tilt effects.
 */
export function Products() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeUp",
    stagger: 0.1,
    delay: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-24 sm:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            Productos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Categorías que{" "}
            <span className="text-primary">distribuimos</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Cubrimos las principales categorías del consumo masivo colombiano
            con la mejor selección de productos.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
