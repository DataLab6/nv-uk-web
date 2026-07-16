import type { SiteTimelineMilestone } from "./types";

/** Timeline copy transcribed from `lineatiempo.txt`. */
export const LA_NIEVE_TIMELINE = [
  {
    period: "90s",
    description:
      "Desde los años 90 en nuestro nacimiento en los llanos orientales, somos reconocidos como una distribuidora que abastece a comerciantes de la región, con productos de consumo masivo.",
  },
  {
    period: "Actualidad",
    isCurrent: true,
    description:
      "Hoy seguimos orgullosamente cumpliendo con dicho fin impactando con nuestros servicios a las poblaciones de la región oriental, contando desde entonces con un crecimiento consistente y constante. Este crecimiento se los debemos a nuestros valores que nos guían.",
  },
] as const satisfies readonly SiteTimelineMilestone[];

/** Timeline copy transcribed from `lineatiempo.txt`. */
export const UNIMARKA_TIMELINE = [
  {
    period: "2014",
    isoDate: "2014",
    description:
      "Nace en la región de los Llanos Orientales, con el fin de satisfacer la demanda de todos los comerciantes de la región, con productos de consumo masivo líderes en el mercado.",
  },
  {
    period: "Actualidad",
    isCurrent: true,
    description:
      "Hoy en día bajo una rigurosa disciplina en ejecución, seguimos orgullosamente creciendo, en cumplimiento de nuestros valores corporativos con un excelente desempeño innovador en la distribución y comercialización.",
  },
] as const satisfies readonly SiteTimelineMilestone[];
