import type { SiteFeature, SitePageCopy } from "./types";

/**
 * Shared technology copy derived exclusively from `tecnoinfo.txt`.
 * Brand-specific images remain in each application configuration.
 */
export const CORPORATE_TECHNOLOGY = {
  eyebrow: "Tecnología e innovación",
  title: "Impulsamos la transformación digital",
  description:
    "Orientamos la transformación digital a mejorar nuestros procesos internos y generar valor para clientes, proveedores y aliados estratégicos. Desarrollamos proyectos que optimizan inversiones, recursos y operación, respaldados por infraestructura enfocada en la continuidad y protección del negocio.",
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
