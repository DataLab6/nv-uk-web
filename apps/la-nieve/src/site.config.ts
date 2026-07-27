import {
  CORPORATE_MISSION,
  CORPORATE_STATS_GROUPS,
  CORPORATE_TECHNOLOGY,
  CORPORATE_VALUES,
  CORPORATE_VISION,
  LA_NIEVE_TIMELINE,
  createCorporateNavigation,
  normalizeSiteOrigin,
  sharedHeroImage,
  type SiteConfig,
} from "@corporativo/site-kit/config";

function brandLogo(
  name: string,
  src: string,
  width: number,
  height: number,
  displayWidth = 160,
  // Compensates files with large internal transparent margins (see docs/progress.md);
  // most logos omit this and rely on the default scale of 1.
  visualScale?: number
) {
  return {
    name,
    displayWidth,
    ...(visualScale ? { visualScale } : {}),
    image: {
      src,
      alt: `Logotipo de ${name}`,
      width,
      height,
      treatment: "illustration" as const,
    },
  };
}

const laNieveBrandLogos = [
  brandLogo("BAT", "/brands/bat.png", 2387, 1017, 176),
  brandLogo(
    "Colgate-Palmolive",
    "/brands/colgate-palmolive.png",
    1544,
    1064,
    142
  ),
  brandLogo(
    "Nestlé Alimentos",
    "/brands/nestle-alimentos.png",
    400,
    400,
    100,
    1.4
  ),
  brandLogo("Nestlé Purina", "/brands/nestle-purina.png", 5000, 2834, 170, 1.4),
  brandLogo("Alpina", "/brands/alpina.png", 755, 455, 142),
  brandLogo(
    "Harinera del Valle",
    "/brands/harinera-del-valle.png",
    250,
    252,
    100
  ),
  brandLogo(
    "Pisa Farmacéutica – Electrolit",
    "/brands/electrolit.png",
    600,
    600,
    104,
    1.4
  ),
  brandLogo("Levapan", "/brands/levapan.png", 1200, 1200, 100, 1.4),
  brandLogo("Softys", "/brands/softys.png", 410, 222, 154),
  brandLogo(
    "Alimentos Polar",
    "/brands/alimentos-polar.png",
    300,
    300,
    104,
    1.25
  ),
  brandLogo("Incauca", "/brands/incauca.png", 1536, 1024, 136, 1.4),
  brandLogo("Rama", "/brands/rama.png", 260, 130, 164),
  brandLogo(
    "Corporación Diana",
    "/brands/corporacion-diana.png",
    227,
    148,
    138
  ),
  brandLogo("Alicorp", "/brands/alicorp.png", 3840, 1095, 188),
  brandLogo(
    "Unidad de Licores del Meta",
    "/brands/unidad-licores-meta.png",
    1024,
    1024,
    104
  ),
  brandLogo("Súper de Alimentos", "/brands/super-alimentos.png", 400, 201, 164),
] as const;

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
    src: "/brand/logo-horizontal.png",
    alt: "Logotipo de Distribuciones La Nieve",
    width: 438,
    height: 214,
    display: "wide",
  },
  chromeLogo: {
    // Nombre versionado: /brand/logo-white.png sirvió durante un tiempo un archivo
    // 1536×1024 con otra proporción y las cachés (navegador y optimizador de Next)
    // podían seguir entregándolo. La URL nueva garantiza el archivo 438×214 actual.
    src: "/brand/logo-white-v2.png",
    alt: "Logotipo blanco de Distribuciones La Nieve",
    width: 438,
    height: 214,
    display: "wide",
  },
  favicon: "/faviconnieve.png",
  themeColor: "#27348A",
  // Producción: definir NEXT_PUBLIC_SITE_URL en el entorno de despliegue (ver
  // docs/deployment.md). Sin esa variable, se usa el origen de desarrollo
  // local para que metadataBase, canonicals, sitemap y robots sigan siendo
  // URLs absolutas válidas sin afirmar un dominio de producción inexistente.
  siteUrl: normalizeSiteOrigin(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  // Token de Google Search Console para esta propiedad, si ya fue emitido.
  // Sin NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION definido, el meta tag de
  // verificación simplemente no se genera (no se inventa ningún valor).
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  metadata: {
    title: "Distribuciones La Nieve | Sitio corporativo",
    titleTemplate: "%s | Distribuciones La Nieve",
    description:
      "Sitio corporativo de Distribuciones La Nieve, empresa colombiana de distribución y comercio mayorista ubicada en Villavicencio, Meta.",
    category: "Distribución y comercio mayorista",
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
      src: sharedHeroImage,
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
    eyebrow: "Cobertura y operación",
    title: "Una operación nacional en cifras",
    description:
      "Cobertura territorial, capacidad instalada, volumen de operaciones y equipo humano que respaldan nuestro servicio.",
    // Fuente: assets/mapaNV.png, copiado sin alterar a
    // public/images/mapa-cobertura-la-nieve.png.
    image: {
      src: "/images/mapa-cobertura-la-nieve.png",
      alt: "Mapa de cobertura nacional de Distribuciones La Nieve con los departamentos atendidos destacados",
      width: 2404,
      height: 3684,
      treatment: "illustration",
    },
    groups: CORPORATE_STATS_GROUPS,
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
    ...CORPORATE_TECHNOLOGY,
    image: {
      src: "/images/innovacion-nieve.png",
      alt: "Fotografía conceptual sobre tecnología e innovación en Distribuciones La Nieve",
      width: 1536,
      height: 1024,
      treatment: "photo",
    },
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
    timeline: LA_NIEVE_TIMELINE,
    mission: CORPORATE_MISSION,
    vision: CORPORATE_VISION,
    values: CORPORATE_VALUES,
  },
  allies: {
    eyebrow: "Aliados comerciales",
    title: "Marcas que hacen parte de esta historia",
    description:
      "Relación de aliados suministrada para organizar la primera fase del sitio de Distribuciones La Nieve.",
    items: laNieveBrandLogos,
    logos: laNieveBrandLogos,
    imageNotice:
      "Logotipos incorporados desde los recursos locales suministrados en MarcasNV. Su publicación definitiva permanece sujeta a la autorización de uso correspondiente.",
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
    location: "Carrera 22 No. 5 B 114 bodega L1 Villavicencio, Meta.",
    email: "servicioalcliente@lanieve.co",
    phone: "320 3414212",
    mapEmbedUrl: null,
    pendingMessage:
      "Las redes sociales y la integración cartográfica se habilitarán cuando la empresa confirme sus enlaces oficiales.",
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
    pendingMessage:
      "Actualmente no se anuncian vacantes ni se reciben hojas de vida desde este sitio. El canal oficial se incorporará después de su validación.",
  },
  legal: {
    eyebrow: "Información legal",
    title: "Transparencia y atención responsable",
    description:
      "Consulta la política de tratamiento de datos suministrada para Distribuciones La Nieve y el espacio previsto para la gestión de PQRS.",
  },
  dataPolicy: {
    eyebrow: "Tratamiento de datos",
    title: "Política de tratamiento de datos personales",
    description:
      "Documento suministrado para establecer los principios, términos y condiciones del tratamiento de datos personales de Distribuciones La Nieve S.A.S.",
    applicability:
      "Esta política identifica expresamente como responsable a DISTRIBUCIONES LA NIEVE S.A.S.",
    disclaimer:
      "Contenido transcrito fielmente desde la fuente local tratamientodata.txt, sin resumir sus cláusulas.",
    documentId: "la-nieve",
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
    filing: {
      enabled: true,
      backendAvailable: false,
    },
  },
  footerDescription:
    "Empresa colombiana de distribución y comercio mayorista ubicada en Villavicencio, Meta.",
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/distribuciones-la-nieve-ltda",
    instagram: "https://www.instagram.com/distribuciones_la_nieve/",
    facebook:
      "https://www.facebook.com/people/Distribuciones-La-Nieve-SAS/100069879480762/#",
  },
  socialNetworks: ["linkedin", "instagram", "facebook"],
  // Fuente: C:\Devs\web\la-nieve-web\redesciales.txt (sección "Nieve").
  footerContact: {
    email: "servicioalcliente@lanieve.com",
    location:
      "Cra 22 N 5B-114 BG A15 Parque Comercial La Primavera Villavicencio – Meta",
  },
  developmentTeam: "Equipo TI & Desarrollo La Nieve",
} as const satisfies SiteConfig;
