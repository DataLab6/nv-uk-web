import type { SiteStatGroup } from "./types";

/**
 * Cifras corporativas suministradas directamente por la empresa (2026-07-16,
 * actualizadas el 2026-07-17) para la sección de estadísticas. Se transcriben
 * literalmente y NO provienen de la base de datos ni de los archivos de
 * data/database-snapshot.
 *
 * Los datos operativos se reciben por marca. Las diferencias frente a la
 * extracción de PORTAL_NIEVE quedaron documentadas en docs/progress.md; estas
 * cifras son la fuente principal mientras no exista una instrucción oficial
 * posterior.
 */

const TOTAL_COLOMBIA_DEPARTMENTS = 32;

export function createCorporateStatsGroups({
  departmentsCovered,
  clients,
  municipalities,
  employees,
  clientsPrefix,
}: {
  departmentsCovered: number;
  clients: string;
  municipalities: string;
  employees: string;
  clientsPrefix?: string;
}): readonly SiteStatGroup[] {
  const coveragePercentage = (
    (departmentsCovered / TOTAL_COLOMBIA_DEPARTMENTS) *
    100
  ).toFixed(2);

  return [
    {
      title: "Cobertura nacional",
      figures: [
        {
          value: String(departmentsCovered),
          unit: "departamentos",
          label: "de Colombia con presencia",
        },
        {
          value: `${coveragePercentage}%`,
          label: "de los departamentos de Colombia",
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
          value: municipalities,
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
          label:
            "Comprometidos con la eficiencia y el crecimiento de la operación.",
        },
      ],
      notes: [
        "Equipo con formación profesional.",
        "Enfoque estratégico en logística y distribución.",
      ],
    },
  ] as const satisfies readonly SiteStatGroup[];
}

export const CORPORATE_STATS_GROUPS = createCorporateStatsGroups({
  departmentsCovered: 15,
  clients: "159,000",
  municipalities: "400 - 450",
  employees: "460",
});
