/**
 * Site-wide constants for La Nieve corporate website.
 * All content here can be easily replaced with real data.
 */

export const SITE_NAME = "La Nieve";
export const SITE_DESCRIPTION =
  "Distribución nacional de productos de consumo masivo en Colombia. Cobertura, confianza y logística de clase mundial.";

export const NAVIGATION_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "Nosotros", href: "#about" },
  { label: "Marcas", href: "#brands" },
  { label: "Productos", href: "#products" },
  { label: "Cobertura", href: "#coverage" },
  { label: "Clientes", href: "#clients" },
  { label: "Contacto", href: "#cta" },
] as const;

export const STATS = [
  { value: 20, suffix: "+", label: "Años de experiencia" },
  { value: 150, suffix: "+", label: "Marcas distribuidas" },
  { value: 3500, suffix: "+", label: "Clientes activos" },
  { value: 18, suffix: "", label: "Departamentos con presencia" },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    title: "Alimentos",
    description: "Productos alimenticios de consumo diario para hogares colombianos.",
    icon: "Wheat",
  },
  {
    title: "Bebidas",
    description: "Bebidas refrescantes, jugos y productos líquidos premium.",
    icon: "GlassWater",
  },
  {
    title: "Aseo",
    description: "Productos de limpieza y cuidado del hogar.",
    icon: "Sparkles",
  },
  {
    title: "Mascotas",
    description: "Alimentos y accesorios para el cuidado de tus mascotas.",
    icon: "PawPrint",
  },
  {
    title: "Institucional",
    description: "Soluciones a gran escala para empresas y organizaciones.",
    icon: "Building2",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Cobertura Nacional",
    description: "Presencia en más de 18 departamentos con red de distribución optimizada.",
    icon: "Map",
  },
  {
    title: "Logística Avanzada",
    description: "Tecnología de punta para gestión de inventario y entregas a tiempo.",
    icon: "Truck",
  },
  {
    title: "Alianzas Estratégicas",
    description: "Representamos las marcas más importantes del consumo masivo colombiano.",
    icon: "Handshake",
  },
  {
    title: "Compromiso Total",
    description: "Más de 20 años construyendo confianza con nuestros clientes y aliados.",
    icon: "Shield",
  },
] as const;

export const BRANDS = [
  "Coca-Cola",
  "Nestlé",
  "Unilever",
  "P&G",
  "Colgate",
  "Postobón",
  "Alpina",
  "Bavaria",
  "Frito-Lay",
  "McCormick",
  "La Constancia",
  "Kellogg's",
] as const;

export const CLIENTS = [
  "Éxito",
  "Carulla",
  "Olimpica",
  " Ara",
  "D1",
  "Justo&Bueno",
  "Makro",
  "PriceSmart",
  "Farmatodo",
  "Cruz Verde",
  "Colsubsidio",
  "Falabella",
] as const;

/**
 * Departments with La Nieve's presence.
 * Used for the interactive Colombia map.
 */
export const DEPARTMENTS_WITH_PRESENCE = [
  "Meta",
  "Cundinamarca",
  "Bogotá D.C.",
  "Antioquia",
  "Valle del Cauca",
  "Santander",
  "Boyacá",
  "Caldas",
  "Risaralda",
  "Quindío",
  "Tolima",
  "Huila",
  "Casanare",
  "Norte de Santander",
  "Cesar",
  "Atlántico",
  "Bolívar",
  "Magdalena",
] as const;

export const COVERAGE_CITIES: Record<string, string[]> = {
  Meta: ["Villavicencio", "Acacías", "Granada", "Puerto López"],
  Cundinamarca: ["Fusagasugá", "Girardot", "Zipaquirá", "Facatativá"],
  "Bogotá D.C.": ["Bogotá"],
  Antioquia: ["Medellín", "Envigado", "Bello", "Rionegro"],
  "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá"],
  Santander: ["Bucaramanga", "Floridablanca", "Barrancabermeja"],
  Boyacá: ["Tunja", "Duitama", "Sogamoso"],
  Caldas: ["Manizales", "La Dorada", "Chinchiná"],
  Risaralda: ["Pereira", "Dosquebradas", "La Virginia"],
  Quindío: ["Armenia", "Calarcá", "Montenegro"],
  Tolima: ["Ibagué", "Espinal", "Melgar"],
  Huila: ["Neiva", "Pitalito", "Garzón"],
  Casanare: ["Yopal", "Aguazul", "Villanueva"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona"],
  Cesar: ["Valledupar", "Aguachica", "Bosconia"],
  Atlántico: ["Barranquilla", "Soledad", "Malambo"],
  Bolívar: ["Cartagena", "Turbaco", "Magangué"],
  Magdalena: ["Santa Marta", "Ciénaga", "Fundación"],
};
