"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { STATS } from "@/lib/constants";

/**
 * Individual stat card with animated counter and glassmorphism.
 */
function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, display } = useCounterAnimation<HTMLDivElement>({
    end: value,
    suffix,
    duration: 2.5,
  });

  return (
    <div
      ref={ref}
      className="group relative p-8 rounded-2xl glass hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1"
    >
      <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
      <div className="relative z-10">
        <p className="text-4xl sm:text-5xl font-bold text-primary mb-2 tabular-nums">
          {display}
        </p>
        <p className="text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
}

/**
 * Stats section with animated counters, glassmorphism cards,
 * and backdrop blur.
 */
export function Stats() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    type: "scale",
    stagger: 0.1,
    delay: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-24 sm:py-32 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            Números que hablan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Resultados que{" "}
            <span className="text-primary">respaldan nuestro trabajo</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
