import type { SiteFeature, SitePageCopy } from "./types";

/**
 * Shared technology copy derived exclusively from `tecnoinfo.txt`.
 * Brand-specific images remain in each application configuration.
 */
export const CORPORATE_TECHNOLOGY = {
  eyebrow: "Tecnología e innovación",
  title: "La transformación digital impulsa nuestro crecimiento.",
  description:
    "Fortalecemos nuestros procesos, optimizamos recursos y desarrollamos soluciones innovadoras que generan valor para clientes, proveedores y aliados, construyendo una operación más ágil, eficiente y sostenible.",
  imageCaption:
    "Tecnología aplicada a procesos más eficientes, continuos y protegidos.",
  items: [
    {
      icon: "target",
      title: "Estrategias que generan valor.",
      description:
        "Transformamos ideas en iniciativas que impulsan el crecimiento.",
    },
    {
      icon: "shield",
      title: "Infraestructura y Operaciones",
      description:
        "Tecnología y procesos que garantizan eficiencia y continuidad.",
    },
    {
      icon: "sparkles",
      title: "Innovación que acelera el futuro.",
      description:
        "Datos, analítica e inteligencia artificial al servicio del negocio.",
    },
  ],
} as const satisfies SitePageCopy & {
  readonly imageCaption: string;
  readonly items: readonly SiteFeature[];
};
