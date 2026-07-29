import type { SiteStatGroup } from "./types";

/**
 * Cifras corporativas suministradas directamente por la empresa (2026-07-16,
 * actualizadas el 2026-07-17) para la sección de estadísticas. Se transcriben
 * literalmente y NO provienen de la base de datos ni de los archivos de
 * data/database-snapshot.
 *
 * La instrucción no atribuyó las cifras a una marca concreta, por lo que se
 * comparten entre ambos sitios como contenido corporativo (misma decisión que
 * misión, visión y tecnología). Las diferencias frente a la extracción de
 * PORTAL_NIEVE quedaron documentadas en docs/progress.md; estas cifras son la
 * fuente principal mientras no exista una instrucción oficial posterior.
 */

/** Cobertura departamental: única fuente del cálculo de porcentaje, para no repetirlo en varios lugares. */
const DEPARTMENTS_COVERED = 18;
const TOTAL_COLOMBIA_DEPARTMENTS = 32;
const COVERAGE_PERCENTAGE = (
  (DEPARTMENTS_COVERED / TOTAL_COLOMBIA_DEPARTMENTS) *
  100
).toFixed(2);

export function createCorporateStatsGroups({
  clients,
  employees,
  clientsPrefix,
}: {
  clients: string;
  employees: string;
  clientsPrefix?: string;
}): readonly SiteStatGroup[] {
  return [
    {
      title: "Cobertura nacional",
      figures: [
        {
          value: String(DEPARTMENTS_COVERED),
          unit: "departamentos",
          label: "de Colombia con presencia",
        },
        {
          value: `${COVERAGE_PERCENTAGE}%`,
          label: "de los departamentos de Colombia",
        },
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
          prefix: clientsPrefix,
          value: clients,
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
          value: employees,
          unit: "empleados",
          label: "altamente capacitados",
        },
      ],
      notes: ["Perfil profesional.", "Enfocados en logística."],
    },
  ] as const satisfies readonly SiteStatGroup[];
}

export const CORPORATE_STATS_GROUPS = createCorporateStatsGroups({
  clients: "159,000",
  employees: "460",
});
