"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import {
  DEPARTMENTS_WITH_PRESENCE,
  COVERAGE_CITIES,
} from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Coverage section with interactive SVG Colombia map.
 * Departments with presence light up progressively on scroll.
 * Shows tooltip with cities on hover.
 */
export function Coverage() {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    const paths = container.querySelectorAll<SVGPathElement>(
      "[data-department]"
    );

    // Set initial state: all gray
    paths.forEach((path) => {
      const dept = path.dataset.department;
      const hasPresence = DEPARTMENTS_WITH_PRESENCE.includes(
        dept as (typeof DEPARTMENTS_WITH_PRESENCE)[number]
      );
      gsap.set(path, {
        fill: hasPresence ? "hsl(217 91% 55% / 0.1)" : "hsl(220 13% 91%)",
        stroke: "hsl(220 13% 85%)",
        strokeWidth: 0.5,
      });
    });

    // Animate departments with presence on scroll
    const presencePaths = Array.from(paths).filter((path) =>
      DEPARTMENTS_WITH_PRESENCE.includes(
        path.dataset.department as (typeof DEPARTMENTS_WITH_PRESENCE)[number]
      )
    );

    if (presencePaths.length > 0) {
      gsap.to(presencePaths, {
        fill: "hsl(217 91% 55% / 0.35)",
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent, dept: string) => {
    const rect = (e.currentTarget as SVGPathElement).closest("svg")?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 10,
      });
    }
    setHoveredDept(dept);
  };

  return (
    <section
      ref={sectionRef}
      id="coverage"
      className="relative py-24 sm:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            Cobertura Nacional
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Presencia en{" "}
            <span className="text-primary">
              {DEPARTMENTS_WITH_PRESENCE.length} departamentos
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Nuestra red de distribución cubre los principales departamentos de
            Colombia, garantizando alcance total.
          </p>
        </div>

        <div ref={mapRef} className="relative max-w-3xl mx-auto">
          {/* Tooltip */}
          {hoveredDept && (
            <div
              className="absolute z-20 pointer-events-none glass rounded-lg px-4 py-3 shadow-lg"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <p className="font-semibold text-sm mb-1">{hoveredDept}</p>
              {COVERAGE_CITIES[hoveredDept] && (
                <div className="text-xs text-muted-foreground">
                  {COVERAGE_CITIES[hoveredDept].map((city) => (
                    <p key={city}>{city}</p>
                  ))}
                </div>
              )}
              {!DEPARTMENTS_WITH_PRESENCE.includes(
                hoveredDept as (typeof DEPARTMENTS_WITH_PRESENCE)[number]
              ) && (
                <p className="text-xs text-muted-foreground italic">
                  Sin presencia actual
                </p>
              )}
            </div>
          )}

          {/* Colombia SVG Map */}
          <svg
            viewBox="0 0 600 700"
            className="w-full h-auto"
            role="img"
            aria-label="Mapa de Colombia mostrando la cobertura de La Nieve"
          >
            {/* Colombia departments as paths */}
            {/* La Guajira */}
            <path
              data-department="La Guajira"
              d="M420,30 L480,25 L510,50 L520,90 L500,120 L470,130 L440,110 L420,80 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "La Guajira")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Cesar */}
            <path
              data-department="Cesar"
              d="M380,120 L440,110 L470,130 L460,180 L430,200 L390,190 L370,160 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Cesar")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Norte de Santander */}
            <path
              data-department="Norte de Santander"
              d="M350,60 L390,55 L420,80 L420,120 L380,120 L370,160 L340,150 L330,100 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Norte de Santander")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Boyacá */}
            <path
              data-department="Boyacá"
              d="M280,130 L330,100 L340,150 L370,160 L390,190 L370,230 L330,240 L290,220 L270,180 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Boyacá")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Santander */}
            <path
              data-department="Santander"
              d="M270,130 L280,130 L290,220 L330,240 L310,270 L280,280 L250,250 L240,200 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Santander")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Atlántico */}
            <path
              data-department="Atlántico"
              d="M270,110 L300,100 L310,120 L300,140 L270,130 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Atlántico")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Bolívar */}
            <path
              data-department="Bolívar"
              d="M230,160 L270,130 L300,140 L310,170 L290,220 L250,250 L220,230 L210,190 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Bolívar")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Magdalena */}
            <path
              data-department="Magdalena"
              d="M290,60 L330,50 L350,60 L330,100 L300,100 L280,110 L270,80 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Magdalena")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Antioquia */}
            <path
              data-department="Antioquia"
              d="M170,100 L230,90 L270,110 L270,130 L240,200 L220,230 L190,220 L160,180 L150,140 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Antioquia")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Caldas */}
            <path
              data-department="Caldas"
              d="M190,220 L220,230 L230,260 L210,280 L180,270 L170,240 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Caldas")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Risaralda */}
            <path
              data-department="Risaralda"
              d="M160,240 L180,270 L170,300 L140,290 L140,260 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Risaralda")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Quindío */}
            <path
              data-department="Quindío"
              d="M170,270 L190,280 L180,310 L160,300 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Quindío")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Valle del Cauca */}
            <path
              data-department="Valle del Cauca"
              d="M120,290 L160,300 L180,310 L190,350 L170,380 L140,390 L110,360 L100,320 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Valle del Cauca")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Cundinamarca */}
            <path
              data-department="Cundinamarca"
              d="M220,260 L280,250 L330,240 L350,280 L330,320 L290,330 L250,310 L220,290 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Cundinamarca")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Bogotá D.C. */}
            <path
              data-department="Bogotá D.C."
              d="M260,280 L280,275 L295,290 L285,305 L265,305 L255,295 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Bogotá D.C.")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Meta */}
            <path
              data-department="Meta"
              d="M250,310 L290,330 L330,320 L380,340 L390,380 L350,410 L300,400 L260,370 L240,340 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Meta")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Casanare */}
            <path
              data-department="Casanare"
              d="M330,240 L370,230 L410,260 L420,310 L380,340 L330,320 L310,280 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Casanare")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Tolima */}
            <path
              data-department="Tolima"
              d="M190,310 L230,310 L260,340 L250,370 L220,390 L190,370 L180,340 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Tolima")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Huila */}
            <path
              data-department="Huila"
              d="M220,390 L260,370 L300,400 L310,440 L280,470 L240,460 L210,430 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Huila")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Cauca */}
            <path
              data-department="Cauca"
              d="M130,390 L170,380 L190,370 L210,430 L200,470 L160,480 L130,440 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Cauca")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Nariño */}
            <path
              data-department="Nariño"
              d="M80,440 L130,440 L160,480 L140,520 L100,530 L70,500 L60,460 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Nariño")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Putumayo */}
            <path
              data-department="Putumayo"
              d="M160,480 L200,470 L240,460 L260,510 L230,560 L180,550 L150,520 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Putumayo")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Caquetá */}
            <path
              data-department="Caquetá"
              d="M240,460 L280,470 L310,440 L350,410 L380,450 L370,510 L330,540 L280,530 L260,510 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Caquetá")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Arauca */}
            <path
              data-department="Arauca"
              d="M370,200 L420,190 L460,210 L470,260 L420,280 L380,260 L370,230 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Arauca")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Vichada */}
            <path
              data-department="Vichada"
              d="M420,280 L470,260 L520,280 L530,340 L500,380 L450,370 L420,340 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Vichada")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Guaviare */}
            <path
              data-department="Guaviare"
              d="M350,370 L400,380 L450,370 L460,420 L420,450 L380,440 L350,410 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Guaviare")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Guainía */}
            <path
              data-department="Guainía"
              d="M480,340 L530,340 L560,380 L550,440 L510,450 L480,420 L470,380 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Guainía")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Vaupés */}
            <path
              data-department="Vaupés"
              d="M380,440 L420,450 L460,420 L480,460 L460,520 L410,530 L370,500 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Vaupés")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Amazonas */}
            <path
              data-department="Amazonas"
              d="M330,540 L380,530 L420,540 L450,580 L430,640 L370,660 L320,630 L300,580 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Amazonas")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Chocó */}
            <path
              data-department="Chocó"
              d="M80,160 L120,140 L150,140 L160,180 L140,260 L120,290 L90,280 L70,240 L60,200 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Chocó")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Sucre */}
            <path
              data-department="Sucre"
              d="M210,140 L240,130 L250,155 L235,175 L210,170 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Sucre")}
              onMouseLeave={() => setHoveredDept(null)}
            />
            {/* Córdoba */}
            <path
              data-department="Córdoba"
              d="M160,120 L210,110 L230,130 L220,170 L190,190 L160,170 Z"
              className="cursor-pointer transition-colors duration-300"
              onMouseMove={(e) => handleMouseMove(e, "Córdoba")}
              onMouseLeave={() => setHoveredDept(null)}
            />
          </svg>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/35" />
              Con presencia
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted" />
              Sin presencia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
