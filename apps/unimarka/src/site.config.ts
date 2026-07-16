import {
  CORPORATE_MISSION,
  CORPORATE_TECHNOLOGY,
  CORPORATE_VALUES,
  CORPORATE_VISION,
  UNIMARKA_TIMELINE,
  createCorporateNavigation,
  sharedHeroImage,
  type SiteConfig,
} from "@corporativo/site-kit/config";

function brandLogo(
  name: string,
  src: string,
  width: number,
  height: number,
  displayWidth = 160
) {
  return {
    name,
    displayWidth,
    image: {
      src,
      alt: `Logotipo de ${name}`,
      width,
      height,
      treatment: "illustration" as const,
    },
  };
}

const unimarkaBrandLogos = [
  brandLogo("Unilever", "/brands/unilever.png", 1280, 720, 142),
  brandLogo("Brinsa", "/brands/brinsa.png", 2125, 791, 184),
  brandLogo("Grupo Familia", "/brands/grupo-familia.png", 1280, 318, 188),
  brandLogo("Familia TORK", "/brands/familia-tork.png", 3840, 2160, 156),
  brandLogo("Quala", "/brands/quala.png", 400, 400, 100),
  brandLogo("Contegral", "/brands/contegral.png", 472, 321, 136),
  brandLogo("Reckitt", "/brands/reckitt.png", 3840, 2160, 150),
  brandLogo("Providencia", "/brands/providencia.png", 400, 300, 126),
  brandLogo("Amerincandy", "/brands/americandy.png", 1024, 422, 180),
  brandLogo("La Soberana", "/brands/la-soberana.png", 250, 150, 144),
  brandLogo("PQP", "/brands/pqp.png", 503, 187, 176),
  brandLogo(
    "Precocidos del Oriente",
    "/brands/precocidos-del-oriente.png",
    699,
    600,
    122
  ),
  brandLogo("Indulacteos", "/brands/indulacteos.png", 1254, 1254, 104),
] as const;

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
    src: "/brand/logo-horizontal.png",
    alt: "Logotipo de Unimarka",
    width: 543,
    height: 209,
    display: "wide",
  },
  chromeLogo: {
    src: "/brand/logo-white.png",
    alt: "Logotipo blanco de Unimarka",
    width: 543,
    height: 209,
    display: "wide",
  },
  favicon: "/brand/favicon.png",
  themeColor: "#BD202D",
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
      src: sharedHeroImage,
      alt: "Tendero atendiendo un minimercado surtido",
      width: 1024,
      height: 1024,
      treatment: "photo",
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
    ...CORPORATE_TECHNOLOGY,
    image: {
      src: "/images/innovacion-unimarka.png",
      alt: "Fotografía conceptual sobre tecnología e innovación en Unimarka",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
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
    timeline: UNIMARKA_TIMELINE,
    mission: CORPORATE_MISSION,
    vision: CORPORATE_VISION,
    values: CORPORATE_VALUES,
  },
  allies: {
    eyebrow: "Aliados comerciales",
    title: "Marcas que hacen parte de esta historia",
    description:
      "Relación de aliados suministrada para organizar la primera fase del sitio de Unimarka.",
    items: unimarkaBrandLogos,
    logos: unimarkaBrandLogos,
    imageNotice:
      "Logotipos incorporados desde los 13 recursos locales suministrados en MarcasUK. La publicación definitiva permanece sujeta a autorización de uso.",
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
    // Correo y teléfono verificados en redesciales.txt.
    email: "servicioalcliente@unimarka.com",
    phone: "320-341-4212",
    mapEmbedUrl: null,
    pendingMessage:
      "La dirección y la integración cartográfica se habilitarán cuando la empresa confirme sus enlaces oficiales.",
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
    pendingMessage:
      "Actualmente no se anuncian vacantes ni se reciben hojas de vida desde este sitio. El canal oficial se incorporará después de su validación.",
  },
  legal: {
    eyebrow: "Información legal",
    title: "Transparencia y atención responsable",
    description:
      "Consulta el estado del documento de tratamiento de datos y el espacio previsto para la gestión de PQRS de Unimarka.",
  },
  dataPolicy: {
    eyebrow: "Tratamiento de datos",
    title: "Tratamiento de datos personales de Unimarka",
    description:
      "El archivo local suministrado no identifica a Unimarka como responsable del tratamiento.",
    applicability:
      "La fuente tratamientodata.txt identifica exclusivamente a DISTRIBUCIONES LA NIEVE S.A.S y no menciona a Unimarka.",
    disclaimer:
      "Por esta razón, el contenido de La Nieve no se presenta como política de Unimarka. Se requiere una fuente propia que identifique expresamente a esta empresa.",
    documentId: null,
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
  socialLinks: {
    linkedin: null,
    instagram: "https://www.instagram.com/unimarka_col/?igshid=YmMyMTA2M2Y=",
    facebook: "https://www.facebook.com/unimarka.23/?ti=as",
  },
  // LinkedIn no aparece en redesciales.txt para Unimarka; se retira del footer sin dejar espacio vacío.
  socialNetworks: ["instagram", "facebook"],
  // Fuente: C:\Devs\web\la-nieve-web\redesciales.txt (sección "Unimarka").
  footerContact: {
    email: "servicioalcliente@unimarka.com",
    location:
      "Cra 22 N 5B-114 BG A15 Parque Comercial La Primavera Villavicencio – Meta",
  },
  developmentTeam: "Equipo TI & Desarrollo Unimarka",
} as const satisfies SiteConfig;
