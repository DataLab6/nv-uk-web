# Proceso — fase 1

Fecha de actualización: 15 de julio de 2026.

## Alcance

- Mantener `la-nieve-web` como monorepo con dos aplicaciones separadas.
- Ejecutar La Nieve en el puerto `3000` y Unimarka en el `3001`.
- Compartir estructura, componentes, plantillas, efectos y comportamiento.
- Mantener identidad, assets, metadata y contenido configurables por marca.
- Reorganizar la navegación en páginas corporativas independientes.
- Conservar el bloque `Together` como hero de Inicio, con el nombre interno `Hero` cuando resulte conveniente.
- Restaurar aliados (`Brands`) y estadísticas en Inicio.
- Incorporar cobertura demo, canales de clientes e innovación.
- Separar Contacto y Trabaja con nosotros.
- Añadir un área Legal con páginas independientes para tratamiento de datos y PQRS.
- Evitar que cualquier dato de ejemplo se interprete como una afirmación corporativa validada.

## 1. Fuentes y límites de contenido

Los archivos locales del proyecto siguen siendo la fuente principal. El sitio público anterior de La Nieve no se utiliza como referencia visual ni textual.

La estructura de esta iteración incluye contenido de muestra solicitado para:

- estadísticas;
- misión y visión;
- departamentos del mapa de cobertura;
- textos iniciales de tecnología, cultura, empleo y legal.

Estos datos sirven para construir y evaluar la experiencia, pero quedan pendientes de validación corporativa, jurídica u operativa según corresponda. No deben publicarse como información definitiva.

Los nombres de aliados fueron suministrados para mapear la interfaz. Cada tarjeta deja un espacio para una imagen futura y usa iconos o iniciales de manera provisional. La incorporación de logotipos requiere archivos y autorización de uso.

## 2. Arquitectura del monorepo

```text
apps/la-nieve        → Next.js, puerto 3000
apps/unimarka        → Next.js, puerto 3001
packages/site-kit    → componentes, páginas, hooks, tipos y estilos
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

La barra se mantiene transparente al comienzo y adopta el color principal de cada empresa al hacer scroll. `Legal` abre un menú pegado a la navegación mediante hover o foco; en móvil sus opciones forman parte de la navegación expandida.

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

1. `Hero`: conserva la composición y el recurso visual del bloque `Together` suministrado.
2. `Brands`: presenta los aliados configurados para la empresa y reserva espacio para sus futuras imágenes.
3. `Stats`: muestra cifras de stock solicitadas como ejemplo y un aviso visible de validación pendiente.
4. `CoverageMap`: permite explorar departamentos de demostración y expone el ancla `#cobertura`.
5. `CustomerChannels`: incluye Tiendas; Minimercados y Supermercados; Mayoristas; Institucional; Bares y Licoreras; Otros, bajo el ancla `#canales`.
6. `Innovation`: destaca la apuesta por tecnología e innovación continua sin atribuir logros o métricas no respaldados.

El mapa es un recurso interactivo de interfaz, no una declaración de cobertura vigente. La lista final de departamentos debe sustituirse cuando cada empresa la confirme.

## 6. Páginas corporativas

### Somos

La plantilla incorpora misión, visión, valores y pilares. La misión y la visión iniciales son ejemplos editoriales solicitados y deben validarse con cada empresa.

### Aliados comerciales

Se mapean los nombres suministrados para La Nieve y Unimarka. Cada aliado cuenta con una zona visual preparada para reemplazar el icono o las iniciales por una imagen autorizada.

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
- Unimarka: acentos azul `#275FA6`, azul claro `#4FACCB` y rojo `#EF4036`.

## 8. Datos pendientes de validación

Antes de publicación se debe confirmar o reemplazar:

- todas las cifras de `Stats`;
- misión, visión, valores y pilares;
- departamentos y cobertura comercial;
- textos de innovación y cultura;
- imágenes y logotipos autorizados de aliados;
- sedes, teléfonos, correos, formularios y redes oficiales;
- flujo para recepción de hojas de vida;
- contenido, responsables y canales de tratamiento de datos y PQRS;
- imágenes corporativas definitivas.

No se usan como datos actuales direcciones, sedes o correos de manuales antiguos cuando su vigencia no puede confirmarse.

## 9. Accesibilidad y comportamiento esperado

- navegación por teclado y enlace “Saltar al contenido”;
- `aria-current` en la ruta activa;
- apertura del submenú Legal por hover y foco;
- menú móvil con acceso a las páginas legales;
- foco visible por marca;
- contraste y variantes dark por marca;
- soporte para `prefers-reduced-motion`;
- mapa operable mediante controles con etiquetas comprensibles;
- imágenes con texto alternativo;
- limpieza de listeners, animaciones y recursos al desmontar componentes.

## 10. Verificación

El 15 de julio de 2026 se ejecutaron satisfactoriamente las comprobaciones automáticas de esta iteración:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Los dos builds de producción finalizaron correctamente y generaron las rutas nuevas y las rutas de compatibilidad en ambas aplicaciones.

Queda pendiente comprobar manualmente, cuando los puertos estén disponibles y sin modificar su configuración:

1. Ambas aplicaciones en `3000` y `3001`, sin modificar esos puertos.
2. Navegación de escritorio, móvil y teclado.
3. Cambio de la barra transparente al color de marca durante el scroll.
4. Submenú Legal mediante hover y foco.
5. Redirecciones antiguas y anclas de Inicio.
6. Interacción y avisos del mapa y las estadísticas demo.
7. Carga local y recorte responsive de las ocho imágenes.

Estas comprobaciones visuales y de interacción no se marcan como realizadas en este documento.
