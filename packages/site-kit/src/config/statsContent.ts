import type { SiteStatGroup } from "./types";

/**
 * Cifras corporativas suministradas directamente por la empresa (2026-07-16)
 * para la sección de estadísticas. Se transcriben literalmente y NO provienen
 * de la base de datos ni de los archivos de data/database-snapshot.
 *
 * La instrucción no atribuyó las cifras a una marca concreta, por lo que se
 * comparten entre ambos sitios como contenido corporativo (misma decisión que
 * misión, visión y tecnología). Las diferencias frente a la extracción de
 * PORTAL_NIEVE quedaron documentadas en docs/progress.md; estas cifras son la
 * fuente principal mientras no exista una instrucción oficial posterior.
 */
export const CORPORATE_STATS_GROUPS = [
  {
    title: "Cobertura nacional",
    figures: [
      {
        value: "24",
        unit: "departamentos",
        label: "de Colombia con presencia",
      },
      {
        value: "85%",
        label: "del territorio nacional",
      },
    ],
    notes: [
      "Enfoque especial en Bogotá, Medellín, Cali, Cartagena y Apartadó.",
    ],
  },
  {
    title: "Capacidad operativa",
    figures: [
      {
        value: "47,300",
        unit: "m²",
        label: "en centros de fulfillment",
      },
      {
        prefix: "Más de",
        value: "64,000",
        unit: "posiciones",
        label: "de almacenamiento",
      },
    ],
  },
  {
    title: "Volumen de operaciones",
    figures: [
      {
        prefix: "Más de",
        value: "5,800",
        unit: "toneladas",
        label: "transportadas mensualmente",
      },
      {
        value: "159,000",
        unit: "clientes",
        label: "con pedidos entregados",
      },
      {
        value: "580-700",
        unit: "municipios",
        label: "con cobertura diaria",
      },
    ],
  },
  {
    title: "Equipo humano",
    figures: [
      {
        value: "460",
        unit: "colaboradores",
        label: "altamente capacitados",
      },
    ],
    notes: ["Perfil profesional.", "Enfocados en logística."],
  },
] as const satisfies readonly SiteStatGroup[];
