import {
  createCorporateNavigation,
  type SiteConfig,
} from "@corporativo/site-kit/config";

/**
 * Brand-owned content and identity for Distribuciones La Nieve.
 * Any illustrative content is explicitly identified as pending validation.
 */
export const siteConfig = {
  id: "la-nieve",
  name: "Distribuciones La Nieve",
  legalName: "Distribuciones La Nieve",
  slogan: "Sirviendo con pasión",
  logo: {
    src: "/brand/logo.png",
    alt: "Logotipo de Distribuciones La Nieve",
    width: 500,
    height: 500,
    display: "cropped-square",
  },
  themeColor: "#27348A",
  metadata: {
    title: "Distribuciones La Nieve | Sitio corporativo",
    titleTemplate: "%s | Distribuciones La Nieve",
    description:
      "Sitio corporativo de Distribuciones La Nieve, empresa colombiana de distribución y comercio mayorista ubicada en Villavicencio, Meta.",
    keywords: [
      "Distribuciones La Nieve",
      "distribución",
      "comercio mayorista",
      "Villavicencio",
      "Meta",
      "Colombia",
    ],
  },
  navigation: createCorporateNavigation("Nieve"),
  home: {
    eyebrow: "Juntos transformamos",
    title: "Somos el puente entre las marcas y tu negocio",
    description:
      "En La Nieve entendemos el día a día de tiendas, supermercados y aliados comerciales. Por eso trabajamos para que nunca falte el producto correcto, en el momento correcto.",
    image: {
      src: "/images/together-store.png",
      alt: "Tendero atendiendo un minimercado surtido",
      width: 1024,
      height: 1024,
      treatment: "photo",
    },
    points: [
      {
        icon: "store",
        title: "Impulsamos tu tienda",
        description:
          "Surtimos tu negocio con el portafolio que tus clientes buscan, con frecuencia y disponibilidad garantizada.",
      },
      {
        icon: "handshake",
        title: "Aliados de las marcas",
        description:
          "Llevamos productos de las mejores marcas a cada rincón, con logística eficiente y ejecución en punto de venta.",
      },
      {
        icon: "package-check",
        title: "Servicio de principio a fin",
        description:
          "Acompañamos con asesoría comercial, pedidos ágiles y entregas confiables que hacen crecer tu operación.",
      },
    ],
  },
  stats: {
    eyebrow: "Indicadores de ejemplo",
    title: "Una vista demostrativa de nuestros indicadores",
    description:
      "Estas cifras permiten visualizar el diseño de la sección y todavía no representan indicadores corporativos oficiales.",
    image: {
      src: "/images/stats-nieve.png",
      alt: "Fotografía conceptual de una operación de despacho y distribución",
      width: 1600,
      height: 900,
      treatment: "photo",
    },
    items: [
      {
        value: 16,
        label: "Aliados comerciales",
        note: "Ejemplo basado en la lista suministrada para esta fase.",
      },
      {
        value: 6,
        label: "Canales de atención",
        note: "Ejemplo basado en las categorías definidas para el sitio.",
      },
      {
        value: 18,
        label: "Departamentos",
        note: "Cifra demostrativa; cobertura pendiente de validación oficial.",
      },
      {
        value: 100,
        suffix: "%",
        label: "Vocación de servicio",
        note: "Recurso comunicativo de ejemplo, no un indicador medido.",
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
      "Amazonas",
      "Antioquia",
      "Arauca",
      "Atlántico",
      "Bolívar",
      "Boyacá",
      "Caquetá",
      "Casanare",
      "Cundinamarca",
      "Guaviare",
      "Huila",
      "Magdalena",
      "Meta",
      "Norte de Santander",
      "Santander",
      "Tolima",
      "Valle del Cauca",
      "Vichada",
    ],
    disclaimer:
      "Cobertura demostrativa: estos departamentos no constituyen una declaración de operación real. La lista requiere confirmación oficial de Distribuciones La Nieve.",
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
    title: "Evolucionar para servir cada vez mejor",
    description:
      "Este espacio comunica la apuesta de Distribuciones La Nieve por la tecnología y la innovación continua, sin atribuir herramientas o resultados todavía no validados.",
    image: {
      src: "/images/innovacion-nieve.png",
      alt: "Fotografía conceptual sobre tecnología e innovación en Distribuciones La Nieve",
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
        icon: "trending-up",
        title: "Mejora de procesos",
        description:
          "Contenido preparado para documentar avances concretos y verificables en el futuro.",
      },
    ],
  },
  about: {
    eyebrow: "Somos Nieve",
    title: "Una identidad construida alrededor del servicio",
    description:
      "Conoce la estructura propuesta para presentar el propósito y los principios de Distribuciones La Nieve.",
    image: {
      src: "/images/somos-nieve.png",
      alt: "Fotografía conceptual para la sección Somos Nieve",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
    mission:
      "Ejemplo de misión — pendiente de aprobación: conectar marcas y negocios mediante una distribución cercana, responsable y orientada al servicio, generando valor en cada relación comercial.",
    vision:
      "Ejemplo de visión — pendiente de aprobación: consolidarnos como una organización reconocida por su confianza, capacidad de evolución y compromiso con el desarrollo de clientes y aliados.",
    values: [
      {
        icon: "shield",
        title: "Integridad",
        description:
          "Valor propuesto para representar relaciones transparentes y responsables.",
      },
      {
        icon: "heart",
        title: "Servicio",
        description:
          "Valor propuesto para expresar cercanía y disposición hacia cada público.",
      },
      {
        icon: "check",
        title: "Profesionalismo",
        description:
          "Valor propuesto para comunicar rigor y compromiso en el trabajo.",
      },
      {
        icon: "trending-up",
        title: "Progreso",
        description:
          "Valor propuesto para reflejar aprendizaje y evolución permanente.",
      },
    ],
    pillars: [
      {
        icon: "handshake",
        title: "Confianza",
        description:
          "Pilar demostrativo enfocado en relaciones consistentes con clientes y aliados.",
      },
      {
        icon: "truck",
        title: "Ejecución",
        description:
          "Pilar demostrativo para presentar el compromiso con una operación organizada.",
      },
      {
        icon: "sparkles",
        title: "Innovación",
        description:
          "Pilar demostrativo asociado con la búsqueda continua de mejores formas de servir.",
      },
    ],
    disclaimer:
      "La misión, la visión, los valores y los pilares de esta sección son textos demostrativos. Requieren validación y aprobación corporativa antes de su publicación oficial.",
  },
  allies: {
    eyebrow: "Aliados comerciales",
    title: "Marcas que hacen parte de esta historia",
    description:
      "Relación de aliados suministrada para organizar la primera fase del sitio de Distribuciones La Nieve.",
    items: [
      { name: "BAT" },
      { name: "Colgate-Palmolive" },
      { name: "Nestlé Alimentos" },
      { name: "Nestlé Purina" },
      { name: "Alpina" },
      { name: "Harinera del Valle" },
      { name: "Pisa Farmacéutica – Electrolit" },
      { name: "Levapan" },
      { name: "Softys" },
      { name: "Alimentos Polar" },
      { name: "Incauca" },
      { name: "Rama" },
      { name: "Corporación Diana" },
      { name: "Alicorp" },
      { name: "Unidad de Licores del Meta" },
      { name: "Súper de Alimentos" },
    ],
    imageNotice:
      "Los iconos son marcadores temporales. Cada logotipo deberá incorporarse con su archivo oficial y la autorización de uso correspondiente.",
  },
  culture: {
    eyebrow: "Cultura Nieve",
    title: "Ideas útiles para fortalecer cada negocio",
    description:
      "Un espacio editorial enfocado en compartir contenido de valor con los clientes de Distribuciones La Nieve.",
    image: {
      src: "/images/cultura-nieve.png",
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
      "Esta página reunirá los medios verificados para comunicarse con Distribuciones La Nieve.",
    location: "Villavicencio, Meta, Colombia",
    pendingMessage:
      "El correo, teléfono, dirección detallada y redes sociales se habilitarán cuando la empresa confirme sus datos oficiales.",
  },
  careers: {
    eyebrow: "Trabaja con nosotros",
    title: "Construyamos nuevas oportunidades",
    description:
      "Un espacio independiente para publicar oportunidades laborales y orientar futuras postulaciones.",
    image: {
      src: "/images/somos-nieve.png",
      alt: "Fotografía conceptual de personas colaborando en Distribuciones La Nieve",
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
      "Estructura preliminar para organizar la futura política oficial de Distribuciones La Nieve.",
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
    "Empresa colombiana de distribución y comercio mayorista ubicada en Villavicencio, Meta.",
} as const satisfies SiteConfig;
