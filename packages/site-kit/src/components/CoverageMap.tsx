"use client";

import { useState } from "react";
import type { SiteConfig } from "../config/types";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { cn } from "../lib/cn";
import { SiteIcon } from "./SiteIcon";

interface MapPoint {
  readonly x: number;
  readonly y: number;
}

const DEPARTMENT_POINTS: Readonly<Record<string, MapPoint>> = {
  Amazonas: { x: 328, y: 548 },
  Antioquia: { x: 205, y: 182 },
  Arauca: { x: 418, y: 207 },
  Atlántico: { x: 274, y: 66 },
  Bolívar: { x: 250, y: 126 },
  Boyacá: { x: 324, y: 213 },
  Caldas: { x: 212, y: 242 },
  Caquetá: { x: 298, y: 410 },
  Casanare: { x: 384, y: 264 },
  Cauca: { x: 172, y: 369 },
  Cesar: { x: 350, y: 102 },
  Chocó: { x: 122, y: 219 },
  Córdoba: { x: 184, y: 142 },
  Cundinamarca: { x: 290, y: 254 },
  Guainía: { x: 462, y: 389 },
  Guaviare: { x: 370, y: 384 },
  Huila: { x: 239, y: 365 },
  "La Guajira": { x: 405, y: 44 },
  Magdalena: { x: 307, y: 82 },
  Meta: { x: 330, y: 317 },
  Nariño: { x: 139, y: 435 },
  "Norte de Santander": { x: 368, y: 153 },
  Putumayo: { x: 221, y: 457 },
  Quindío: { x: 204, y: 279 },
  Risaralda: { x: 188, y: 263 },
  "San Andrés y Providencia": { x: 67, y: 74 },
  Santander: { x: 294, y: 169 },
  Sucre: { x: 221, y: 123 },
  Tolima: { x: 239, y: 303 },
  "Valle del Cauca": { x: 150, y: 322 },
  Vaupés: { x: 405, y: 474 },
  Vichada: { x: 451, y: 317 },
  "Bogotá D.C.": { x: 301, y: 272 },
};

function normalizeDepartment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLocaleLowerCase("es-CO");
}

function getMapPoint(department: string, index: number): MapPoint {
  const exactPoint = DEPARTMENT_POINTS[department];
  if (exactPoint) return exactPoint;

  const normalized = normalizeDepartment(department);
  const catalogEntry = Object.entries(DEPARTMENT_POINTS).find(
    ([name]) => normalizeDepartment(name) === normalized
  );
  if (catalogEntry) return catalogEntry[1];

  // Stable fallback keeps future configuration values visible without
  // pretending to calculate their real geographic position.
  return {
    x: 205 + ((index * 71) % 210),
    y: 155 + ((index * 97) % 285),
  };
}

/**
 * Interactive, keyboard-operable schematic of Colombia. Marker positions are
 * illustrative UI anchors and are never presented as cartographic data.
 */
export function CoverageMap({ site }: { site: SiteConfig }) {
  const sectionRef = useRevealAnimation<HTMLElement>({ type: "fadeUp" });
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    site.coverage.departments[0] ?? null
  );
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(
    null
  );
  const activeDepartment = hoveredDepartment ?? selectedDepartment;

  return (
    <section
      ref={sectionRef}
      id="cobertura"
      aria-labelledby="home-coverage-title"
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24"
    >
      <div
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,var(--secondary),transparent_36%),radial-gradient(circle_at_85%_75%,var(--brand-tertiary),transparent_32%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-center lg:px-8">
        <div>
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/80">
                {site.coverage.eyebrow}
              </span>
              {site.coverage.isDemo && (
                <span className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Demostración
                </span>
              )}
            </div>
            <h2
              id="home-coverage-title"
              className="mt-3 text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl"
            >
              {site.coverage.title}
            </h2>
            <p className="mt-4 leading-relaxed text-primary-foreground/80">
              {site.coverage.description}
            </p>
          </div>

          <figure className="mt-8 rounded-3xl border border-primary-foreground/20 bg-background/95 p-4 text-foreground shadow-2xl shadow-black/15 sm:p-6">
            <svg
              viewBox="0 0 520 620"
              className="mx-auto h-auto w-full max-w-xl"
              role="group"
              aria-labelledby="coverage-map-name coverage-map-description"
            >
              <title id="coverage-map-name">
                Mapa esquemático interactivo de Colombia
              </title>
              <desc id="coverage-map-description">
                Seleccione un marcador para consultar el nombre del departamento
                configurado. La silueta y los puntos no representan límites ni
                ubicaciones cartográficas exactas.
              </desc>

              <path
                d="M290 24 327 40 360 32 411 49 438 77 420 112 391 129 408 164 446 197 467 238 461 286 487 329 474 383 443 421 427 470 391 512 372 575 329 598 298 565 274 525 236 494 203 472 174 441 147 401 125 360 98 320 105 274 91 226 111 184 137 155 154 115 187 97 221 88 246 54Z"
                className="fill-primary/10 stroke-primary/45"
                strokeWidth="3"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M224 92 244 153 207 188 246 229 220 279 262 320 231 365 274 407 239 474M327 41 310 105 349 148 311 201 360 247 326 308 379 355 348 416 392 473M112 183 167 204 151 263 209 288M420 112 372 127 391 185 349 215M99 321 157 324 178 380 145 401M261 320 326 308 348 416 274 407"
                className="fill-none stroke-primary/15"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                vectorEffect="non-scaling-stroke"
                aria-hidden="true"
              />

              {site.coverage.departments.map((department, index) => {
                const point = getMapPoint(department, index);
                const isActive = activeDepartment === department;

                return (
                  <g
                    key={department}
                    role="button"
                    tabIndex={0}
                    aria-label={`Seleccionar ${department}`}
                    aria-pressed={selectedDepartment === department}
                    className="cursor-pointer"
                    onClick={() => setSelectedDepartment(department)}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      setSelectedDepartment(department);
                    }}
                    onMouseEnter={() => setHoveredDepartment(department)}
                    onMouseLeave={() => setHoveredDepartment(null)}
                    onFocus={() => setHoveredDepartment(department)}
                    onBlur={() => setHoveredDepartment(null)}
                  >
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="18"
                      className="fill-transparent"
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isActive ? 10 : 7}
                      className={cn(
                        "stroke-background transition-all duration-200",
                        isActive ? "fill-accent" : "fill-primary"
                      )}
                      strokeWidth="4"
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isActive ? 17 : 12}
                      className={cn(
                        "fill-none stroke-secondary transition-all duration-200",
                        isActive ? "opacity-80" : "opacity-30"
                      )}
                      strokeWidth="2"
                    />
                    {isActive && (
                      <g aria-hidden="true" className="pointer-events-none">
                        <rect
                          x={Math.max(8, Math.min(point.x - 58, 396))}
                          y={Math.max(8, point.y - 49)}
                          width="116"
                          height="27"
                          rx="8"
                          className="fill-foreground"
                        />
                        <text
                          x={Math.max(66, Math.min(point.x, 454))}
                          y={Math.max(26, point.y - 31)}
                          textAnchor="middle"
                          className="fill-background text-[11px] font-bold"
                        >
                          {department.length > 18
                            ? `${department.slice(0, 17)}…`
                            : department}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Representación esquemática para navegación; no es cartografía y no
              muestra límites ni ubicaciones geográficas exactas.
            </figcaption>
          </figure>
        </div>

        <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-sm sm:p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground text-primary shadow-lg">
            <SiteIcon name="map-pin" className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-xl font-extrabold text-primary-foreground">
            Explora los departamentos
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
            Usa los marcadores o selecciona una opción de la lista.
          </p>

          {site.coverage.departments.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {site.coverage.departments.map((department) => (
                <button
                  key={department}
                  type="button"
                  aria-pressed={selectedDepartment === department}
                  onClick={() => setSelectedDepartment(department)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-left text-sm font-semibold transition-colors",
                    selectedDepartment === department
                      ? "border-primary-foreground bg-primary-foreground text-primary"
                      : "border-primary-foreground/25 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/15"
                  )}
                >
                  {department}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-primary-foreground/20 p-4 text-sm text-primary-foreground/75">
              Los departamentos se incorporarán cuando la información esté
              disponible.
            </p>
          )}

          {selectedDepartment && (
            <div
              className="mt-6 rounded-2xl bg-primary-foreground p-4 text-primary"
              aria-live="polite"
            >
              <span className="block text-xs font-bold uppercase tracking-wider opacity-70">
                {site.coverage.isDemo
                  ? "Marcador de demostración"
                  : "Departamento seleccionado"}
              </span>
              <strong className="mt-1 block text-lg">
                {selectedDepartment}
              </strong>
            </div>
          )}

          <p className="mt-6 border-t border-primary-foreground/20 pt-5 text-xs leading-relaxed text-primary-foreground/75">
            <strong className="text-primary-foreground">Nota:</strong>{" "}
            {site.coverage.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
