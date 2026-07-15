"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { CLIENTS } from "@/lib/constants";

/**
 * Clients section displaying a grid of client placeholders
 * with staggered entrance animations.
 */
export function Clients() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeUp",
    stagger: 0.06,
    delay: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative py-24 sm:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            Clientes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Empresas que{" "}
            <span className="text-primary">trabajan con nosotros</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Las cadenas de distribución y retail más importantes de Colombia
            confían en nuestra red logística.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {CLIENTS.map((client) => (
            <div
              key={client}
              className="group flex items-center justify-center h-24 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-lg font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
