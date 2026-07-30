import compromisoSocialImage from "../assets/values/compromiso-social.webp";
import emprendimientoImage from "../assets/values/emprendimiento.webp";
import integridadImage from "../assets/values/integridad.webp";
import lealtadImage from "../assets/values/lealtad.webp";
import respetoImage from "../assets/values/respeto.webp";
import type { SiteValue } from "./types";

export const CORPORATE_MISSION =
  "Prestar un servicio sostenible y confiable a nuestros aliados estratégicos, abasteciendo nuestro territorio con productos de consumo masivo líderes en el mercado.";

export const CORPORATE_VISION =
  "Ampliar nuestra red de distribución nacional con un alto reconocimiento empresarial. Donde la excelencia, la calidad y la confianza sean los pilares de nuestras operaciones.";

/** Literal corporate values shared by both brands. */
export const CORPORATE_VALUES = [
  {
    title: "Integridad",
    description:
      "Una virtud que forja coherencia entre nuestros pensamientos, palabras, actos, hábitos y nuestro carácter. Esta coherencia crea sinergia en las competencias de cada persona y sinergias en la compañía entera; además incentiva en nosotros la solidificación de otras virtudes como la perseverancia, la tolerancia, la paciencia y la fortaleza.",
    image: {
      src: integridadImage,
      alt: "Dos colegas conversan con honestidad y confianza",
      width: 1280,
      height: 853,
      treatment: "photo",
    },
  },
  {
    title: "Compromiso Social",
    description:
      "Como compañía trabajamos siempre con sentido de pertenencia y conciencia colectiva, estamos comprometidos con el desarrollo empresarial, el desarrollo del individuo y el desarrollo de las comunidades a donde llegamos. Con solidaridad y esfuerzo, construimos bienestar comunal entre nuestros colaboradores, nuestros clientes y nuestros proveedores.",
    image: {
      src: compromisoSocialImage,
      alt: "Comunidad y colaboradores construyen bienestar colectivo",
      width: 1280,
      height: 853,
      treatment: "photo",
    },
  },
  {
    title: "Lealtad",
    description:
      "Es el prerrequisito fundamental para edificar logros en el largo plazo, sin esto no se podría superar en conjunto las adversidades que trae la vida. Esta virtud genera la confianza para empoderar el trabajo en equipo, mejorar los resultados integrales de la empresa y los beneficios sociales que genera.",
    image: {
      src: lealtadImage,
      alt: "Equipo unido colabora alrededor de una mesa",
      width: 1280,
      height: 853,
      treatment: "photo",
    },
  },
  {
    title: "Respeto",
    description:
      "Es el valor más importante del ser humano ya que nos permite cooperar en comunidad sin importar las diferencias que existen entre nosotros. Este representa nuestra cultura organizacional y promueve la comunicación asertiva entre: directivos, trabajadores, clientes y proveedores; e incentiva el trabajo en equipo y la conformación de resultados armónicos.",
    image: {
      src: respetoImage,
      alt: "Grupo diverso conversa y se escucha con respeto",
      width: 1280,
      height: 853,
      treatment: "photo",
    },
  },
  {
    title: "Emprendimiento",
    description:
      "Este principio nos incentiva a reconocer la oportunidad en la dificultad, nos motiva a superar los retos con creatividad y perseverancia, nos fortalece ante la debilidad y nos ha distinguido entre las organizaciones por nuestro empeño e innovación. Con emprendimiento conquistamos, sin excusa alguna, todas las metas propuestas.",
    image: {
      src: emprendimientoImage,
      alt: "Equipo de un pequeño negocio planea una mejora innovadora",
      width: 1280,
      height: 853,
      treatment: "photo",
    },
  },
] as const satisfies readonly SiteValue[];
