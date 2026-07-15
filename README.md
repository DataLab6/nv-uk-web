# Sitios corporativos: La Nieve + Unimarka

Monorepo de dos aplicaciones Next.js independientes que comparten estructura, componentes, estilos y comportamiento sin duplicar la implementación.

## Aplicaciones

| Aplicación              | Workspace               | Desarrollo              | Producción local        |
| ----------------------- | ----------------------- | ----------------------- | ----------------------- |
| Distribuciones La Nieve | `@corporativo/la-nieve` | `http://localhost:3000` | `http://localhost:3000` |
| Unimarka                | `@corporativo/unimarka` | `http://localhost:3001` | `http://localhost:3001` |

## Inicio rápido

Desde la raíz del repositorio:

```bash
npm install
npm run dev
```

`npm run dev` levanta las dos aplicaciones simultáneamente. Los puertos acordados son `3000` para La Nieve y `3001` para Unimarka; no deben reasignarse automáticamente si alguno está ocupado.

También se puede iniciar cada app de forma independiente:

```bash
npm run dev:la-nieve
npm run dev:unimarka
```

## Comandos

```bash
npm run dev               # ambas apps: 3000 y 3001
npm run build             # build de producción de ambas apps
npm run build:la-nieve    # solo La Nieve
npm run build:unimarka    # solo Unimarka
npm run lint              # ESLint en apps, paquete y scripts
npm run typecheck         # TypeScript en los tres workspaces
npm run format:check      # comprueba formato
```

## Arquitectura

```text
apps/
  la-nieve/
    public/               # logo e imágenes exclusivos
    src/app/              # layout y rutas de La Nieve
    src/site.config.ts    # identidad, metadata y textos
  unimarka/
    public/               # logo e imágenes exclusivos
    src/app/              # layout y rutas de Unimarka
    src/site.config.ts    # identidad, metadata y textos
packages/
  site-kit/
    src/components/       # navegación, footer y UI compartida
    src/hooks/            # GSAP, Lenis, glow, tilt y scroll
    src/pages/            # plantillas de cada página
    src/styles/           # Tailwind y tokens de ambas marcas
scripts/
  dev.mjs                 # orquestador de los dos servidores
assets/                   # fuentes de marca y documentos originales
```

La implementación compartida vive en `@corporativo/site-kit`; las rutas de cada app son entradas delgadas que inyectan su propia configuración.

## Navegación y rutas

Cada aplicación expone la misma estructura de páginas:

| Ruta                          | Contenido                                  |
| ----------------------------- | ------------------------------------------ |
| `/`                           | Inicio                                     |
| `/somos`                      | Somos Nieve / Somos Unimarka               |
| `/aliados-comerciales`        | Aliados comerciales                        |
| `/cultura`                    | Cultura Nieve / Cultura Unimarka           |
| `/contacto`                   | Contacto                                   |
| `/trabaja-con-nosotros`       | Trabaja con nosotros                       |
| `/legal`                      | Entrada al contenido legal                 |
| `/legal/tratamiento-de-datos` | Tratamiento de datos                       |
| `/legal/pqrs`                 | Peticiones, quejas, reclamos y sugerencias |

La barra de navegación es transparente al inicio y toma el color principal de la marca al hacer scroll. `Legal` despliega un menú unido a la barra mediante hover o foco, y sus opciones también son accesibles desde la navegación móvil.

Las rutas anteriores se conservan como redirecciones para no romper enlaces existentes:

```text
/nosotros  → /somos
/marcas    → /aliados-comerciales
/productos → /
/cobertura → /#cobertura
/clientes  → /#canales
```

## Composición de Inicio

La portada compartida se organiza en este orden:

1. Hero, basado en el bloque `Together` suministrado.
2. Aliados (`Brands`), con espacios preparados para imágenes autorizadas.
3. Estadísticas de ejemplo.
4. Mapa interactivo de cobertura con departamentos demo.
5. Canales de clientes.
6. Tecnología e innovación continua.

Las cifras, misión, visión y departamentos incluidos como demostración son contenido de ejemplo solicitado para construir la interfaz. Deben permanecer identificados como tales y ser sustituidos o validados antes de publicar el sitio.

## Imágenes

Las imágenes corporativas generadas para esta iteración se integran localmente en el `public/images` de cada aplicación, sin depender de una URL externa:

```text
apps/la-nieve/public/images/somos-nieve.png
apps/la-nieve/public/images/stats-nieve.png
apps/la-nieve/public/images/innovacion-nieve.png
apps/la-nieve/public/images/cultura-nieve.png
apps/unimarka/public/images/somos-unimarka.png
apps/unimarka/public/images/stats-unimarka.png
apps/unimarka/public/images/innovacion-unimarka.png
apps/unimarka/public/images/cultura-unimarka.png
```

Estas piezas son provisionales y no incorporan logotipos, empaques identificables ni afirmaciones corporativas.

## Edición de contenido

- La Nieve: `apps/la-nieve/src/site.config.ts`
- Unimarka: `apps/unimarka/src/site.config.ts`
- Tokens visuales: `packages/site-kit/src/styles/globals.css`
- Navegación compartida: `packages/site-kit/src/config/navigation.ts`

No se deben publicar cifras, cobertura, contactos, logos de aliados o afirmaciones corporativas sin validación y autorización. El registro de decisiones y pendientes está en [PROCESO_FASE_1.md](./PROCESO_FASE_1.md).
