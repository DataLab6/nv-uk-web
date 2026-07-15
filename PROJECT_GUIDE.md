# Guía del monorepo corporativo

## Objetivo

Mantener dos sitios corporativos espejo —Distribuciones La Nieve y Unimarka— como aplicaciones separadas, con identidad y contenido propios, sobre una única implementación compartida.

## Principios de arquitectura

1. Las aplicaciones viven en `apps/la-nieve` y `apps/unimarka`.
2. Los componentes, hooks, estilos y plantillas reutilizables viven en `packages/site-kit`.
3. Cada app conserva sus propios assets, metadata y `site.config.ts`.
4. Las rutas pueden duplicar solo el archivo de entrada; la interfaz de página no se duplica.
5. Una nueva ruta corporativa debe crearse en las dos apps y su plantilla debe añadirse una sola vez al paquete compartido.
6. Ningún componente compartido puede importar directamente la configuración de una marca.

## Reglas de contenido

1. Los archivos locales del proyecto son la fuente principal.
2. El sitio público anterior de La Nieve no se usa como fuente visual ni textual.
3. No se publican años de experiencia, cifras, cobertura, clientes, aliados, marcas, sedes o canales no verificados.
4. Las cifras, misión, visión y cobertura demo solicitadas para construir esta fase deben identificarse explícitamente como ejemplos pendientes de validación.
5. Los nombres suministrados de aliados pueden usarse para mapear la interfaz, pero sus imágenes o logotipos requieren assets autorizados antes de publicación.
6. Los cambios de contenido se realizan en el `site.config.ts` de la marca correspondiente.
7. El contenido legal provisional no sustituye una revisión jurídica ni debe presentarse como política definitiva.

## Reglas de desarrollo

1. Leer `AGENTS.md` y la documentación local de la versión instalada de Next antes de modificar convenciones del framework.
2. Mantener TypeScript estricto, App Router y Server Components como opción predeterminada.
3. Aislar en Client Components solo navegación interactiva, tema, Lenis y animaciones.
4. Mantener accesibilidad, responsive, dark mode, performance y `prefers-reduced-motion`.
5. Usar `next/image` y `next/link` para imágenes y navegación internas.
6. Todas las animaciones deben usar GSAP o CSS; cada efecto debe limpiar sus listeners y recursos al desmontarse.
7. Evitar estilos inline de presentación. Se permiten valores dinámicos imprescindibles para transformaciones o progreso interactivo.
8. Documentar componentes y hooks exportados con JSDoc.
9. No eliminar ni alterar assets fuente dentro de `assets/`; las apps usan copias web en su propio `public/`.

## Identidad visual

Los tokens semánticos (`primary`, `accent`, `background`, etc.) se definen por clase de marca:

- `.brand-la-nieve`
- `.brand-unimarka`

Los HEX canónicos provienen de `assets/colores.txt` y se contrastaron con los PDF. Las inconsistencias encontradas en los manuales están comentadas en `packages/site-kit/src/styles/globals.css` y documentadas en el registro de fase.

Los componentes compartidos deben consumir tokens semánticos, no colores fijos de una marca. La navegación se muestra transparente al principio de la página y usa el color principal correspondiente después del scroll.

## Navegación y páginas

La navegación compartida usa rutas reales, no anclas, salvo los redirects heredados que apuntan a secciones concretas del Inicio. El estado activo se deriva de `usePathname` y cada página interna genera metadata propia.

```text
/                            Inicio
/somos                       Misión, visión, valores y pilares
/aliados-comerciales         Aliados con espacios de imagen provisionales
/cultura                     Tips, buenas prácticas y contenido de apoyo
/contacto                    Contacto
/trabaja-con-nosotros        Página independiente de oportunidades
/legal                       Entrada al área legal
/legal/tratamiento-de-datos  Tratamiento de datos
/legal/pqrs                  Peticiones, quejas, reclamos y sugerencias
```

`Legal` tiene un submenú unido visualmente a la barra. En escritorio debe abrir con hover y con foco de teclado, sin exigir un dispositivo apuntador; en móvil sus dos opciones deben aparecer dentro del menú expandible.

### Compatibilidad con rutas anteriores

```text
/nosotros  → /somos
/marcas    → /aliados-comerciales
/productos → /
/cobertura → /#cobertura
/clientes  → /#canales
```

Las redirecciones se mantienen como entradas delgadas en ambas aplicaciones. No deben volver a convertirse en páginas con contenido duplicado.

## Inicio compartido

La portada usa una única plantilla con configuración por marca y conserva este orden:

1. `Hero`: evolución interna del bloque `Together`; mantiene su composición aprobada.
2. `Brands`: carrusel o listado de aliados con placeholders visuales hasta recibir imágenes autorizadas.
3. `Stats`: cifras de ejemplo, acompañadas de aviso de validación pendiente.
4. `CoverageMap`: mapa interactivo y accesible; los departamentos actuales son demo.
5. `CustomerChannels`: Tiendas; Minimercados y Supermercados; Mayoristas; Institucional; Bares y Licoreras; Otros.
6. `Innovation`: espacio para tecnología e innovación continua con imagen propia por marca.

El mapa y los canales forman parte de Inicio mediante los identificadores `#cobertura` y `#canales` para recibir enlaces heredados.

## Páginas compartidas

- `Somos`: misión, visión, valores y pilares configurables por marca.
- `Aliados comerciales`: nombres configurables y un espacio reservado para cada futura imagen; los iconos o iniciales son provisionales.
- `Cultura`: contenido de valor para clientes, buenas prácticas y recomendaciones.
- `Contacto`: canales corporativos, separados de cualquier proceso laboral.
- `Trabaja con nosotros`: página autónoma para vacantes o recepción futura de perfiles.
- `Legal`, `Tratamiento de datos` y `PQRS`: rutas independientes, con contenido de muestra sujeto a revisión jurídica y operativa.

## Assets generados

Las fotografías generadas para Somos, Stats, Innovación y Cultura se almacenan dentro de cada app:

```text
apps/<marca>/public/images/
```

Los nombres previstos son `somos-<marca>.png`, `stats-<marca>.png`, `innovacion-<marca>.png` y `cultura-<marca>.png`. Son recursos provisionales locales: no deben confundirse con fotografías documentales de personal, sedes, clientes o procesos reales.

## Verificación obligatoria

Antes de entregar un cambio se deben ejecutar, sin asumir resultados:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Además se debe revisar manualmente la navegación por teclado, el submenú Legal, el cambio cromático de la barra, el mapa, los redirects y ambas aplicaciones en `3000` y `3001`.
