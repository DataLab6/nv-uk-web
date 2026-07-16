# Estado del proyecto

## Objetivo general

El repositorio contiene dos sitios corporativos espejo dentro de un monorepo Next.js:

- La Nieve: `apps/la-nieve`, puerto 3000.
- Unimarka: `apps/unimarka`, puerto 3001.

La composición de páginas, componentes, hooks, tipos y estilos vive principalmente en `packages/site-kit`. Las diferencias de identidad, copy, logos, aliados, estadísticas, contacto y metadata se centralizan en `apps/la-nieve/src/site.config.ts` y `apps/unimarka/src/site.config.ts`. Los tokens de marca están en `packages/site-kit/src/styles/globals.css`: La Nieve conserva azul y Unimarka prioriza rojo.

## Cambios completados en esta sesión

### 1. Indicadores

- Estado: terminado.
- `packages/site-kit/src/components/Stats.tsx` conserva las cifras configuradas y la animación de conteo.
- Se retiraron introducción, imagen, figcaption, disclaimer visible, tarjetas, fondos individuales y sombras.
- Los números se presentan sobre el fondo con divisores, numeración limpia y jerarquía editorial en ambas marcas.

### 2. Carrusel de logos

- Estado: terminado.
- `Brands.tsx` y `AllyLogo.tsx` muestran logos directamente sobre el fondo en tema claro.
- En oscuro se utiliza una superficie uniforme y discreta para proteger el contraste.
- Cada logo tiene un `displayWidth` configurado según proporción; todos conservan `object-fit: contain`.

### 3. Retirar “Pausar aliados”

- Estado: terminado.
- Se eliminó el botón, icono, estado React y espacio reservado.
- La pausa por hover permanece en `globals.css` mediante `animation-play-state: paused`; al retirar el cursor continúa la animación existente.
- `prefers-reduced-motion` sigue desactivando el movimiento continuo.

### 4. Logos blancos en navbar y footer

- Estado: terminado.
- Se copiaron sin alterar los originales:
  - La Nieve: `assets/Lanievewhite.png` → `apps/la-nieve/public/brand/logo-white.png`.
  - Unimarka: `assets/logounimarkawhite.png` → `apps/unimarka/public/brand/logo-white.png`.
- Los hashes de cada copia coinciden con su fuente.
- `Navigation.tsx` superpone logo normal y blanco dentro de la misma caja y transiciona opacidad según `isSolid`, evitando saltos de tamaño.
- `Footer.tsx` usa directamente `site.chromeLogo`, sin recuadro blanco.

### 5. Flip cards de valores

- Estado: terminado.
- `ValuesSection.tsx` implementa perspectiva, `backface-visibility` y transición premium.
- Frente: superficie de color primario de la marca, título y llamada “Conocer este valor”.
- Reverso: imagen, título y descripción literal completa.
- Hover se limita a dispositivos con hover real. Toque, Enter y espacio usan el botón nativo y estado React.
- En reducción de movimiento se muestra una variante estática completa, sin giro agresivo.
- Escritorio usa tres columnas equilibradas; tableta dos; móvil una.

### 6. Valores y pilares

- Estado: terminado.
- El título visible ahora es `Nuestros valores y pilares corporativos` y conserva `id="valores"`.
- `AboutPage.tsx` ya no renderiza la sección independiente de pilares.
- Se eliminaron los pilares demostrativos y su disclaimer de ambos `site.config.ts` y del tipo `SiteConfig`.
- Solo permanecen Integridad, Compromiso Social, Lealtad, Respeto y Emprendimiento.

### 7. Aliados comerciales

- Estado: terminado.
- `AlliesPage.tsx` retiró cards blancas, bordes y sombras individuales en claro; usa una composición con divisores editoriales.
- La configuración individual de tamaño se comparte entre página y carrusel.
- Unimarka utiliza las 13 marcas suministradas, incluyendo los nuevos `Grupo Familia`, `Indulacteos` y el PQP actualizado. Essity no se presenta como sustituto.
- La Nieve conserva sus 16 logos de `MarcasNV`.

### 8. Contacto

- Estado: terminado.
- `ContactPage.tsx` usa dos columnas en escritorio y apilado en móvil.
- Incluye formulario con nombre, correo, número telefónico, asunto y mensaje. El submit está deshabilitado porque no existe endpoint.
- La columna derecha incluye canales directos, redes en rectángulos con colores reconocibles y mapa preparado.
- Solo La Nieve muestra datos verificados encontrados en `tratamientodata.txt`:
  - `servicioalcliente@lanieve.co`
  - `320 3414212`
  - `Carrera 22 No. 5 B 114 bodega L1 Villavicencio, Meta.`
- `mapEmbedUrl` queda centralizado en ambas marcas con valor `null`; no se inventó iframe, URL ni coordenadas.
- Ninguna red tiene URL oficial configurada; sus superficies aparecen deshabilitadas sin `href="#"`.

### 9. Trabaja con nosotros

- Estado: terminado.
- `CareersPage.tsx` conserva la imagen existente y elimina texto promocional y cards de beneficios.
- Formulario accesible con nombre, correo, teléfono, ciudad, cargo/área, perfil, archivo PDF/DOC/DOCX y aceptación de tratamiento de datos.
- La acción está deshabilitada y no afirma carga ni envío. Los detalles técnicos aparecen solo en desarrollo.
- No existe endpoint ni almacenamiento para hojas de vida.

### 10. Tecnología e innovación

- Estado: terminado.
- Fuente: `C:\Devs\web\la-nieve-web\tecnoinfo.txt`.
- Ideas identificadas: transformación digital orientada a procesos y valor; proyectos estratégicos; continuidad y protección de infraestructura/operaciones; ciencia de datos, IA y pensamiento disruptivo.
- Contenido centralizado en `packages/site-kit/src/config/technologyContent.ts` y consumido por ambos `site.config.ts` y `Innovation.tsx`.
- Texto final principal:

  > Orientamos la transformación digital a mejorar nuestros procesos internos y generar valor para clientes, proveedores y aliados estratégicos. Desarrollamos proyectos que optimizan inversiones, recursos y operación, respaldados por infraestructura enfocada en la continuidad y protección del negocio.

- El texto fue sintetizado y reescrito; no se añadieron capacidades ajenas a la fuente.

### 11. Tratamiento de datos

- Estado: terminado con limitación de fuente para Unimarka.
- Fuente exacta: `C:\Devs\web\la-nieve-web\tratamientodata.txt`.
- La fuente contiene 11 secciones y nombra exclusivamente a DISTRIBUCIONES LA NIEVE S.A.S.
- `packages/site-kit/src/config/dataPolicyContent.ts` conserva literalmente los 26.890 caracteres del documento, normalizando únicamente finales de línea y agrupando títulos/secciones.
- `DataPolicyPage.tsx` incorpora tabla de contenido, navegación por anclas, jerarquía editorial y ancho de lectura.
- La Nieve muestra el documento completo. Unimarka muestra un aviso explícito de no aplicabilidad; no se le atribuyó la política de otra empresa.

### 12. Línea de tiempo

- Estado: terminado.
- Fuente real encontrada: `C:\Devs\web\la-nieve-web\lineatiempo.txt` (el archivo se llama `lineatiempo`, no `lineadetiempo`).
- La Nieve: Fundación `90s`; texto conservado desde la fuente.
- Unimarka: Fundación `2014`; texto conservado desde la fuente.
- Actualidad usa el texto de cada marca incluido en el TXT.
- `CompanyTimeline.tsx` calcula el año corriente con `new Date().getFullYear()` y permite selección por clic, toque y teclado.
- `AboutPage.tsx` la renderiza entre `PageIntro` y misión/visión.

### 13. Imágenes para tipos de negocio

- Estado: terminado.
- El inventario local no contenía una serie adecuada; los personajes existentes tenían un estilo caricaturesco incompatible.
- Se generó una serie 3D editorial corporativa con la herramienta integrada de generación visual, sin texto intencional, logos ni marcas, y se optimizó a WebP 640 × 640.
- Recursos compartidos:
  - `packages/site-kit/src/assets/channels/tiendas.webp`: Tiendas.
  - `packages/site-kit/src/assets/channels/minimercados-supermercados.webp`: Minimercados y Supermercados.
  - `packages/site-kit/src/assets/channels/mayoristas.webp`: Mayoristas.
  - `packages/site-kit/src/assets/channels/institucional.webp`: Institucional.
  - `packages/site-kit/src/assets/channels/bares-licoreras.webp`: Bares y Licoreras.
  - `packages/site-kit/src/assets/channels/otros.webp`: Otros.
- `channelAssets.ts` relaciona cada categoría con su imagen y `CustomerChannels.tsx` las presenta como miniaturas editoriales, no banners.
- Dirección del prompt: escenas centradas, fondo editorial neutro, 3D semirrealista maduro, blanco/grafito con acentos azul marino y rojo, sin texto, logos, marcas de agua ni caricatura infantil.

## Fuentes de información

| Fuente                                                  | Contenido y uso                                                                                                                                                       |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C:\Devs\web\la-nieve-web\tecnoinfo.txt`                | Transformación digital, proyectos, infraestructura/operaciones, ciencia de datos e IA. Se sintetizó en `technologyContent.ts`; texto final registrado en el punto 10. |
| `C:\Devs\web\la-nieve-web\tratamientodata.txt`          | Política de La Nieve en 11 secciones. Se transcribió literalmente en `dataPolicyContent.ts`; solo se ajustó estructura visual.                                        |
| `C:\Devs\web\la-nieve-web\lineatiempo.txt`              | Fundación `90s` para La Nieve, `2014` para Unimarka y textos de actualidad. Se implementó en `timelineContent.ts`; el año actual se calcula en `CompanyTimeline.tsx`. |
| `C:\Devs\web\la-nieve-web\assets\Lanievewhite.png`      | Copiado sin modificación a `apps/la-nieve/public/brand/logo-white.png`; navbar con scroll y footer.                                                                   |
| `C:\Devs\web\la-nieve-web\assets\logounimarkawhite.png` | Copiado sin modificación a `apps/unimarka/public/brand/logo-white.png`; navbar con scroll y footer.                                                                   |

Imágenes de valores, creadas en la sesión anterior y reutilizadas:

- `packages/site-kit/src/assets/values/integridad.webp` — Integridad.
- `packages/site-kit/src/assets/values/compromiso-social.webp` — Compromiso Social.
- `packages/site-kit/src/assets/values/lealtad.webp` — Lealtad.
- `packages/site-kit/src/assets/values/respeto.webp` — Respeto.
- `packages/site-kit/src/assets/values/emprendimiento.webp` — Emprendimiento.

## Configuración por marca

- Configuración La Nieve: `apps/la-nieve/src/site.config.ts`.
- Configuración Unimarka: `apps/unimarka/src/site.config.ts`.
- Logos normales: `apps/*/public/brand/logo-horizontal.png`, propiedad `site.logo`.
- Logos blancos (propiedad `site.chromeLogo`): La Nieve `apps/la-nieve/public/brand/logo-white-v2.png` (nombre versionado por cache-busting); Unimarka `apps/unimarka/public/brand/logo-white.png`.
- Colores: `packages/site-kit/src/styles/globals.css`.
- Contacto, teléfonos, redes, dirección y `mapEmbedUrl`: bloque `contact` y `socialLinks` de cada `site.config.ts`.
- Aliados y tamaños individuales: arrays `laNieveBrandLogos` / `unimarkaBrandLogos` y bloque `allies`.
- Estadísticas: bloque `stats` de cada `site.config.ts`.
- Misión, visión y valores literales: `packages/site-kit/src/config/corporateContent.ts`, referenciados por ambos configs.
- Línea de tiempo: `timelineContent.ts`, referenciada en `site.about.timeline`.
- Tecnología: `technologyContent.ts`, referenciada en `site.innovation`.
- Documento legal: `dataPolicyContent.ts`; asignación por marca mediante `site.dataPolicy.documentId`.

## Componentes principales

- Navbar: `packages/site-kit/src/components/Navigation.tsx` — scroll, menú responsive y transición de logos.
- Logo: `packages/site-kit/src/components/BrandLogo.tsx` — proporción y caja estable.
- Footer: `packages/site-kit/src/components/Footer.tsx` — logo blanco, navegación, contacto y redes.
- Indicadores: `packages/site-kit/src/components/Stats.tsx` — conteo editorial.
- Carrusel: `packages/site-kit/src/components/Brands.tsx` — marquee y pausa CSS por hover.
- Logo de aliado: `packages/site-kit/src/components/AllyLogo.tsx` — `contain` y tamaño individual.
- Aliados: `packages/site-kit/src/pages/AlliesPage.tsx` — galería editorial.
- Valores: `packages/site-kit/src/components/ValuesSection.tsx` — flip cards accesibles.
- Línea de tiempo: `packages/site-kit/src/components/CompanyTimeline.tsx` — dos hitos seleccionables.
- Contacto: `packages/site-kit/src/pages/ContactPage.tsx`.
- Trabaja con nosotros: `packages/site-kit/src/pages/CareersPage.tsx`.
- Tecnología: `packages/site-kit/src/components/Innovation.tsx`.
- Tratamiento de datos: `packages/site-kit/src/pages/DataPolicyPage.tsx`.
- Soluciones por negocio: `packages/site-kit/src/components/CustomerChannels.tsx` y `config/channelAssets.ts`.

## Pendientes de información

- Teléfono, correo y dirección oficiales de Unimarka.
- URL oficial de LinkedIn, Instagram y Facebook de ambas marcas.
- Coordenadas, URL de Google Maps o iframe oficial de ambas marcas.
- Endpoint del formulario de contacto.
- Endpoint del formulario laboral.
- Sistema de carga y almacenamiento de hojas de vida.
- Política de tratamiento de datos propia de Unimarka.

No se inventó ninguno de estos datos. La Nieve sí tiene teléfono, correo y dirección respaldados por `tratamientodata.txt`.

## Cómo continuar

1. Abrir primero `docs/progress.md` y después revisar `git status`.
2. No reconstruir el monorepo ni duplicar componentes por marca.
3. Ejecutar ambos sitios con `npm run dev`; el script usa 3000 para La Nieve y 3001 para Unimarka.
4. Ejecutar una marca individual con `npm run dev:la-nieve` o `npm run dev:unimarka`.
5. Los aliados de La Nieve están en `apps/la-nieve/public/brands`; los de Unimarka en `apps/unimarka/public/brands`.
6. Conservar azul de La Nieve, rojo de Unimarka, footers actuales y tokens centralizados.
7. No habilitar formularios hasta contar con endpoints reales.
8. No atribuir `tratamientodata.txt` a Unimarka; se necesita su documento propio.

## Validación de cierre

- `npm run build`: correcto en una única ejecución.
- La Nieve: compilación y TypeScript correctos; 16 páginas estáticas generadas.
- Unimarka: compilación y TypeScript correctos; 16 páginas estáticas generadas.
- `git diff --check`: sin errores de whitespace; solo avisos informativos LF/CRLF de Git en Windows.
- No se ejecutaron lint, typecheck ni batería responsive adicionales, siguiendo la restricción de validación mínima de esta sesión.

## Último punto exacto alcanzado

- Último requerimiento completamente terminado: punto 13, imágenes para tipos de negocio.
- Requerimiento en desarrollo: ninguno; los 13 puntos están implementados.
- Archivo abierto o modificado: `docs/progress.md`.
- Próximo paso recomendado: obtener los datos oficiales pendientes y conectar los formularios únicamente cuando existan endpoints reales.

## Sesión de corrección — 8 requerimientos puntuales

Fuente principal: instrucción del usuario del 2026-07-16. Todos los puntos parten del estado descrito arriba y no reconstruyen el monorepo ni los componentes compartidos.

### 1. Logo blanco del navbar de La Nieve

- Estado: terminado (ver también la sesión de simplificación al final de este documento).
- Archivos: `packages/site-kit/src/config/types.ts`, `packages/site-kit/src/components/BrandLogo.tsx`, `apps/la-nieve/src/site.config.ts`.
- Causa raíz original: el archivo blanco (`logo-white.png`, 1536×1024, proporción 1.5) se declaraba con `display: "cropped-square"`, que aplica `object-cover object-top`. Al no compartir proporción con el logo normal (438×214, proporción ≈2.05) dentro de la caja fija de navbar, el resultado se veía más grande, recortado y desalineado.
- Solución original (ya retirada): se había agregado un valor `"contain"` y un `scale?: number` a `SiteLogoConfig` para compensar la diferencia de proporción. En la sesión siguiente el usuario reemplazó el archivo fuente por una versión con las mismas dimensiones exactas del logo normal, por lo que esa compensación quedó obsoleta y se eliminó (ver sección final).
- Unimarka no se tocó en ningún momento: su `chromeLogo` sigue en `display: "wide"` porque su archivo blanco comparte exactamente la proporción del logo normal (543×209 en ambos).

### 2. “Trabaja con nosotros” sin desplazamiento

- Estado: terminado.
- Archivo: `packages/site-kit/src/pages/CareersPage.tsx`.
- Causa del movimiento: la columna izquierda (imagen + cuadro “Canal en preparación”) tenía las clases `lg:sticky lg:top-28`, que la fijaban durante el scroll en escritorio. Se eliminaron esas dos clases; la columna quedó en flujo normal (`space-y-6`), igual en escritorio, tableta y móvil.
- No se usó `position: fixed`, transform ligado a scroll, parallax ni observers; no existían en el componente.

### 3. Valores y pilares — responsive

- Estado: terminado.
- Archivo: `packages/site-kit/src/components/ValuesSection.tsx` (reescrito).
- Breakpoints utilizados: `sm` (640px) activa la fila de tarjetas flip y desactiva el acordeón; `md` (768px) pasa a 3 columnas por fila (`md:w-[calc(33.333%-0.667rem)]`); `xl` (1280px) pasa a 5 columnas en una sola fila (`xl:w-[calc(20%-1rem)]`). Entre `sm` y `xl` el layout usa `flex flex-wrap justify-center`, por lo que la fila incompleta (por ejemplo 3+2) queda centrada automáticamente sin ítems desalineados a la izquierda.
- Reducción aplicada: `rounded-2xl→rounded-xl`, paddings `p-6/p-7→p-4`, imagen `aspect-[3/2]→aspect-[4/3]`, títulos `text-3xl/4xl→text-xl/2xl`, cuerpo `→text-sm`.
- Versión móvil: por debajo de `sm` se reemplazan las flip cards por un acordeón nativo y accesible (`ValuesAccordion`), con los cinco valores, título + descripción **literal** (sin resumir), un solo ítem abierto a la vez, controlado por toque/clic y con `aria-expanded`/`aria-controls`/`role="region"`. No depende de hover ni usa animaciones 3D.
- La interacción de flip (clic, toque, teclado, `prefers-reduced-motion`) se conserva sin cambios para `sm` en adelante.

### 4 y 5. Línea de tiempo — interactividad y título

- Estado: terminado.
- Archivo: `packages/site-kit/src/components/CompanyTimeline.tsx` (reescrito).
- Hover: se agregó `onMouseEnter` (y `onFocus` para navegación por teclado) a cada botón de hito, además del `onClick` existente; en dispositivos táctiles el hito seleccionado se mantiene activo por `onClick` hasta tocar el otro. El punto activo escala (`h-4 w-4 → h-5 w-5`, `scale-110`), cambia de color/relleno, y la tarjeta activa cambia de fondo/borde. Se agregó una línea de progreso (`span` con `scaleX`/`scaleY` según el hito activo) que crece con transición suave y respeta `motion-reduce:transition-none`.
- Los hitos siguen siendo únicamente Fundación y Actualidad; su contenido proviene de `timelineContent.ts`, alimentado por `lineatiempo.txt`. No se inventó información.
- El año de Actualidad se genera dinámicamente en `CompanyTimeline.tsx:20` con `new Date().getFullYear()`; no se escribió manualmente en ningún archivo.
- Selección por teclado: los hitos son `<button>` nativos con `aria-pressed`, por lo que Tab + Enter/Espacio funcionan sin JS adicional; el foco visible usa el anillo compartido del proyecto.
- Título: se eliminó “Línea de tiempo de Distribuciones La Nieve” / “Línea de tiempo de {siteName}”. El componente compartido ahora renderiza únicamente `Nuestra Historia` para ambas marcas. Se retiró el eyebrow “Nuestra historia” porque repetía la misma idea que el nuevo título.

### 6. Correo y dirección en el footer

- Estado: terminado.
- Fuente: `C:\Devs\web\la-nieve-web\redesciales.txt`.
- Datos extraídos:
  - Unimarka: correo `servicioalcliente@unimarka.com`; teléfono `320-341-4212`; dirección `Cra 22 N 5B-114 BG A15 Parque Comercial La Primavera Villavicencio – Meta`; Instagram `https://www.instagram.com/unimarka_col/?igshid=YmMyMTA2M2Y=`; Facebook `https://www.facebook.com/unimarka.23/?ti=as`. El archivo no lista LinkedIn para Unimarka.
  - La Nieve: correo `servicioalcliente@lanieve.com`; teléfono `+57 320 3414212`; misma dirección que Unimarka; Instagram, Facebook y LinkedIn (`https://www.linkedin.com/company/distribuciones-la-nieve-ltda`).
- Archivos: `packages/site-kit/src/config/types.ts` (nuevos campos `footerContact` y `socialNetworks` en `SiteConfig`), `packages/site-kit/src/components/Footer.tsx`, `apps/la-nieve/src/site.config.ts`, `apps/unimarka/src/site.config.ts`.
- Decisión de diseño: se creó `site.footerContact.{email,location}` **separado** de `site.contact`, porque `site.contact` de La Nieve ya usa datos verificados de `tratamientodata.txt` para la página de Contacto (punto 8 de la sesión anterior) y no debían sobrescribirse. El footer ahora lee `footerContact` (correo y dirección de `mailto:`) y sigue leyendo `contact.phone` sin cambios.
- Dato ambiguo detectado: el correo de La Nieve difiere entre fuentes (`servicioalcliente@lanieve.com` en `redesciales.txt` vs `servicioalcliente@lanieve.co` en `tratamientodata.txt`, usado en la página de Contacto), y la dirección de `redesciales.txt` (bodega A15, Parque Comercial La Primavera) también difiere de la de `tratamientodata.txt` (Carrera 22 No. 5 B 114 bodega L1). Se siguió literalmente la instrucción de este punto (usar `redesciales.txt` para el footer); la página de Contacto no se modificó. Se recomienda que la empresa confirme cuál dato es el vigente.
- Red social eliminada de Unimarka: LinkedIn. Se controla con el nuevo arreglo `socialNetworks` por marca (`["instagram","facebook"]` en Unimarka, `["linkedin","instagram","facebook"]` en La Nieve); `Footer.tsx` filtra por esta lista, por lo que no queda botón deshabilitado ni hueco visual donde antes estaba LinkedIn.

### 7. Footer de Unimarka en gris

- Estado: terminado.
- Archivo TXT utilizado: `assets/colores.txt` (sección “PALETA DE COLORES UNIMARKA”).
- Valor gris encontrado: `HEX #535456` (RGB 84/84/86), ya definido como `--unimarka-gray` en `packages/site-kit/src/styles/globals.css`.
- Aplicado en: `packages/site-kit/src/styles/globals.css`, bloque `.brand-unimarka` — `--footer-background: var(--unimarka-gray)`, con `--footer-foreground`, `--footer-muted` y `--footer-accent` ajustados para mantener contraste (texto e iconos blancos, acento blanco en hover). El logo blanco de Unimarka (`site.chromeLogo`) ya se renderizaba sin recuadro; sobre el nuevo fondo gris continúa así. El footer de La Nieve no se tocó (sigue en `--la-nieve-type-gray` / `#3c3c3b`, ya funcional).
- El valor no se repitió en componentes: sigue centralizado en la variable `--footer-background` del token de marca.

### 8. Tecnología e innovación en horizontal

- Estado: terminado.
- Archivo: `packages/site-kit/src/components/Innovation.tsx` (reescrito).
- Distribución final: introducción centrada (eyebrow + título + descripción) seguida de una franja horizontal de tres bloques — Proyectos, Infraestructura y Operaciones, Soluciones y Transformación Digital — separados por `divide-x` (líneas verticales editoriales) en escritorio, **sin** fondo de tarjeta blanca individual. En tableta (`sm`, 640–1023px) pasan a 2 columnas con el tercer bloque centrado ocupando el ancho completo (`sm:col-span-2`). En móvil se apilan verticalmente sin scroll horizontal.
- Imágenes/SVG: no se reutilizó ninguna imagen existente adecuada para las tres áreas, así que se crearon tres ilustraciones SVG simples y corporativas **en línea** dentro de `Innovation.tsx` (componente `TechIllustration`), sin archivos adicionales. Usan `currentColor`, por lo que heredan automáticamente el azul de La Nieve o el rojo de Unimarka según el token `--primary` de cada marca. No contienen texto, logos ni marcas de agua.
  - Proyectos: ruta de hitos conectados (planificación/ejecución).
  - Infraestructura y Operaciones: plataformas apiladas con indicador de continuidad.
  - Soluciones y Transformación Digital: núcleo de datos con conexiones (integración/automatización).
- Contenido: se conservó el texto ya sintetizado de `tecnoinfo.txt` en `packages/site-kit/src/config/technologyContent.ts` (`CORPORATE_TECHNOLOGY.items`); no se copió el archivo literalmente ni se agregaron capacidades no mencionadas en la fuente.
- Colores: los acentos de marca (azul en La Nieve, rojo en Unimarka) se aplican solo en el ícono, la línea divisoria corta bajo cada ícono y los separadores verticales; ningún bloque queda con superficie saturada.
- El campo `site.innovation.image`/`imageCaption` de cada `site.config.ts` queda sin uso visual en esta sección (se conserva en la configuración por compatibilidad de tipo, sin necesidad de eliminarlo).

## Validación de esta sesión

- `npm run build` (ambas apps, workspaces): correcto en una única ejecución; TypeScript sin errores; 16 páginas estáticas generadas por marca.
- No se ejecutaron lint, typecheck aislado ni pruebas responsive adicionales, según la restricción de validación mínima solicitada para esta sesión.
- Pendiente real: ninguno de los 8 puntos quedó parcial. El dato ambigüo de correo/dirección de La Nieve (redesciales.txt vs tratamientodata.txt) queda documentado arriba para que la empresa lo resuelva; no se inventó ningún valor.

## Sesión de simplificación — 5 requerimientos puntuales (2026-07-16, effort alto)

Continuación directa de la sesión anterior. Todos los puntos parten del estado descrito arriba; no se revirtió ningún cambio de color, estructura o estilo ya aprobado, y no se hicieron refactors generales.

### 1. Simplificación del logo blanco de La Nieve

- Estado: terminado.
- Archivos: `packages/site-kit/src/config/types.ts`, `packages/site-kit/src/components/BrandLogo.tsx`, `apps/la-nieve/src/site.config.ts`, `apps/la-nieve/public/brand/logo-white.png` (reemplazado).
- Hallazgo: el usuario ya había reemplazado `assets/Lanievewhite.png` por una versión con las mismas dimensiones exactas del logo normal (438×214, antes 1536×1024), pero la copia desplegada en `apps/la-nieve/public/brand/logo-white.png` seguía siendo la versión antigua. Se volvió a copiar el archivo actualizado (`cp assets/Lanievewhite.png apps/la-nieve/public/brand/logo-white.png`) sin alterar el original.
- Correcciones específicas eliminadas: se quitó el valor `"contain"` de `SiteLogoConfig["display"]` (queda solo `"cropped-square" | "wide"`, igual que antes de la primera corrección) y se eliminó por completo el campo opcional `scale`. `BrandLogo.tsx` volvió a su ternario original de dos ramas, sin `style`/`transform` condicional. `apps/la-nieve/src/site.config.ts` ahora declara `chromeLogo` con `width: 438, height: 214, display: "wide"`, exactamente como `logo` (el mismo patrón que ya usaba Unimarka). No quedan clases, escalas ni condicionales exclusivos de La Nieve.
- `Navigation.tsx` no se modificó: la superposición de logo normal/blanco por opacidad dentro de la misma caja (`h-14 w-40 sm:w-44`) ya era idéntica para ambas marcas y sigue siéndolo.

### 2. Favicon de Unimarka

- Estado: terminado.
- Ruta exacta del archivo original: `C:\Devs\web\la-nieve-web\assets\isotipounimarka.png` (1536×1024).
- Copiado sin alterar a `apps/unimarka/public/brand/favicon.png` (único lugar donde se necesitaba; no se duplicó en más rutas).
- Configurado en `apps/unimarka/src/site.config.ts` → `favicon: "/brand/favicon.png"` (antes apuntaba a `/brand/logo-horizontal.png`, que ya no se referencia como favicon y sigue existiendo solo como logo del sitio). El valor se consume vía `createSiteMetadata` en `packages/site-kit/src/config/metadata.ts:28-33`, que ya generaba `icons.icon`/`icons.shortcut` a partir de `site.favicon`; no fue necesario tocar `layout.tsx` ni agregar un manifest.
- La Nieve no se tocó: sigue en `favicon: "/faviconnieve.png"`.

### 3. Contacto de Unimarka

- Estado: terminado.
- LinkedIn: `ContactPage.tsx` (`packages/site-kit/src/pages/ContactPage.tsx`) recorría siempre las tres redes (`linkedin`, `instagram`, `facebook`) y mostraba un rectángulo deshabilitado con ícono, texto "LinkedIn" y leyenda "Pendiente" cuando el enlace era `null`. Se agregó `.filter(({ key }) => site.socialNetworks.includes(key))` antes del `.map`, igual que ya hacía `Footer.tsx`. Como `apps/unimarka/src/site.config.ts` ya definía `socialNetworks: ["instagram", "facebook"]` (sesión anterior), el rectángulo de LinkedIn deja de renderizarse por completo (sin icono, texto, enlace, `href="#"` ni espacio reservado) sin necesidad de ningún `if (brand === "unimarka")` en el componente. La Nieve conserva LinkedIn porque su `socialNetworks` sigue incluyendo `"linkedin"`.
- Canales directos: `apps/unimarka/src/site.config.ts` → bloque `contact` ahora incluye `email: "servicioalcliente@unimarka.com"` y `phone: "320-341-4212"`.
  - Fuente y orden seguido: (1) configuración actual de Unimarka — no tenía estos campos; (2) `C:\Devs\web\la-nieve-web\redesciales.txt`, sección "Unimarka" — de ahí se tomaron ambos valores literalmente; (3) no fue necesario recurrir a otra fuente documentada en este archivo.
  - `ContactPage.tsx` ya construía `mailto:`/`tel:` automáticamente a partir de `site.contact.email`/`site.contact.phone` (líneas 142-147), por lo que no se escribieron los datos directamente en el componente; solo se centralizaron en `site.config.ts`.
  - Se actualizó `contact.pendingMessage` de Unimarka (antes decía que correo, teléfono, dirección y redes estaban todos pendientes) para reflejar que solo la dirección y el mapa siguen pendientes de confirmación oficial.
  - La Nieve no se tocó: su bloque `contact` sigue igual.
  - Dato pendiente real: la dirección física para la página de Contacto de Unimarka (`site.contact.location`) y el mapa (`mapEmbedUrl`) siguen sin definir; no se inventaron.

### 4. Crédito del equipo de desarrollo en los footers

- Estado: terminado.
- Archivos: `packages/site-kit/src/config/types.ts` (nuevo campo `developmentTeam: string` en `SiteConfig`), `apps/la-nieve/src/site.config.ts` (`developmentTeam: "Equipo TI & Desarrollo La Nieve"`), `apps/unimarka/src/site.config.ts` (`developmentTeam: "Equipo TI & Desarrollo Unimarka"`), `packages/site-kit/src/components/Footer.tsx`.
- Ubicación: fila inferior del footer compartido, mismo renglón que el copyright. En escritorio usa `sm:flex-row sm:items-center sm:justify-between` (copyright a la izquierda, crédito + `dev.png` a la derecha); en móvil (`flex-col items-center`) ambos elementos se apilan centrados. El texto del crédito usa `text-xs text-footer-muted/80`, más discreto que el copyright (`text-sm`), y reemplazó la leyenda genérica "Contenido corporativo sujeto a validación oficial." que ocupaba ese mismo espacio.
- El año del copyright sigue generándose dinámicamente con `new Date().getFullYear()` en `Footer.tsx`; no se reemplazó por un valor fijo.

### 5. `dev.png` en el footer

- Estado: terminado.
- Ruta exacta del archivo original: `C:\Devs\web\la-nieve-web\assets\dev.png` (295×295).
- Copiado sin alterar a `apps/la-nieve/public/dev.png` y `apps/unimarka/public/dev.png` (cada aplicación Next.js sirve su propia carpeta `public`, por lo que se requieren ambas copias, pero la lógica vive en un único lugar).
- Componente: `packages/site-kit/src/components/Footer.tsx`, junto al crédito del equipo (mismo bloque `flex items-center gap-2`), sin lógica condicional por marca.
- Enlace configurado: `https://github.com/starfront`, con `target="_blank"`, `rel="noopener noreferrer"` y `aria-label="Visitar perfil de desarrollo en GitHub"`. La imagen usa `h-4 w-4 object-contain` (muy pequeña, sin fondo ni borde), `alt="Firma del equipo de desarrollo"`, y una transición sutil en hover (`opacity-70 → opacity-100`, `hover:brightness-110`, `hover:-translate-y-px`), sin resplandores.

## Validación de la sesión de simplificación

- `npm run build` (ambas apps, workspaces): correcto en una única ejecución; TypeScript sin errores; 16 páginas estáticas generadas por marca.
- Verificado manualmente en el código (no en navegador, por restricción de validación mínima): `ContactPage.tsx` ya no itera sobre `linkedin` para Unimarka; `BrandLogo.tsx` no tiene ramas ni estilos exclusivos de marca; `site.favicon` de Unimarka apunta a `/brand/favicon.png` y el de La Nieve no cambió.
- Pendiente real: dirección física y mapa de Contacto de Unimarka (no confirmados en ninguna fuente disponible). Ningún otro punto de esta sesión quedó parcial.

## Sesión de diagnóstico — logo blanco del navbar de La Nieve (2026-07-16, effort xhigh)

- Estado: terminado.
- Reporte del usuario: tras el scroll, el logo blanco de La Nieve seguía cambiando de posición/tamaño respecto al logo inicial, a pesar de la simplificación anterior.
- Diagnóstico realizado (análisis de píxeles con un decodificador PNG en Node, sin dependencias):
  - `apps/la-nieve/public/brand/logo-horizontal.png` y el logo blanco (`assets/Lanievewhite.png`, ya desplegado) son **pixel-idénticos en geometría**: mismo lienzo 438×214 y misma caja de contenido no transparente `[2,9]–[431,206]` en ambos. El par de Unimarka (referencia que funciona) tiene la misma propiedad: 543×209 con caja `[8,3]–[534,205]` en ambos archivos.
  - Verificación visual: el archivo blanco contiene el mismo isotipo azul en idéntica posición y el texto "Lanieve" en blanco. Es la versión correcta.
  - El código ya era estructuralmente idéntico para ambas marcas: `Navigation.tsx` superpone ambos `BrandLogo` en la misma caja `h-14 w-40 sm:w-44` con cross-fade de opacidad, y ambos logos de La Nieve usan `display: "wide"` → `object-contain object-left`, sin escalas, offsets, transforms ni clases condicionales (retiradas en la sesión anterior).
- Causa raíz real: **caché por URL**. `/brand/logo-white.png` sirvió durante las primeras sesiones un archivo 1536×1024 con proporción 1.5; al reemplazarlo por la versión 438×214 la URL no cambió, y tanto la caché del navegador como la del optimizador de imágenes de Next (`.next/cache/images`, keyed por URL) podían seguir entregando la versión antigua, reproduciendo el desplazamiento reportado.
- Solución aplicada (sin tocar Unimarka ni añadir compensaciones):
  - `assets/Lanievewhite.png` copiado sin alterar a `apps/la-nieve/public/brand/logo-white-v2.png` (nombre nuevo → todas las cachés lo tratan como recurso nuevo).
  - Eliminado `apps/la-nieve/public/brand/logo-white.png` (URL obsoleta, sin referencias restantes; verificado con grep).
  - `apps/la-nieve/src/site.config.ts` → `chromeLogo.src: "/brand/logo-white-v2.png"` (único punto de cambio en código, dentro de la configuración de marca, con comentario explicativo).
  - Limpieza preventiva de `apps/la-nieve/.next/cache/images`.
- Archivos modificados: `apps/la-nieve/src/site.config.ts`, `apps/la-nieve/public/brand/logo-white-v2.png` (nuevo), `apps/la-nieve/public/brand/logo-white.png` (eliminado), `docs/progress.md`.
- Sin cambios en: `Navigation.tsx`, `BrandLogo.tsx`, `types.ts`, cualquier archivo de Unimarka, y los archivos originales de `assets/`.
- Validación: `npm run build -w @corporativo/la-nieve` correcto; TypeScript sin errores; 16 páginas estáticas.
- Nota para el usuario: si tras levantar el sitio el navegador aún mostrara el logo antiguo, un refresco normal basta — la URL nueva no existe en ninguna caché previa.
