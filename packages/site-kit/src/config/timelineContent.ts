import type { SiteTimelineMilestone } from "./types";

/** Timeline copy transcribed from `lineatiempo.txt`. */
export const LA_NIEVE_TIMELINE = [
  {
    period: "90s",
    description:
      "Desde los años 90 en nuestro nacimiento en los llanos orientales, somos reconocidos como una distribuidora que abastece a comerciantes de la región, con productos de consumo masivo líderes en el mercado.",
  },
  {
    period: "Actualidad",
    isCurrent: true,
    description:
      "Hoy con orgullo con operación en el 47 % de país,  seguimos consolidándonos como una de las distribuidoras de mayor impacto, proyectándonos día a día hacia un crecimiento constante y sostenido, guiados por nuestros valores y por el compromiso de quienes hacen parte de nuestra historia."
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
      "Hoy con orgullo con operación en el 31 % de país,  seguimos consolidándonos como una de las distribuidoras de mayor impacto, proyectándonos día a día hacia un crecimiento constante y sostenido, guiados por nuestros valores y por el compromiso de quienes hacen parte de nuestra historia."
  },
] as const satisfies readonly SiteTimelineMilestone[];
