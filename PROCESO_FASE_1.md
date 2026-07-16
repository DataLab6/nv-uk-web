# Proceso — fase 1

Fecha de actualización: 15 de julio de 2026.

## Alcance

- Mantener `la-nieve-web` como monorepo con dos aplicaciones separadas.
- Ejecutar La Nieve en el puerto `3000` y Unimarka en el `3001`.
- Compartir estructura, componentes, plantillas, efectos y comportamiento.
- Mantener identidad, assets, metadata y contenido configurables por marca.
- Reorganizar la navegación en páginas corporativas independientes.
- Conservar el bloque `Together` como hero de Inicio y reutilizar una sola copia física de su imagen en las dos aplicaciones.
- Restaurar aliados (`Brands`) y estadísticas en Inicio.
- Incorporar cobertura demo, canales de clientes e innovación.
- Separar Contacto y Trabaja con nosotros.
- Añadir un área Legal con páginas independientes para tratamiento de datos y PQRS.
- Evitar que cualquier dato de ejemplo se interprete como una afirmación corporativa validada.

## 1. Fuentes y límites de contenido

Los archivos locales del proyecto siguen siendo la fuente principal. El sitio público anterior de La Nieve no se utiliza como referencia visual ni textual.

La estructura de esta iteración mantiene contenido de muestra solicitado para:

- estadísticas;
- departamentos del mapa de cobertura;
- pilares corporativos;
- textos iniciales de tecnología, cultura, empleo y legal.

Estos datos sirven para construir y evaluar la experiencia, pero quedan pendientes de validación corporativa, jurídica u operativa según corresponda. No deben publicarse como información definitiva.

La misión, la visión y los cinco valores ya no son textos de demostración: se conservan literalmente en `packages/site-kit/src/config/corporateContent.ts` y se consumen desde las dos marcas.

Los nombres de aliados fueron suministrados para mapear la interfaz. Esta iteración incorpora los 16 archivos reales de `assets/MarcasNV` en La Nieve y los 12 de `assets/MarcasUK` en Unimarka. En la página de aliados de Unimarka se mantienen marcadores únicamente para Grupo Familia e Indulacteos, porque no se suministró un archivo identificable para esas dos entradas. La publicación definitiva de los logotipos sigue sujeta a autorización de uso.

## 2. Arquitectura del monorepo

```text
apps/la-nieve        → Next.js, puerto 3000
apps/unimarka        → Next.js, puerto 3001
packages/site-kit    → componentes, páginas, hooks, tipos y estilos
                        contenido corporativo y assets compartidos
scripts/dev.mjs      → ejecución simultánea y cierre coordinado
```

Los archivos de ruta de las apps solo seleccionan una plantilla y entregan su `siteConfig`. La interfaz se implementa una vez en `site-kit`, mientras textos, colores, imágenes y metadata permanecen separados por aplicación.

## 3. Estructura de navegación aprobada

Ambas aplicaciones comparten estas rutas:

| Ruta                          | Propósito                                  |
| ----------------------------- | ------------------------------------------ |
| `/`                           | Inicio                                     |
| `/somos`                      | Misión, visión, valores y pilares          |
| `/aliados-comerciales`        | Aliados y espacios para imágenes futuras   |
| `/cultura`                    | Contenido de valor para clientes           |
| `/contacto`                   | Contacto corporativo                       |
| `/trabaja-con-nosotros`       | Empleo y recepción futura de perfiles      |
| `/legal`                      | Entrada al área legal                      |
| `/legal/tratamiento-de-datos` | Tratamiento de datos                       |
| `/legal/pqrs`                 | Peticiones, quejas, reclamos y sugerencias |

La barra se mantiene transparente al comienzo y adopta el color principal de cada empresa al hacer scroll. El acabado añade desenfoque, borde, sombra y transición sutiles; los logotipos se muestran directamente, sin cápsula, conservan su proporción y tienen una elevación discreta al pasar el cursor. `Legal` abre un menú pegado a la navegación mediante hover o foco; en móvil sus opciones forman parte de la navegación expandida.

## 4. Redirecciones heredadas

La nueva arquitectura fue aprobada junto con estas redirecciones:

```text
/nosotros  → /somos
/marcas    → /aliados-comerciales
/productos → /
/cobertura → /#cobertura
/clientes  → /#canales
```

Su propósito es conservar compatibilidad con enlaces de la primera organización sin mantener páginas duplicadas.

## 5. Composición de Inicio

Inicio queda organizado en el siguiente orden:

1. `Hero`: conserva la composición del bloque `Together` suministrado. Las dos marcas importan la misma imagen física desde `packages/site-kit/src/assets/hero/together-store.png`, manteniendo sus textos propios.
2. `Brands`: presenta los logotipos configurados por marca —16 para La Nieve y 12 para Unimarka— con proporción contenida. El carrusel continuo se pausa al pasar el cursor, continúa desde el mismo punto al retirarlo y reduce el movimiento cuando el sistema solicita `prefers-reduced-motion`.
3. `Stats`: muestra cifras de stock solicitadas como ejemplo y un aviso visible de validación pendiente.
4. `CoverageMap`: permite explorar departamentos de demostración y expone el ancla `#cobertura`.
5. `CustomerChannels`: incluye Tiendas; Minimercados y Supermercados; Mayoristas; Institucional; Bares y Licoreras; Otros, bajo el ancla `#canales`.
6. `Innovation`: destaca la apuesta por tecnología e innovación continua sin atribuir logros o métricas no respaldados.

El mapa es un recurso interactivo de interfaz, no una declaración de cobertura vigente. La lista final de departamentos debe sustituirse cuando cada empresa la confirme.

## 6. Páginas corporativas

### Somos

La plantilla incorpora misión, visión, cinco valores y pilares. Misión, visión y valores utilizan literalmente el contenido suministrado y se centralizan en `packages/site-kit/src/config/corporateContent.ts`. Solo los pilares continúan identificados como contenido demostrativo pendiente de validación.

`Nuestros valores` es una sección compartida en formato editorial tipo bento, situada después de misión y visión. Presenta Integridad, Compromiso Social, Lealtad, Respeto y Emprendimiento sin recortar sus descripciones.

### Aliados comerciales

Se mapean los nombres suministrados para La Nieve y Unimarka. La Nieve publica las 16 copias web procedentes de `MarcasNV`; Unimarka publica las 12 procedentes de `MarcasUK`. En la página de Unimarka, Grupo Familia e Indulacteos conservan un marcador visual por falta de un archivo identificable. El componente compartido usa ajuste contenido para evitar deformaciones.

### Cultura

El contenido se organiza alrededor de:

- tips comerciales;
- buenas prácticas para establecimientos;
- recomendaciones y apoyo para fortalecer los negocios.

### Contacto y Trabaja con nosotros

Son páginas independientes. Contacto queda reservado para canales corporativos; Trabaja con nosotros podrá mostrar oportunidades o instrucciones de postulación cuando se reciban datos oficiales.

### Legal

`/legal` funciona como entrada y enlaza a dos páginas individuales:

- Tratamiento de datos.
- PQRS.

Los textos iniciales son estructura de muestra. Requieren revisión jurídica, definición de responsables, canales, plazos y procedimientos antes de publicación.

## 7. Imágenes de esta iteración

### Recursos compartidos

La imagen del hero se mantiene en una única ubicación y no se duplica entre aplicaciones:

```text
packages/site-kit/src/assets/hero/together-store.png
```

Para `Nuestros valores` se generaron cinco fotografías conceptuales con una dirección visual corporativa coherente y se optimizaron como WebP. No contienen texto incrustado, logotipos inventados ni marcas de agua:

```text
packages/site-kit/src/assets/values/integridad.webp
packages/site-kit/src/assets/values/compromiso-social.webp
packages/site-kit/src/assets/values/lealtad.webp
packages/site-kit/src/assets/values/respeto.webp
packages/site-kit/src/assets/values/emprendimiento.webp
```

Las escenas representan honestidad y confianza; colaboración comunitaria; unión de equipo; escucha respetuosa; e innovación en un pequeño negocio, respectivamente. Se comparten entre las dos identidades y reciben el tratamiento cromático de cada marca desde la interfaz.

### Recursos propios de cada aplicación

Se generaron imágenes para los espacios Somos, Stats, Innovación y Cultura de cada marca. Su integración local se realizó en:

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

Estas imágenes son provisionales y buscan apoyar la composición. No representan necesariamente personal, clientes, aliados, sedes o procesos reales de las empresas, y no incluyen marcas de terceros.

### Dirección final de generación

Modo utilizado: `Generate`, sin imágenes de referencia. Los prompts finales compartieron esta instrucción: fotografía corporativa editorial fotorrealista, horizontal y natural, con personas colombianas o latinoamericanas; sin texto legible, logotipos, marcas, empaques identificables ni marcas de agua.

- `Somos`: equipo diverso colaborando en una bodega de distribución limpia.
- `Stats`: operación organizada de inventario y despacho, con espacio negativo para la composición web.
- `Innovación`: coordinación logística con tabletas o lectores, sin datos legibles en pantalla.
- `Cultura`: acompañamiento práctico a comerciantes y propietarios de pequeños negocios.
- La Nieve: acentos azul profundo `#27348A` y turquesa `#6DC6D9`.
- Unimarka: la dirección actual prioriza los rojos `#BD202D` y `#EF4036`; conserva azul, blanco y grises como apoyo corporativo.

Los archivos de logotipos se publican como copias web normalizadas en:

```text
apps/la-nieve/public/brands/   # 16 archivos de MarcasNV
apps/unimarka/public/brands/   # 12 archivos de MarcasUK
```

La Nieve usa además `apps/la-nieve/public/faviconnieve.png` únicamente desde su metadata. Unimarka conserva su propia configuración de icono.

## 8. Datos pendientes de validación

Antes de publicación se debe confirmar o reemplazar:

- todas las cifras de `Stats`;
- pilares corporativos;
- departamentos y cobertura comercial;
- textos de innovación y cultura;
- autorización definitiva para publicar los logotipos de aliados y los archivos faltantes de Grupo Familia e Indulacteos;
- sedes, teléfonos, correos, formularios y URLs de redes oficiales;
- flujo para recepción de hojas de vida;
- contenido, responsables y canales de tratamiento de datos y PQRS;
- imágenes corporativas definitivas para sustituir, si corresponde, las fotografías conceptuales.

No se usan como datos actuales direcciones, sedes o correos de manuales antiguos cuando su vigencia no puede confirmarse.

## 9. Accesibilidad y comportamiento esperado

- navegación por teclado y enlace “Saltar al contenido”;
- `aria-current` en la ruta activa;
- apertura del submenú Legal por hover y foco;
- menú móvil con acceso a las páginas legales;
- foco visible por marca;
- contraste y variantes dark por marca;
- soporte para `prefers-reduced-motion`;
- pausa del carrusel de marcas con hover sin reiniciar el desplazamiento;
- logotipos con proporción contenida y sin recortes;
- botones de LinkedIn, Instagram y Facebook con etiqueta accesible; permanecen deshabilitados mientras sus URLs estén configuradas como `null`;
- mapa operable mediante controles con etiquetas comprensibles;
- imágenes con texto alternativo;
- limpieza de listeners, animaciones y recursos al desmontar componentes.

## 10. Actualización visual y de contenido — 15 de julio de 2026

La implementación de esta actualización mantuvo la arquitectura de sitios espejo y concentró las diferencias en configuración y tokens:

- Unimarka conserva su paleta oficial como referencia, pero ahora prioriza los rojos en botones, acentos, indicadores, tarjetas y estados interactivos. El footer usa azul corporativo para equilibrar el conjunto.
- La Nieve conserva sus colores; su footer pasa a una composición grafito y su favicon utiliza `faviconnieve.png`.
- Ambos heroes importan el único archivo compartido de `Together` y conservan el texto propio de cada marca.
- Los carruseles y páginas de aliados consumen listas configuradas por aplicación, sin mezclar las carpetas `MarcasNV` y `MarcasUK`.
- La misión, la visión y los cinco valores literales se centralizaron en `corporateContent.ts`. La sección compartida `Nuestros valores` usa cinco fotografías WebP también compartidas.
- Los logos de navegación dejaron de usar cápsula y la barra recibió profundidad, desenfoque y estados activos discretos.
- LinkedIn, Instagram y Facebook se centralizaron en cada `site.config.ts`. No se encontraron URLs oficiales verificables en el proyecto, por lo que los seis valores permanecen en `null` y los botones se muestran deshabilitados, sin enlaces falsos.

### Validación ejecutada

Se obtuvieron resultados correctos en:

```bash
npm run lint
npm run typecheck
npm run build:la-nieve
npm run build:unimarka
```

La auditoría local con Edge cubrió `320`, `375`, `768`, `1024` y `1440` px en ambas aplicaciones. En esos tamaños no se detectó desbordamiento horizontal; el menú móvil funcionó; los logos mantuvieron proporción; y se verificaron el hero compartido, los favicons, los archivos de marcas y los textos literales de misión, visión y valores.

También se comprobó en las dos aplicaciones que el carrusel se pausa al pasar el cursor y continúa desde su posición al retirarlo.

La consola se revisó además en cargas normales de `/` y `/somos` para las dos aplicaciones: no registró advertencias, excepciones ni errores. Los saltos artificiales usados para capturar secciones muy por debajo del primer viewport sí activaron avisos de desarrollo de Next Image sobre LCP y precarga; se aislaron de la prueba normal y no correspondieron a fallos de carga ni de ejecución de las páginas.
