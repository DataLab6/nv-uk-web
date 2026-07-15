import {
  createCorporateNavigation,
  type SiteConfig,
} from "@corporativo/site-kit/config";

/**
 * Brand-owned content and identity for Unimarka.
 * Any illustrative content is explicitly identified as pending validation.
 */
export const siteConfig = {
  id: "unimarka",
  name: "Unimarka",
  legalName: "Unimarka",
  slogan: "Lo hacemos de corazón",
  logo: {
    src: "/brand/logo.png",
    alt: "Logotipo de Unimarka",
    width: 750,
    height: 333,
    display: "wide",
  },
  themeColor: "#275FA6",
  metadata: {
    title: "Unimarka | Sitio corporativo",
    titleTemplate: "%s | Unimarka",
    description:
      "Sitio corporativo de Unimarka, distribuidora colombiana de productos de consumo masivo, productos institucionales, licores y vinos.",
    keywords: [
      "Unimarka",
      "distribución",
      "consumo masivo",
      "productos institucionales",
      "licores",
      "vinos",
      "Colombia",
    ],
  },
  navigation: createCorporateNavigation("Unimarka"),
  home: {
    eyebrow: "Calidad, servicio e innovación",
    title: "Conectamos productos, empresas y experiencias",
    description:
      "En Unimarka trabajamos alrededor de la comercialización y distribución de productos de consumo masivo, productos institucionales, licores y vinos.",
    image: {
      src: "/images/unimarka-character.png",
      alt: "Ilustración corporativa en los colores de Unimarka",
      width: 1081,
      height: 1081,
      treatment: "character",
    },
    points: [
      {
        icon: "store",
        title: "Consumo masivo",
        description: "Una línea orientada a productos de consumo masivo.",
      },
      {
        icon: "building",
        title: "Productos institucionales",
        description: "Una categoría dirigida a necesidades institucionales.",
      },
      {
        icon: "wine",
        title: "Licores y vinos",
        description:
          "Categorías que forman parte de su enfoque de comercialización y distribución.",
      },
    ],
  },
  stats: {
    eyebrow: "Indicadores de ejemplo",
    title: "Una vista demostrativa de nuestros indicadores",
    description:
      "Estas cifras permiten visualizar el diseño de la sección y todavía no representan indicadores corporativos oficiales.",
    image: {
      src: "/images/stats-unimarka.png",
      alt: "Fotografía conceptual de una operación de inventario y distribución",
      width: 1600,
      height: 900,
      treatment: "photo",
    },
    items: [
      {
        value: 13,
        label: "Aliados comerciales",
        note: "Ejemplo basado en la lista suministrada para esta fase.",
      },
      {
        value: 6,
        label: "Canales de atención",
        note: "Ejemplo basado en las categorías definidas para el sitio.",
      },
      {
        value: 12,
        label: "Departamentos",
        note: "Cifra demostrativa; cobertura pendiente de validación oficial.",
      },
      {
        value: 4,
        label: "Categorías",
        note: "Ejemplo basado en el contexto corporativo suministrado.",
      },
    ],
    disclaimer:
      "Cifras de demostración para fines de diseño. Deben sustituirse por indicadores verificados y aprobados antes de publicar.",
  },
  coverage: {
    eyebrow: "Mapa de cobertura — demostración",
    title: "Una operación que conecta territorios",
    description:
      "El mapa presenta una selección provisional de departamentos para mostrar la experiencia interactiva prevista.",
    departments: [
      "Antioquia",
      "Atlántico",
      "Bolívar",
      "Boyacá",
      "Caldas",
      "Cundinamarca",
      "Meta",
      "Quindío",
      "Risaralda",
      "Santander",
      "Tolima",
      "Valle del Cauca",
    ],
    disclaimer:
      "Cobertura demostrativa: estos departamentos no constituyen una declaración de operación real. La lista requiere confirmación oficial de Unimarka.",
    isDemo: true,
  },
  channels: {
    eyebrow: "Clientes por canal",
    title: "Soluciones pensadas para distintos tipos de negocio",
    description:
      "La arquitectura organiza la información comercial en los seis canales definidos para el sitio.",
    items: [
      {
        icon: "store",
        title: "Tiendas",
        description:
          "Espacio para presentar el acompañamiento dirigido al comercio de cercanía.",
      },
      {
        icon: "building",
        title: "Minimercados y Supermercados",
        description:
          "Información para establecimientos con surtidos y dinámicas de compra diversas.",
      },
      {
        icon: "package-check",
        title: "Mayoristas",
        description:
          "Contenido comercial destinado a operaciones de compra y distribución mayorista.",
      },
      {
        icon: "briefcase",
        title: "Institucional",
        description:
          "Un canal preparado para comunicar soluciones orientadas a organizaciones.",
      },
      {
        icon: "wine",
        title: "Bares y Licoreras",
        description:
          "Sección destinada a las necesidades propias de estos establecimientos.",
      },
      {
        icon: "users",
        title: "Otros",
        description:
          "Un punto de entrada para perfiles comerciales que no pertenecen a los canales anteriores.",
      },
    ],
  },
  innovation: {
    eyebrow: "Tecnología e innovación",
    title: "Nuevas ideas al servicio de mejores experiencias",
    description:
      "Este espacio comunica la apuesta de Unimarka por la tecnología y la innovación continua, sin atribuir herramientas o resultados todavía no validados.",
    image: {
      src: "/images/innovacion-unimarka.png",
      alt: "Fotografía conceptual sobre tecnología e innovación en Unimarka",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
    items: [
      {
        icon: "sparkles",
        title: "Innovación continua",
        description:
          "Una línea editorial para compartir mejoras cuando cuenten con respaldo corporativo.",
      },
      {
        icon: "lightbulb",
        title: "Tecnología con propósito",
        description:
          "Un espacio para explicar cómo las soluciones validadas apoyan el servicio y la operación.",
      },
      {
        icon: "heart",
        title: "Experiencias cercanas",
        description:
          "Contenido preparado para presentar iniciativas concretas y verificables en el futuro.",
      },
    ],
  },
  about: {
    eyebrow: "Somos Unimarka",
    title: "Calidad, servicio y confianza en cada experiencia",
    description:
      "Conoce la estructura propuesta para presentar el propósito y los principios de Unimarka.",
    image: {
      src: "/images/somos-unimarka.png",
      alt: "Fotografía conceptual para la sección Somos Unimarka",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
    mission:
      "Ejemplo de misión — pendiente de aprobación: acercar productos de calidad a empresas y consumidores mediante una comercialización responsable, un servicio cercano y experiencias que generen confianza.",
    vision:
      "Ejemplo de visión — pendiente de aprobación: ser una distribuidora reconocida por su capacidad de innovar, crear relaciones duraderas y aportar valor a clientes, aliados y comunidades.",
    values: [
      {
        icon: "check",
        title: "Calidad",
        description:
          "Valor propuesto para expresar cuidado y consistencia en cada experiencia.",
      },
      {
        icon: "heart",
        title: "Servicio",
        description:
          "Valor propuesto para representar cercanía y disposición hacia cada público.",
      },
      {
        icon: "shield",
        title: "Confianza",
        description:
          "Valor propuesto para comunicar relaciones transparentes y responsables.",
      },
      {
        icon: "sparkles",
        title: "Innovación",
        description:
          "Valor propuesto para reflejar apertura al cambio y aprendizaje continuo.",
      },
    ],
    pillars: [
      {
        icon: "handshake",
        title: "Relaciones duraderas",
        description:
          "Pilar demostrativo centrado en experiencias de valor con clientes y aliados.",
      },
      {
        icon: "truck",
        title: "Distribución responsable",
        description:
          "Pilar demostrativo para presentar una operación organizada y orientada al servicio.",
      },
      {
        icon: "target",
        title: "Evolución constante",
        description:
          "Pilar demostrativo asociado con la búsqueda de mejores formas de generar valor.",
      },
    ],
    disclaimer:
      "La misión, la visión, los valores y los pilares de esta sección son textos demostrativos. Requieren validación y aprobación corporativa antes de su publicación oficial.",
  },
  allies: {
    eyebrow: "Aliados comerciales",
    title: "Marcas que hacen parte de esta historia",
    description:
      "Relación de aliados suministrada para organizar la primera fase del sitio de Unimarka.",
    items: [
      { name: "Unilever" },
      { name: "Brinsa" },
      { name: "Grupo Familia" },
      { name: "Familia TORK" },
      { name: "Quala" },
      { name: "Contegral" },
      { name: "Reckitt" },
      { name: "Providencia" },
      { name: "Amerincandy" },
      { name: "La Soberana" },
      { name: "PQP" },
      { name: "Precocidos del Oriente" },
      { name: "Indulacteos" },
    ],
    imageNotice:
      "Los iconos son marcadores temporales. Cada logotipo deberá incorporarse con su archivo oficial y la autorización de uso correspondiente.",
  },
  culture: {
    eyebrow: "Cultura Unimarka",
    title: "Ideas útiles para fortalecer cada negocio",
    description:
      "Un espacio editorial enfocado en compartir contenido de valor con los clientes de Unimarka.",
    image: {
      src: "/images/cultura-unimarka.png",
      alt: "Fotografía conceptual de comerciantes compartiendo buenas prácticas",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
    topics: [
      {
        icon: "trending-up",
        title: "Tips comerciales",
        description:
          "Ideas prácticas para apoyar la gestión comercial y la relación con los compradores.",
      },
      {
        icon: "store",
        title: "Buenas prácticas para establecimientos",
        description:
          "Orientaciones generales sobre organización, exhibición y experiencia en el punto de venta.",
      },
      {
        icon: "lightbulb",
        title: "Recomendaciones y contenido de apoyo",
        description:
          "Recursos para inspirar decisiones informadas y fortalecer la operación de los negocios.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Conversemos por nuestros canales oficiales",
    description:
      "Esta página reunirá los medios verificados para comunicarse con Unimarka.",
    pendingMessage:
      "El correo, teléfono, dirección y redes sociales se habilitarán cuando la empresa confirme sus datos oficiales.",
  },
  careers: {
    eyebrow: "Trabaja con nosotros",
    title: "Construyamos nuevas oportunidades",
    description:
      "Un espacio independiente para publicar oportunidades laborales y orientar futuras postulaciones.",
    image: {
      src: "/images/somos-unimarka.png",
      alt: "Fotografía conceptual de personas colaborando en Unimarka",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
    benefits: [
      {
        icon: "briefcase",
        title: "Vacantes verificadas",
        description:
          "Las oportunidades se publicarán únicamente cuando hayan sido confirmadas por la empresa.",
      },
      {
        icon: "users",
        title: "Proceso de postulación",
        description:
          "Aquí se explicarán los pasos y requisitos oficiales para cada convocatoria.",
      },
      {
        icon: "heart",
        title: "Cultura de equipo",
        description:
          "Este espacio podrá presentar la experiencia laboral con información corporativa validada.",
      },
    ],
    pendingMessage:
      "Actualmente no se anuncian vacantes ni se reciben hojas de vida desde este sitio. El canal oficial se incorporará después de su validación.",
  },
  legal: {
    eyebrow: "Información legal",
    title: "Transparencia y atención responsable",
    description:
      "Consulta los espacios previstos para el tratamiento de datos personales y la gestión de PQRS. Los textos actuales son modelos sujetos a revisión jurídica y aprobación oficial.",
  },
  dataPolicy: {
    eyebrow: "Tratamiento de datos",
    title: "Modelo informativo de tratamiento de datos personales",
    description:
      "Estructura preliminar para organizar la futura política oficial de Unimarka.",
    disclaimer:
      "Documento de muestra sin efectos jurídicos. Debe ser revisado, completado y aprobado por el área jurídica y por la empresa antes de publicarse como política oficial.",
    sections: [
      {
        title: "Alcance del documento",
        body: "La versión definitiva deberá identificar al responsable del tratamiento, el alcance de la política y las bases jurídicas aplicables.",
      },
      {
        title: "Finalidades y tratamiento",
        body: "La política oficial deberá detallar las finalidades autorizadas, las categorías de datos y los procedimientos utilizados por la empresa.",
      },
      {
        title: "Derechos de los titulares",
        body: "El texto aprobado deberá explicar de manera clara los derechos de consulta, actualización, rectificación, supresión y revocatoria que resulten aplicables.",
      },
      {
        title: "Canales de atención",
        body: "Los datos de contacto, responsables y tiempos de respuesta se incorporarán únicamente después de su confirmación oficial.",
      },
    ],
  },
  pqrs: {
    eyebrow: "PQRS",
    title: "Peticiones, quejas, reclamos y sugerencias",
    description:
      "Página preparada para orientar la recepción y gestión de comunicaciones cuando se habilite el canal oficial.",
    disclaimer:
      "Contenido y flujo de muestra. Requieren revisión jurídica, definición de responsables y validación de los canales oficiales antes de entrar en operación.",
    categories: [
      {
        icon: "file-text",
        title: "Peticiones",
        description:
          "Solicitudes de información o actuaciones que serán gestionadas según el procedimiento oficial por definir.",
      },
      {
        icon: "megaphone",
        title: "Quejas",
        description:
          "Manifestaciones relacionadas con la atención o el servicio, sujetas al proceso oficial de gestión.",
      },
      {
        icon: "shield",
        title: "Reclamos",
        description:
          "Solicitudes de revisión sobre una situación concreta, pendientes de un protocolo corporativo validado.",
      },
      {
        icon: "lightbulb",
        title: "Sugerencias",
        description:
          "Ideas y recomendaciones que podrán contribuir a la mejora continua cuando el canal sea habilitado.",
      },
    ],
  },
  footerDescription:
    "Distribuidora colombiana de productos de consumo masivo, institucionales, licores y vinos.",
} as const satisfies SiteConfig;
