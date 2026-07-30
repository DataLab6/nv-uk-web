import type { SiteFeature, SitePageCopy } from "./types";

/**
 * Shared technology copy derived exclusively from `tecnoinfo.txt`.
 * Brand-specific images remain in each application configuration.
 */
export const CORPORATE_TECHNOLOGY = {
  eyebrow: "Tecnología e innovación",
  title: "Impulsamos la transformación digital",
  description:
    "La transformación digital impulsa la evolución de nuestro equipo humano, fortalece nuestros procesos internos y genera valor para clientes, proveedores y aliados estratégicos. A través del desarrollo de proyectos innovadores, optimizamos las inversiones, los recursos y la operación, respaldados por una infraestructura sólida que garantiza la continuidad, la eficiencia y la protección del negocio",
  imageCaption:
    "Tecnología aplicada a procesos más eficientes, continuos y protegidos.",
  items: [
    {
      icon: "target",
      title: "Proyectos",
      description:
        "Planificamos iniciativas estratégicas para optimizar inversiones, procesos y recursos con foco en el valor del negocio.",
    },
    {
      icon: "shield",
      title: "Infraestructura y Operaciones",
      description:
        "Fortalecemos la continuidad y protección de la operación mediante infraestructura tecnológica disponible y procesos optimizados.",
    },
    {
      icon: "sparkles",
      title: "Soluciones y Transformación Digital",
      description:
        "Integramos ciencia de datos, inteligencia artificial y pensamiento disruptivo para replantear soluciones convencionales.",
    },
  ],
} as const satisfies SitePageCopy & {
  readonly imageCaption: string;
  readonly items: readonly SiteFeature[];
};
