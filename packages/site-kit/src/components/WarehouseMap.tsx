"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import styles from "./WarehouseMap.module.css";

// City-level anchors on the supplied MapChart artwork, not street addresses.
// Coordinates use the original artwork normalized to a 1600 × 1600 square.
const nieveWarehouses = [
  { city: "Riohacha", image: "riohacha.jpg", x: 929, y: 188 },
  { city: "Santa Marta", image: "santa-marta.jpg", x: 777, y: 239 },
  { city: "Valledupar", image: "valledupar.jpg", x: 851, y: 282 },
  { city: "Sincelejo", image: "sincelejo.jpg", x: 712, y: 359 },
  { city: "Montería", image: "monteria.jpg", x: 687, y: 414 },
  { city: "Duitama", image: "duitama.jpg", x: 862, y: 647 },
  { city: "Yopal", image: "yopal.webp", x: 918, y: 697 },
  { city: "Cota", image: "cota.jpg", x: 789, y: 746, dx: -32, dy: -13 },
  { city: "Bogotá", image: "bogota.jpg", x: 801, y: 771, dx: -16, dy: 34 },
  {
    city: "Villavicencio",
    image: "villavicencio.png",
    x: 840,
    y: 803,
    dx: 30,
    dy: 30,
  },
];

const unimarkaWarehouses = [
  { city: "Duitama", image: "duitama.jpg", x: 862, y: 647 },
  { city: "Yopal", image: "yopal.jpg", x: 918, y: 697 },
  { city: "Bogotá", image: "bogota.jpg", x: 801, y: 771 },
  {
    city: "Villavicencio",
    image: "villavicencio.png",
    x: 840,
    y: 803,
    dx: 30,
    dy: 30,
  },
];

export function WarehouseMap({
  site = "la-nieve",
}: {
  site?: "la-nieve" | "unimarka";
}) {
  const brand = site === "unimarka" ? "Unimarka" : "La Nieve";
  const warehouses = site === "unimarka" ? unimarkaWarehouses : nieveWarehouses;
  const [active, setActive] = useState<number | null>(null);
  const id = useId();
  const warehouse = active === null ? null : warehouses[active];
  useEffect(() => {
    if (active === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [active]);

  return (
    <div
      className={styles.root}
      onKeyDown={(event) => {
        if (event.key === "Escape") setActive(null);
      }}
    >
      <div className={styles.map} onMouseLeave={() => setActive(null)}>
        <svg
          viewBox="420 100 920 1410"
          className={styles.artwork}
          role="img"
          aria-label={`Mapa de Colombia con las zonas de operación de ${brand} resaltadas`}
        >
          <image
            href="/images/warehouses/coverage.png"
            width="1600"
            height="1600"
          />
          {warehouses.map((point) =>
            point.dx ? (
              <line
                key={point.city}
                x1={point.x}
                y1={point.y}
                x2={point.x + point.dx}
                y2={point.y + (point.dy ?? 0)}
                stroke="#dc2626"
                strokeWidth="2"
              />
            ) : null
          )}
        </svg>
        {warehouses.map((point, index) => (
          <button
            key={point.city}
            type="button"
            className={styles.pin}
            style={{
              left: `${((point.x + (point.dx ?? 0) - 420) / 920) * 100}%`,
              top: `${((point.y + (point.dy ?? 0) - 100) / 1410) * 100}%`,
            }}
            aria-label={`Ver bodega en ${point.city}`}
            aria-expanded={active === index}
            aria-controls={active === index ? id : undefined}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className={styles.pinVisual}>
              <svg viewBox="240 330 550 900" aria-hidden="true">
                <image
                  href="/images/warehouses/location.png"
                  width="1024"
                  height="1536"
                />
              </svg>
            </span>
          </button>
        ))}
        {warehouse && (
          <div
            id={id}
            className={styles.preview}
            role="region"
            aria-label={`Bodega en ${warehouse.city}`}
            style={{
              left: `clamp(0px, ${((warehouse.x - 420) / 920) * 100}%, calc(100% - 220px))`,
              top: `${((warehouse.y - 100) / 1410) * 100 + 4}%`,
            }}
          >
            <div className={styles.photo}>
              <Image
                src={`/images/warehouses/${warehouse.image}`}
                alt={`Imagen de ${warehouse.city}, ciudad con bodega de ${brand}`}
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
            <div className={styles.caption}>
              <div>
                <span>Bodega {brand}</span>
                <strong>{warehouse.city}</strong>
              </div>
              <button
                type="button"
                aria-label="Cerrar información de la bodega"
                onClick={() => setActive(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
