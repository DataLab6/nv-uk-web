# La Nieve - V1 Nueva Web (Proof of Concept)

## Guía del Proyecto

Este documento sirve como guía de desarrollo y arquitectura para la V1 de la nueva web de **La Nieve**.

---

## Reglas de Desarrollo

1. **Nunca eliminar código existente** sin verificar dependencias.
2. **Antes de modificar un componente**, revisar sus dependencias y usos.
3. **Cada cambio debe mantener**: Accesibilidad, Responsive, Dark Mode, Performance.
4. **Antes de crear un componente nuevo**, verificar si ya existe uno reutilizable.
5. **Todas las animaciones deben usar GSAP o Motion** (Framer Motion).
6. **Nunca utilizar CSS inline.** Usar Tailwind classes o CSS modules.
7. **No romper la arquitectura.** Seguir la estructura de carpetas establecida.
8. **Siempre documentar el componente** con un bloque JSDoc.

---

## Stack Tecnológico

| Herramienta       | Versión   |
|-------------------|-----------|
| Next.js            | 15+ (App Router) |
| TypeScript         | 5+       |
| Tailwind CSS       | 4        |
| GSAP + ScrollTrigger | 3.15   |
| Framer Motion      | 12+      |
| Lenis              | 1.3+     |
| next-themes        | 0.4+     |
| Lucide React       | 1.24+    |
| Embla Carousel     | 8.6+     |

---

## Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout con providers
│   ├── page.tsx            # Página principal con todas las secciones
│   └── globals.css        # Estilos globales + CSS variables + tokens
├── components/
│   ├── Hero/               # Sección Hero (fullscreen, glow tracking)
│   ├── About/             # Quiénes Somos (sticky column)
│   ├── Brands/             # Marcas (infinite CSS marquee)
│   ├── Products/          # Categorías (glassmorphism + 3D tilt)
│   ├── WhyChooseUs/        # ¿Por qué elegirnos? (4 cards)
│   ├── Coverage/           # Cobertura (SVG Colombia map)
│   ├── Stats/              # Estadísticas (animated counters)
│   ├── Clients/            # Clientes (grid + stagger)
│   ├── CTA/                # Call to Action (glow + blur)
│   ├── Footer/             # Footer (social bounce)
│   ├── Navigation/         # Navbar (transparent→solid)
│   ├── ThemeToggle/        # Toggle dark/light
│   ├── ui/                 # Componentes UI reutilizables (shadcn)
│   └── animations/         # Providers (Lenis, Theme, ScrollProgress)
├── hooks/
│   ├── useRevealAnimation.ts   # Entrada al viewport (fadeUp/Left/Right/scale/bounce)
│   ├── useCounterAnimation.ts  # Contador animado (0→N)
│   ├── useGlowTracking.ts      # Radial gradient glow sigue el mouse
│   ├── useScrollProgress.ts    # Progreso de scroll (0→1)
│   ├── useTiltCard.ts          # 3D tilt con perspective
│   └── useParallax.ts         # Parallax scroll-synced
├── lib/
│   ├── utils.ts                    # cn() utility (clsx + tailwind-merge)
│   └── constants.ts                # Datos del sitio (stats, marcas, etc.)
└── public/
```

---

## Diseño

### Paleta de Colores

| Token       | Light              | Dark               | Uso                     |
|-------------|--------------------|--------------------|-------------------------|
| `--primary` | `hsl(217 91% 55%)` | `hsl(217 91% 60%)` | Azul corporativo        |
| `--secondary` | `hsl(25 95% 53%)` | `hsl(25 95% 58%)`  | Naranja CTA             |
| `--background` | `hsl(0 0% 100%)` | `hsl(222 47% 7%)`  | Fondo                   |
| `--foreground` | `hsl(220 13% 10%)` | `hsl(210 20% 95%)` | Texto                   |
| `--muted` | `hsl(220 14% 96%)` | `hsl(217 33% 17%)`  | Fondo sutil             |

### Principios

- Minimalista, corporativo, premium.
- Mucho espacio en blanco, bordes redondeados, sombras suaves.
- Glassmorphism solo donde aporta valor (cards, navbar, CTA).
- `prefers-reduced-motion` respetado en CSS global.

### Dark Mode

- `next-themes` con `defaultTheme="system"` y `enableSystem`.
- Auto-detección de `prefers-color-scheme`.
- Toggle button persiste la preferencia.
- `suppressHydrationWarning` en `<html>` para evitar parpadeos.

---

## Efectos Implementados

| Efecto                      | Dónde                                  | Cómo                         |
|-----------------------------|----------------------------------------|------------------------------|
| Lenis Smooth Scroll         | Global                                 | `LenisProvider`             |
| GSAP ScrollTrigger          | Todas las secciones                    | `useRevealAnimation` hook    |
| Scroll Entrance + Bounce    | Cada sección                           | `useRevealAnimation` variantes |
| Scroll Counter              | Stats                                  | `useCounterAnimation` hook  |
| Infinite CSS Marquee        | Brands                                 | CSS `@keyframes marquee`     |
| Backdrop Filter Blur        | Cards, CTA, Navbar, Stats              | `.glass` utility class       |
| Perspective + RotateX/Y     | Product cards, WhyChooseUs cards       | `useTiltCard` hook           |
| Scroll Scrubbed Progress    | Lateral derecha (desktop)              | `ScrollProgress` component   |
| Radial Gradient Glow        | Hero, CTA                              | `useGlowTracking` hook       |
| Footer Social Bounce        | Footer                                 | `useRevealAnimation` bounce   |

---

## Cómo Reemplazar Contenido

Todo el contenido editable está en `src/lib/constants.ts`:

- `STATS` - Estadísticas (valores, sufijos, labels)
- `PRODUCT_CATEGORIES` - Categorías de productos
- `WHY_CHOOSE_US` - Razones para elegir La Nieve
- `BRANDS` - Nombres de marcas para el marquee
- `CLIENTS` - Nombres de clientes
- `DEPARTMENTS_WITH_PRESENCE` - Departamentos con presencia
- `COVERAGE_CITIES` - Ciudades por departamento (para el tooltip del mapa)

**No es necesario modificar componentes para cambiar contenido.**

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # ESLint
npx prettier --write src/  # Formatear código
```

---

## Próximos Pasos (V2)

1. Reemplazar placeholders con imágenes reales (`next/image`).
2. Conectar formulario de contacto con backend.
3. Añadir más páginas (Blog, Casos de éxito, etc.).
4. Optimizar LCP con preload de imágenes del Hero.
5. Añadir sitemap.xml y robots.txt.
6. Integrar analytics.
