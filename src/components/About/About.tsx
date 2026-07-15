"use client";

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { Target, Users, TrendingUp } from "lucide-react";

/**
 * About / Quiénes Somos section.
 * Features a sticky left column while the right column scrolls.
 */
export function About() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const cardsRef = useRevealAnimation<HTMLDivElement>({
    type: "fadeUp",
    stagger: 0.15,
    delay: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left – Sticky */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase">
              Quiénes Somos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Distribución con
              <br />
              <span className="text-primary">visión de futuro</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Somos una empresa colombiana líder en la distribución de productos
              de consumo masivo. Con más de dos décadas de experiencia,
              hemos construido una red logística que conecta las mejores marcas
              con hogares en todo el territorio nacional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nuestra misión es garantizar que cada producto llegue a su destino
              de manera eficiente, segura y oportuna, generando valor para
              nuestros aliados comerciales y los consumidores finales.
            </p>
          </div>

          {/* Right – Scrollable cards */}
          <div ref={cardsRef} className="space-y-6">
            {[
              {
                icon: Target,
                title: "Misión Clara",
                desc: "Conectar marcas líderes con los hogares colombianos a través de una red de distribución eficiente y confiable.",
              },
              {
                icon: Users,
                title: "Equipo Comprometido",
                desc: "Profesionales altamente capacitados que garantizan la excelencia en cada eslabón de la cadena de suministro.",
              },
              {
                icon: TrendingUp,
                title: "Crecimiento Sostenible",
                desc: "Innovamos constantemente para expandir nuestra cobertura y mejorar la experiencia de nuestros clientes.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
