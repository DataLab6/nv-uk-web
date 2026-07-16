# Guía del monorepo corporativo

## Objetivo

Mantener dos sitios corporativos espejo —Distribuciones La Nieve y Unimarka— como aplicaciones separadas, con identidad y contenido propios, sobre una única implementación compartida.

## Principios de arquitectura

1. Las aplicaciones viven en `apps/la-nieve` y `apps/unimarka`.
2. Los componentes, hooks, estilos y plantillas reutilizables viven en `packages/site-kit`.
3. Cada app conserva sus propios assets, metadata y `site.config.ts`; los recursos realmente comunes pueden vivir una sola vez en `packages/site-kit/src/assets`.
4. Las rutas pueden duplicar solo el archivo de entrada; la interfaz de página no se duplica.
5. Una nueva ruta corporativa debe crearse en las dos apps y su plantilla debe añadirse una sola vez al paquete compartido.
6. Ningún componente compartido puede importar directamente la configuración de una marca.

## Reglas de contenido

1. Los archivos locales del proyecto son la fuente principal.
2. El sitio público anterior de La Nieve no se usa como fuente visual ni textual.
3. No se publican años de experiencia, cifras, cobertura, clientes, aliados, marcas, sedes o canales no verificados.
4. Las cifras, la cobertura y los pilares demo solicitados para construir esta fase deben identificarse explícitamente como ejemplos pendientes de validación.
5. La misión, la visión y los cinco valores suministrados se conservan literalmente en `packages/site-kit/src/config/corporateContent.ts`; no deben duplicarse ni presentarse como contenido demo.
6. Los logotipos suministrados se configuran por marca: `MarcasNV` solo alimenta La Nieve y `MarcasUK` solo alimenta Unimarka. Su publicación definitiva requiere autorización.
7. Los cambios de contenido propio se realizan en el `site.config.ts` de la marca correspondiente; los contenidos verdaderamente compartidos se centralizan en `packages/site-kit/src/config`.
8. El contenido legal provisional no sustituye una revisión jurídica ni debe presentarse como política definitiva.

## Reglas de desarrollo

1. Leer `AGENTS.md` y la documentación local de la versión instalada de Next antes de modificar convenciones del framework.
2. Mantener TypeScript estricto, App Router y Server Components como opción predeterminada.
3. Aislar en Client Components solo navegación interactiva, tema, Lenis y animaciones.
4. Mantener accesibilidad, responsive, dark mode, performance y `prefers-reduced-motion`.
5. Usar `next/image` y `next/link` para imágenes y navegación internas.
6. Todas las animaciones deben usar GSAP o CSS; cada efecto debe limpiar sus listeners y recursos al desmontarse.
7. Evitar estilos inline de presentación. Se permiten valores dinámicos imprescindibles para transformaciones o progreso interactivo.
8. Documentar componentes y hooks exportados con JSDoc.
9. No eliminar ni alterar assets fuente dentro de `assets/`; las apps usan copias web en su propio `public/`. Los recursos compartidos generados o migrados se gestionan dentro de `packages/site-kit/src/assets/`.

## Identidad visual

Los tokens semánticos (`primary`, `accent`, `background`, etc.) se definen por clase de marca:

- `.brand-la-nieve`
- `.brand-unimarka`

Los HEX canónicos provienen de `assets/colores.txt` y se contrastaron con los PDF. Las inconsistencias encontradas en los manuales están comentadas en `packages/site-kit/src/styles/globals.css` y documentadas en el registro de fase.

Los componentes compartidos deben consumir tokens semánticos, no colores fijos de una marca. La Nieve conserva su paleta y usa un footer grafito. Unimarka conserva la paleta oficial como referencia, prioriza los rojos en acciones, acentos, indicadores y estados interactivos, y utiliza un footer azul corporativo.

La navegación se muestra transparente al principio y usa el color principal correspondiente después del scroll. Su tratamiento compartido incorpora desenfoque, borde y sombra sutiles. Los logotipos se muestran directamente, sin cápsula ni fondo, con proporción contenida y una interacción discreta de brillo y elevación.

## Navegación y páginas

La navegación compartida usa rutas reales, no anclas, salvo los redirects heredados que apuntan a secciones concretas del Inicio. El estado activo se deriva de `usePathname` y cada página interna genera metadata propia.

```text
/                            Inicio
/somos                       Misión, visión, valores y pilares
/aliados-comerciales         Aliados con logotipos configurados por marca
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
2. `Brands`: carrusel continuo con los 16 logotipos locales de La Nieve o los 12 de Unimarka, según configuración. La animación se pausa con hover, continúa desde el mismo punto y respeta `prefers-reduced-motion`.
3. `Stats`: cifras de ejemplo, acompañadas de aviso de validación pendiente.
4. `CoverageMap`: mapa interactivo y accesible; los departamentos actuales son demo.
5. `CustomerChannels`: Tiendas; Minimercados y Supermercados; Mayoristas; Institucional; Bares y Licoreras; Otros.
6. `Innovation`: espacio para tecnología e innovación continua con imagen propia por marca.

El mapa y los canales forman parte de Inicio mediante los identificadores `#cobertura` y `#canales` para recibir enlaces heredados.

## Páginas compartidas

- `Somos`: misión, visión y cinco valores literales compartidos, seguidos de pilares configurables por marca. `Nuestros valores` usa un componente editorial compartido, sin recortes de texto.
- `Aliados comerciales`: nombres y logotipos configurables por marca. La Nieve tiene 16 imágenes; Unimarka, 12, con marcadores únicamente para Grupo Familia e Indulacteos por falta de un archivo identificable.
- `Cultura`: contenido de valor para clientes, buenas prácticas y recomendaciones.
- `Contacto`: canales corporativos, separados de cualquier proceso laboral.
- `Trabaja con nosotros`: página autónoma para vacantes o recepción futura de perfiles.
- `Legal`, `Tratamiento de datos` y `PQRS`: rutas independientes, con contenido de muestra sujeto a revisión jurídica y operativa.

## Assets compartidos

El hero de las dos aplicaciones importa una única imagen física:

```text
packages/site-kit/src/assets/hero/together-store.png
```

Las cinco fotografías conceptuales de los valores están optimizadas como WebP y comparten una dirección visual corporativa:

```text
packages/site-kit/src/assets/values/integridad.webp
packages/site-kit/src/assets/values/compromiso-social.webp
packages/site-kit/src/assets/values/lealtad.webp
packages/site-kit/src/assets/values/respeto.webp
packages/site-kit/src/assets/values/emprendimiento.webp
```

No contienen texto incrustado, logotipos inventados ni marcas de agua, y sirven a las dos identidades mediante el mismo componente.

## Assets propios de cada aplicación

Las fotografías generadas para Somos, Stats, Innovación y Cultura se almacenan dentro de cada app:

```text
apps/<marca>/public/images/
```

Los nombres previstos son `somos-<marca>.png`, `stats-<marca>.png`, `innovacion-<marca>.png` y `cultura-<marca>.png`. Son recursos provisionales locales: no deben confundirse con fotografías documentales de personal, sedes, clientes o procesos reales.

Los logos normalizados de aliados se sirven desde `apps/<marca>/public/brands/`. No se deben derivar etiquetas visibles desde nombres de archivo: el nombre accesible y comercial procede de la configuración de marca. Cada imagen debe usar ajuste contenido para conservar su proporción.

La Nieve configura `apps/la-nieve/public/faviconnieve.png` únicamente en su metadata; Unimarka no debe heredar ese favicon.

## Redes sociales

`socialLinks` centraliza LinkedIn, Instagram y Facebook en cada `site.config.ts`. Solo se admite una URL oficial y verificable. Cuando el valor es `null`, como ocurre actualmente en las dos marcas, el footer conserva el botón accesible en estado deshabilitado y no crea un enlace falso.

## Verificación obligatoria

Antes de entregar un cambio se deben ejecutar, sin asumir resultados:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Además se debe revisar manualmente la navegación por teclado, el submenú Legal, el cambio cromático de la barra, el mapa, los redirects y ambas aplicaciones en `3000` y `3001`.

La matriz responsive mínima es `320`, `375`, `768`, `1024` y `1440` px. También se deben verificar el desbordamiento horizontal, el menú móvil, la proporción de logos, el favicon específico, el hero compartido y la pausa/reanudación del carrusel. El estado comprobado de la fase se registra en [PROCESO_FASE_1.md](./PROCESO_FASE_1.md); una advertencia de consola o cualquier otra limitación debe documentarse y no darse por superada.
