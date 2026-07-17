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
- Estadísticas: bloque `stats` de cada `site.config.ts` (copy e imagen futura por marca) + grupos de cifras compartidos en `packages/site-kit/src/config/statsContent.ts`.
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

## Sesión: estadísticas reales y retiro del mapa interactivo (2026-07-16)

### Decisión principal

- El **mapa interactivo de cobertura fue descartado para esta fase** y se reemplazó por una composición preparada para una **futura imagen estática** de cobertura nacional, integrada en la misma sección que las estadísticas.

### Estadísticas actualizadas

- Se retiraron las cuatro cifras demostrativas de cada marca (aliados, canales, departamentos, vocación de servicio / categorías) y sus disclaimers de "cifras de demostración".
- Nuevo contenido centralizado en `packages/site-kit/src/config/statsContent.ts` (`CORPORATE_STATS_GROUPS`), con estructura título / prefijo / cifra / unidad / descripción / notas:
  - **Cobertura nacional**: 24 departamentos de Colombia; 85% del territorio nacional; enfoque especial en Bogotá, Medellín, Cali, Cartagena y Apartadó.
  - **Capacidad operativa**: 47,300 m² en centros de fulfillment; más de 64,000 posiciones de almacenamiento.
  - **Volumen de operaciones**: más de 5,800 toneladas transportadas mensualmente; 159,000 clientes con pedidos entregados; 580-700 municipios con cobertura diaria.
  - **Equipo humano**: 460 colaboradores altamente capacitados; perfil profesional; enfocados en logística.
- Las cifras se conservaron literalmente ("580-700" como rango, "m²", "fulfillment"); "Más de" se muestra como prefijo discreto sobre la cifra.

### Atribución por empresa

- La instrucción no atribuyó las cifras a una marca concreta. Se aplicaron a **ambas marcas como contenido corporativo compartido** (misma decisión previa que misión/visión/tecnología), adaptándose solo el color de acento por tokens. **Duda documentada**: si las cifras pertenecen a una sola compañía o al grupo consolidado, debe confirmarse; el punto de cambio es único (`statsContent.ts` + campo `stats.groups` de cada `site.config.ts`).

### Contradicciones con la extracción de base de datos (no se reemplazó nada silenciosamente)

Las cifras del prompt se mantuvieron como fuente principal, según la instrucción. Diferencias frente a `data/database-snapshot/` (2026-07-16):

- "24 departamentos": la extracción muestra 29 departamentos con clientes en La Nieve y 24 en Unimarka (el 24 coincide exactamente con Unimarka).
- "159,000 clientes": la base registra 100.485 (La Nieve) + 51.867 (Unimarka) terceros históricos ≈ 152k combinados; 11.625 + 10.568 con compras en 90 días.
- "580-700 municipios diarios": la base muestra 370 (NV) y 250 (UK) municipios históricos con clientes.
- "Enfoque especial en Bogotá, Medellín, Cali, Cartagena y Apartadó": los departamentos top en la base son Meta, Boyacá, Bogotá y Casanare; Medellín/Cali/Cartagena/Apartadó no aparecen como zonas relevantes en `clientes`.
- 47,300 m², 64,000 posiciones, 5,800 toneladas y 460 colaboradores no tienen fuente en la base extraída (no verificables ahí).

### Mapa: componente y lógica retirada

- Componente modificado: la sección combinada vive en `packages/site-kit/src/components/Stats.tsx` (reescrito). `HomePage.tsx` ya **no** monta `CoverageMap`.
- `packages/site-kit/src/components/CoverageMap.tsx` **no se eliminó** (queda como referencia, sin consumo): con él quedan fuera del home los estados `selectedDepartment`/`hoveredDepartment`, los handlers de clic/hover/teclado por departamento, los tooltips SVG y el listado interactivo de departamentos. No se usaba GeoJSON.
- El bloque `coverage` de ambos `site.config.ts` y su tipo se conservan marcados como **legacy** (comentario en `types.ts`); ya no se consumen desde el home.
- El ancla `/#cobertura` (usada por el redirect de `/cobertura`) ahora apunta a la nueva sección combinada (`id="cobertura"` en `Stats.tsx`). El id `#stats` desapareció; nada lo referenciaba.

### Imagen de cobertura

- **No existe aún imagen definitiva**. Se revisó `assets/`, `packages/site-kit/src/assets/` y `apps/*/public/images`: no hay ninguna imagen de mapa/cobertura, así que no se usó ninguna.
- Espacio preparado: `CoverageImageSlot` dentro de `Stats.tsx` — figura `rounded-3xl` con relación 4:3 en móvil y altura completa de columna en escritorio, fondo `mesh-gradient` (tokens de marca) + retícula sutil + insignia con icono de mapa y las palabras "Cobertura nacional / Colombia". Sin mensajes técnicos visibles.
- **Cómo incorporar la imagen futura (para otro modelo)**: copiar el archivo a `apps/la-nieve/public/images/` y `apps/unimarka/public/images/` (o a `packages/site-kit/src/assets/` si será compartida) y configurar `stats.image` en cada `site.config.ts` con `src`, `alt`, `width`, `height`; el componente la mostrará automáticamente con `object-cover` sin tocar código.

### Composición y responsive

- Escritorio: imagen a la izquierda, encabezado + cuadrícula 2×2 de grupos a la derecha (una sola sección editorial, sin cards con fondo).
- Móvil: primero el contenido narrativo (encabezado y cifras), la imagen/espacio al final (`order-last lg:order-none`); sin scroll horizontal.
- Los números usan mayor jerarquía (3xl/4xl, `tabular-nums`) que las descripciones (`text-sm muted`); acentos con `--primary` de cada marca (azul La Nieve, rojo Unimarka).

### Cambios de tipos y limpieza

- `types.ts`: nuevos `SiteStatFigure` y `SiteStatGroup`; `stats` ahora es `SitePageCopy & { image: SiteImageConfig | null; groups }`. Se eliminó la interfaz `SiteStat` y los campos `items`/`disclaimer` (solo los usaba el Stats anterior). `useCounterAnimation.ts` queda sin consumidores pero se conserva.
- Barrels (`index.ts`, `config/index.ts`): exportan `CORPORATE_STATS_GROUPS`, `SiteStatFigure`, `SiteStatGroup`; retiran `SiteStat`.
- No se tocaron los scripts de `scripts/database-exploration/` ni los archivos de `data/database-snapshot/`; la web no los consume.

### Archivos consultados

`docs/current-database-extraction.md`, `data/database-snapshot/statistics-current.json`, `data/database-snapshot/department-coverage-current.json`, configuración actual de ambas marcas y `docs/progress.md`. Los archivos de extracción se usaron solo como referencia manual para documentar contradicciones; no alimentan la web.

### Validación

- `npm run build` (ambas apps): compilación y TypeScript correctos; 16 páginas estáticas por marca. Única validación ejecutada.

### Pendientes

- Confirmar con la empresa la atribución de las cifras (¿grupo consolidado o una sola marca?).
- Producir/entregar la imagen estática de cobertura nacional y configurarla en `stats.image` (instrucciones arriba).
- Resolver las contradicciones cifras-prompt vs base de datos cuando exista una instrucción oficial.

## Sesión de extracción puntual de base de datos (2026-07-16)

- Estado: terminada. Tarea **aislada y de solo lectura**; no toca el sitio web.
- Se creó `scripts/database-exploration/` (fuera de los workspaces, con `mssql` instalado de forma aislada) con `extract-current-statistics.mjs`, `db.mjs` (guardia de solo lectura) y `run-adhoc-query.mjs`.
- Se extrajo una fotografía puntual de `PORTAL_NIEVE` (SQL Server) hacia `data/database-snapshot/` (statistics, cobertura por departamento/municipio en JSON+CSV, y resultados de las 19 consultas).
- Hallazgos clave: `dbo.clientes.Cia` 1 = La Nieve / 2 = Unimarka; geografía por `f_desc_depto`/`f_desc_ciudad` (texto libre); ventas al día en `VentasMSV_NV/UK`; 29/24 departamentos con clientes.
- Documentación completa (conexión, consultas, cifras, limitaciones, cómo re-ejecutar): `docs/current-database-extraction.md`.
- Sin integración con el frontend, sin endpoints, sin procesos automáticos, sin credenciales guardadas, sin datos personales exportados.

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

## Sesión: formulario formal de radicación de PQRS (2026-07-16, effort xhigh)

Aplicado a **ambas marcas** (La Nieve y Unimarka): el componente `PqrsPage.tsx` ya era 100% compartido y sin diferencias de contenido entre marcas, y la nueva página reutiliza exactamente el mismo patrón ya establecido en `CareersPage.tsx` (enlace compartido a `/legal/tratamiento-de-datos` sin condicionar por marca), así que no había motivo para restringir la función a una sola empresa.

### 1. Botón de redirección (página informativa)

- Estado: terminado.
- Archivo: `packages/site-kit/src/pages/PqrsPage.tsx`.
- El bloque "Canal de radicación en preparación" se reescribió como una introducción breve + botón principal **"Radicar una solicitud"** (`<Link href="/legal/pqrs/radicacion">`, sin `target="_blank"`, sin modal, sin lógica de formulario en esta página). El botón solo se renderiza si `site.pqrs.filing.enabled` es `true` (ambas marcas lo tienen en `true`).
- El texto ya no afirma que el canal está operativo: indica que "seguimos validando la integración técnica para su envío definitivo".

### 2. Nueva página de radicación

- Estado: terminado visualmente y en validaciones; **envío final deshabilitado** (no existe backend).
- Ruta: `/legal/pqrs/radicacion` en ambas apps — `apps/la-nieve/src/app/legal/pqrs/radicacion/page.tsx` y `apps/unimarka/src/app/legal/pqrs/radicacion/page.tsx`.
- Componente compartido: `packages/site-kit/src/pages/PqrsFilingPage.tsx` (un único componente para ambas marcas, sin duplicar).
- Config nueva y centralizada: `packages/site-kit/src/config/pqrsFilingContent.ts` (`PQRS_DOCUMENT_TYPES`, `PQRS_ATTACHMENT_RULES`, `PQRS_RESPONSE_TERMS_NOTE`), exportada desde ambos barrels (`config/index.ts`, `index.ts`). Nuevo campo `pqrs.filing: { enabled, backendAvailable }` en `SiteConfig` (`types.ts`) y en ambos `site.config.ts` (`enabled: true, backendAvailable: false`).

### 3. Visibilidad de la ruta

- **No** se agregó a `Navigation.tsx`, a `createCorporateNavigation` (menú Legal), ni a `Footer.tsx`. Verificado con `grep` sobre todo el código: la cadena `radicacion` solo aparece en `PqrsPage.tsx` (el botón) y en un comentario de `types.ts`; ningún archivo de navegación/footer la referencia.
- Metadata propia en cada `page.tsx` (no reutiliza `createPageMetadata`/`SitePageKey` para no tocar ese sistema compartido): `robots: { index: false, follow: false }`. Sigue siendo una URL **pública**, solo excluida de indexación; no se afirma que sea privada.
- No existe generador de sitemap en el proyecto (no se encontró `sitemap.ts`/`next-sitemap`), así que no había nada de qué excluirla.
- Único enlace visible hacia la página: el botón de `/legal/pqrs`.

### 4. Campos implementados

- **Destinatario:** `Dirigido a: {site.legalName}`, no editable, tomado de la configuración de marca (no escrito en el componente).
- **Tipo de solicitud:** select derivado de `site.pqrs.categories.map(c => c.title)` (Peticiones/Quejas/Reclamos/Sugerencias ya existentes; no se inventaron categorías). Soporta preselección por `?tipo=` en la URL (leído con `window.location.search` en un `useEffect`, sin `useSearchParams` de Next para evitar el requisito de `Suspense`); el usuario puede cambiarla. No se enlazó individualmente desde cada tarjeta de categoría en `PqrsPage.tsx` porque esas tarjetas usan el componente compartido `FeatureCard.tsx`, consumido por otras secciones del sitio (canales, cultura, inicio) — modificarlo para añadir navegación habría afectado partes fuera del alcance de esta tarea.
- **Tipo de solicitante:** persona natural / persona jurídica / apoderado o representante, con campos condicionales exactamente como se solicitó (para apoderado: selector de si la persona representada es natural o jurídica, datos del apoderado, y adjunto opcional del documento de representación).
- **Datos de contacto:** correo + confirmar correo (validados y comparados), teléfono opcional, línea fija "Medio de respuesta: correo electrónico". No existe ningún campo de dirección física ni opción de respuesta a domicilio (verificado: el componente no incluye ningún campo de dirección).
- **Contenido:** Asunto, Objeto de la solicitud y Hechos y razones como tres campos independientes (no se combinaron en un único "mensaje"), cada uno con contador de caracteres discreto (150/2000/4000) y recomendación de redacción.
- **Anexos:** zona de arrastrar/soltar + selector, listado con nombre/tamaño/eliminar, validación de formato y tamaño. Reglas centralizadas en `PQRS_ATTACHMENT_RULES` (PDF/DOC/DOCX/JPG/PNG, 10 MB por archivo, 25 MB total, máx. 5 archivos) — **valores de referencia de interfaz sin backend que los confirme**, documentados como tal en el propio archivo de configuración; no se implementó ninguna carga real (los archivos permanecen solo en el navegador).
- **Autorizaciones (3 casillas independientes, ninguna marcada por defecto):** tratamiento de datos personales (enlaza a `/legal/tratamiento-de-datos`, menciona a `site.legalName` como responsable, sin finalidades comerciales adicionales), aceptación de respuesta exclusivamente por correo, y declaración de veracidad de la información y los anexos.
- **Revisión antes de enviar:** botón "Revisar antes de enviar" valida el formulario (foco automático al primer error) y muestra un resumen (tipo, solicitante, documento parcialmente enmascarado, correo, asunto, objeto, hechos, anexos, autorizaciones) con botones "Corregir información" y "Radicar solicitud".
- **Envío:** el botón "Radicar solicitud" permanece deshabilitado (`disabled={!site.pqrs.filing.backendAvailable}`, actualmente `false` en ambas marcas) con un aviso explícito de que el canal de envío está en preparación. No se genera número de radicado, no se simula envío, no se usa `mailto:`, no se guarda en `localStorage`, no se envían datos en la URL.

### 5. Seguridad y accesibilidad

- No hay `console.log` de datos del formulario en ningún punto del componente.
- Los archivos adjuntos solo existen en memoria del navegador (objetos `File`); no se suben a ningún lado.
- Errores de validación: junto al campo, con `role="alert"`, `aria-invalid` y foco automático al primer campo con error.
- `fieldset`/`legend` para cada grupo, radios accesibles vía `sr-only` + estilo visual en el `label`, tamaño táctil ≥ 44px en controles principales, una sola columna en móvil, sin scroll horizontal.

### 6. Hallazgos y contradicciones documentadas (no resueltas en esta sesión)

- **`tratamientodata.txt` cambió desde la sesión anterior**: ahora contiene **dos políticas completas** (antes solo tenía la de La Nieve): una para `DISTRIBUCIONES LA NIEVE S.A.S` (líneas 1–197) y una nueva para `UNIMARKA S.A.S` (líneas 201–398), con sus propios canales, definiciones y trámites. Esto **contradice** lo implementado actualmente en `DataPolicyPage.tsx`/`dataPolicyContent.ts`, que muestra "Documento no disponible para Unimarka" y fija `dataPolicy.documentId: null` para esa marca. **No se modificó `DataPolicyPage.tsx` ni `dataPolicyContent.ts` en esta sesión** (fuera del alcance: "no rediseñes otras páginas"); se documenta aquí para que otro modelo transcriba el documento de Unimarka siguiendo el mismo criterio literal usado para La Nieve.
- **Correo de radicación de Unimarka**: `tratamientodata.txt` (sección Unimarka, "Radicación de consulta o solicitud de información") especifica `servicioalcliente@unimarka.co`, mientras que `site.contact.email` de Unimarka (agregado en una sesión anterior desde `redesciales.txt`) es `servicioalcliente@unimarka.com`. Mismo patrón de discrepancia `.co` vs `.com` ya documentado para La Nieve. El formulario de radicación no usa ninguno de estos correos directamente (el usuario escribe el suyo); la discrepancia afecta a qué correo de la empresa se muestra como "Canales directos" en `ContactPage.tsx`, no modificado aquí.
- **Términos de "Consultas"**: el prompt de esta sesión pidió usar como referencia general "Consultas: 30 días", pero `tratamientodata.txt` (ambas políticas) especifica textualmente "las consultas serán atendidas en un término máximo de diez (10) días hábiles". Seguí la instrucción explícita de conservar como principal la cifra suministrada en el prompt (30 días) y no reemplazarla por suposición; el texto de `PQRS_RESPONSE_TERMS_NOTE` dentro de `pqrsFilingContent.ts` la incluye igualmente marcada como referencia no vinculante. **Esta contradicción (10 vs. 30 días para consultas) queda pendiente de validación jurídica antes de publicar.**
- Los términos de "peticiones generales" (15 días) y "solicitudes de información o documentos" (10 días) del prompt sí coinciden con los plazos de trámite de peticiones/reclamos (15 días hábiles) y de recolección de datos de `tratamientodata.txt`.

### 7. Confirmaciones explícitas pedidas

- No existe ningún campo de dirección física para la respuesta (ni en el formulario ni como opción de canal).
- La respuesta se configura exclusivamente por correo electrónico: el fijo "Medio de respuesta: correo electrónico" y la casilla de aceptación correspondiente son los únicos mecanismos; no hay alternativa de domicilio.
- Ruta de la política de tratamiento de datos enlazada: `/legal/tratamiento-de-datos` (misma para ambas marcas; para Unimarka hoy muestra el aviso de documento no disponible — ver contradicción arriba).
- Estado del backend: **no existe**. No hay endpoint, API, servicio de correo, base de datos ni Power Automate conectado a este formulario ni a ningún otro del sitio (mismo patrón ya usado en `ContactPage.tsx`/`CareersPage.tsx`).
- Estado de la carga de archivos: interfaz completa (selección, arrastrar/soltar, validación, listado, eliminación); **sin almacenamiento real**.
- Método de generación del radicado: **ninguno**; no se genera número de radicado falso ni real, porque no hay backend que lo emita.

### 8. Elementos que requieren revisión jurídica antes de producción

Responsable interno del canal; correo oficial definitivo para PQRS (resolver discrepancia `.co`/`.com`); términos publicados (10 vs. 30 días para consultas); procedimiento de radicación; custodia de anexos; tratamiento de datos de Unimarka (documento ya existe en la fuente, falta transcribirlo); procedimiento para solicitudes incompletas; gestión de peticiones anónimas; confirmación y número de radicado; integración con correo, base de datos o sistema documental.

### 9. Próximo paso para que el canal sea funcional

1. Definir e implementar el backend real (correo, base de datos o sistema documental) que reciba los datos validados por este formulario.
2. Resolver la contradicción del correo de Unimarka y actualizar `site.contact.email` si corresponde.
3. Transcribir la política de tratamiento de datos de Unimarka desde `tratamientodata.txt` (líneas 201–398) a `dataPolicyContent.ts`, siguiendo el mismo criterio literal aplicado a La Nieve, y actualizar `dataPolicy.documentId` de Unimarka.
4. Validar jurídicamente los términos de atención (10 vs. 30 días) y los límites de anexos antes de retirar el aviso de "canal en preparación".
5. Una vez exista backend, cambiar `pqrs.filing.backendAvailable` a `true` por marca; el botón "Radicar solicitud" se habilitará automáticamente sin más cambios de UI.

### Validación

- `npm run build` (ambas apps): compilación y TypeScript correctos; se generaron 17 páginas estáticas por marca (antes 16), incluyendo `/legal/pqrs/radicacion`.
- Verificado por código (no en navegador): el botón de `/legal/pqrs` enlaza a la nueva ruta; la ruta no aparece en navbar/footer/menú Legal; no hay campo de dirección física; correo y confirmación son obligatorios y se comparan; las tres autorizaciones son independientes y no vienen premarcadas; no se imprime nada en consola; la ruta tiene `robots: noindex, nofollow`.

## Sesión: normalización visual de logos de aliados (2026-07-16)

- Estado: terminado.
- Causa raíz confirmada por análisis de píxeles (decodificador PNG en Node, sin dependencias, midiendo el bounding box de contenido no transparente de cada archivo): varios logos tienen mucho margen transparente interno dentro de su lienzo. Con `object-fit: contain`, ese margen se conserva proporcionalmente, así que el contenido visible termina ocupando solo una fracción pequeña de la caja aunque el archivo tenga una resolución alta. No era un problema de contenedor ni de `displayWidth` (que ya era compartido entre carrusel y sección).
- Componentes: `packages/site-kit/src/components/AllyLogo.tsx` (nuevo prop `visualScale`, aplicado como `transform: scale()` sobre la imagen, no sobre la caja; se retiró `overflow-hidden` del contenedor externo, que ya no era necesario y habría recortado la escala), `packages/site-kit/src/components/Brands.tsx` y `packages/site-kit/src/pages/AlliesPage.tsx` (ambos pasan `visualScale={logo.visualScale}` / `ally.visualScale`).
- Fuente única de la lista de aliados: ya estaba centralizada (`site.allies.logos` y `site.allies.items` apuntan al mismo array `laNieveBrandLogos`/`unimarkaBrandLogos` en cada `site.config.ts`); el carrusel y la sección completa la comparen sin duplicar configuración. Se añadió el campo opcional `visualScale` a `SiteAlly`/`SiteBrandLogo` en `types.ts` y un 6.º parámetro opcional al helper `brandLogo()` de cada `site.config.ts`.
- Propiedad añadida: `visualScale` (multiplicador uniforme, por defecto ausente = 1). Se probó que un tope de **1.4** es seguro sin recortes en ambas ubicaciones (cálculo geométrico: en el carrusel, caja `h-16`(64px) dentro de `div h-20`(80px) dentro de `li h-24`(96px); a escala 1.4 el desbordamiento máximo (12.8px por lado) cabe dentro del margen disponible sin tocar el `overflow-hidden` de la pista del marquee; en la sección completa no existe ningún ancestro con `overflow-hidden`, por lo que allí el margen es aún mayor).
- Logos que necesitaron ajuste especial (escala aplicada / % de altura visual estimado antes de escalar):
  - La Nieve: Electrolit (Pisa Farmacéutica) 1.4 (~30%→~41%), Incauca 1.4 (~31%→~43%), Nestlé Purina 1.4 (~30%→~42%), Levapan 1.4 (~47%→~66%), Nestlé Alimentos 1.4 (~52%→~73%), Alimentos Polar 1.25 (~68%→~85%).
  - Unimarka: Providencia 1.4 (~16%→~22%), La Soberana 1.4 (~49%→~69%), Quala 1.25 (~69%→~85%).
  - El resto de los 16 logos de La Nieve y 13 de Unimarka conservan el valor por defecto (sin `visualScale`), ya que su contenido ya ocupa ≥85% de la altura de la caja.
- Logos con márgenes transparentes internos grandes (documentados, no corregidos por edición de imagen): Electrolit, Incauca, Nestlé Purina y Providencia son los casos más severos (contenido real entre 16% y 31% de su lienzo). El resto de logos ajustados (Levapan, Nestlé Alimentos, La Soberana, Alimentos Polar, Quala) tiene un margen moderado, ya razonablemente compensado con la escala.
- Logos que **no** quedaron completamente corregidos solo con CSS: **Providencia** (Unimarka) es el caso más severo — incluso con el tope de escala de 1.4 su contenido visible sigue notablemente más pequeño que el resto (~22% de la altura de caja). Electrolit, Incauca y Nestlé Purina (La Nieve) mejoran de forma perceptible pero siguen algo por debajo del resto (~41–43%).
- **Recomendación**: recortar manualmente el espacio transparente sobrante de `providencia.png` (prioritario), `electrolit.png`, `incauca.png` y `nestle-purina.png` cuando sea posible, para no depender de una escala tan alta. No se modificó ningún archivo de imagen en esta sesión.
- Confirmado: el carrusel (`Brands.tsx`) y la sección completa (`AlliesPage.tsx`) leen exactamente el mismo array y el mismo campo `visualScale` por aliado — un ajuste se refleja automáticamente en ambos lugares. Las dos copias duplicadas del carrusel (bucle infinito) reciben la misma configuración porque ambas iteran sobre el mismo array `logos`.
- No se tocó: animación, pausa por hover, orden de aliados, modo oscuro (la superficie discreta `dark:bg-white/90` en ambos componentes sigue igual), ni la arquitectura general.
- Validación: `npm run build` (ambas apps) correcto, TypeScript sin errores; `curl` confirmó 200 en `/` y `/aliados-comerciales` con el dev server de La Nieve levantado brevemente.

## Sesión: panel corporativo de estadísticas y mapa (2026-07-17)

- Estado: terminado. Cambio exclusivamente visual en `packages/site-kit/src/components/Stats.tsx` (sección `id="cobertura"` del home). Sin cambios en datos, textos, cifras, imagen del mapa, configuraciones ni otras secciones.
- Composición nueva: toda la sección vive en **un único recuadro** `rounded-[2.5rem]` con fondo `bg-brand-primary` + degradado sutil hacia una variante oscura generada con `color-mix(in srgb, var(--brand-primary) 78%, black)`. Como `--brand-primary` ya resuelve por marca (La Nieve `#27348A` azul, Unimarka `#BD202D` rojo oscuro, definidos en `globals.css`), el componente sigue siendo compartido sin condicionales de marca y no existe color fijo común.
- Escritorio: grid `lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]` (~57% estadísticas izquierda / ~43% mapa derecha).
- Mapa: integrado directamente sobre el fondo corporativo — sin card, sin borde, sin sombra, sin fondo propio; `object-fit: contain` conserva la proporción (imagen configurada por marca en `site.stats.image`; Unimarka `public/images/mapa-cobertura-unimarka.png`, La Nieve sigue con `null` y muestra el espacio preparado re-estilizado en blanco sobre el fondo azul). En `lg` el `figure` se posiciona absoluto (`-top-16 / -bottom-10 / -right-4`) para sobresalir de forma moderada y controlada del panel; `html/body` usan `overflow-x: clip`, y el desborde derecho (1rem) queda dentro del margen de página, por lo que no hay scroll horizontal.
- Estadísticas: misma estructura y datos (`StatGroup` con títulos, divisores, cifras y notas); solo se recolorearon con capas blancas translúcidas (`text-white`, `text-white/75`, `bg-white/[0.07]` como superficie por grupo, divisores `bg-white/25`), que sobre cada fondo producen tonos derivados azules o rojos según la marca, con contraste suficiente en ambas.
- Móvil/tableta: apilado vertical — primero estadísticas, después el mapa centrado (`h-80/h-96`, `max-w-md`, flujo normal, sin desbordes laterales).
- Modo oscuro: `--brand-primary` no cambia en `.dark`, así que el panel se ve igual en ambos modos (mismo criterio que el navbar sólido).
- Nota: la imagen de referencia mencionada en la instrucción no llegó adjunta; la composición se implementó a partir de la descripción escrita (recuadro único, 55–60/40–45, mapa emergiendo del panel).
- Validación: `npm run build` correcto en ambas apps, TypeScript sin errores.

## Sesión: ampliación de la extracción de base de datos con unidades BAT, Alpina y Nestlé Ecom (2026-07-17)

- Estado: terminado. La extracción puntual de `PORTAL_NIEVE` (script aislado `scripts/database-exploration/extract-current-statistics.mjs`) no cubría las unidades de negocio de La Nieve; se añadieron 12 consultas de solo lectura (total 31, todas correctas) y se regeneraron los cuatro archivos de `data/database-snapshot/` (49 indicadores).
- BAT: ventas en `dbo.VentasBAT_NV` (vigente al 2026-07-17); clientes marcados vía `dbo.clientes.TipoNegocioBAT` (75.682 en Cia 1; anomalía: también hay marcados en Cia 2 y 6); cobertura en 27 departamentos; catálogo `BMSV*` (1.103 productos, 21 marcas).
- Alpina: esquemas `amovil` (Yopal) y `amovil1` (Villavicencio; opera desde 2026-01). Clientes al corte: 3.720 / 7.987; cobertura de últimos 12 meses desde las ventas (`txDepartamento/txCiudad`, filtro `boAfectaVenta='S'`): 6 deptos/41 municipios y 12/56. La maestra de clientes no trae departamento.
- Nestlé Ecom: limitación real — no existe tabla de ventas ni clientes propia; única fuente `dbo.ObjetivoEfectividad_EcNestle_nv` (al 2026-07-01: 17 rutas, maestra objetivo 6.093). `ECOM_NstlObjetivoMarcos` está vacía.
- Documentación completa actualizada en `docs/current-database-extraction.md` (fuentes, consultas, indicadores, cobertura, limitaciones y anomalías).
- Sin integración con el frontend, sin endpoints, sin procesos persistentes; credenciales solo por variables de entorno en la ejecución manual.

## Sesión: preparación para despliegue en Vercel (2026-07-17)

- Estado: terminado (configuración de repositorio). Plataforma elegida por el usuario: **Vercel**, con dos proyectos separados apuntando al mismo repo (`apps/la-nieve` y `apps/unimarka` como Root Directory de cada uno). Dominios: pendientes de definir.
- Archivos agregados/modificados:
  - `package.json` (raíz): se agregó `"engines": { "node": ">=20.9.0" }` para fijar la versión mínima de Node compatible con Next.js 16.
  - `apps/la-nieve/vercel.json` y `apps/unimarka/vercel.json` (nuevos): `ignoreCommand` para que cambios ajenos a una app (o a `packages/site-kit`) no disparen un build innecesario del otro proyecto.
  - `docs/deployment.md` (nuevo): guía paso a paso para crear los dos proyectos en Vercel, configuración de Root Directory/Build/Install Command, variables de entorno (ninguna requerida hoy) y asignación futura de dominios.
- No se tocó: `next.config.ts` de ninguna app (no se agregó `output: "standalone"`, propio de self-hosting/Docker, no de Vercel), arquitectura del monorepo, componentes ni páginas.
- No se crearon los proyectos de Vercel ni se asignó ningún dominio (requiere acceso al dashboard del usuario); queda documentado como paso manual siguiente en `docs/deployment.md`.
- Validación: `npm run build` (ambas apps) correcto tras los cambios, sin errores de TypeScript.
