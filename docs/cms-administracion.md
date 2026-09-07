# CMS y administracion de contenido

## Recomendacion inicial

Adoptar un CMS headless administrado para el contenido publico y conservar las dos aplicaciones Next.js como capa de presentacion. Para este proyecto, la primera opcion a evaluar en una prueba de concepto es Sanity: evita operar otra aplicacion, base de datos y almacenamiento desde el primer dia; permite que las dos marcas compartan un modelo editorial sin compartir necesariamente permisos; y desacopla el panel del despliegue de La Nieve y Unimarka.

La decision no debe cerrarse sin validar contrato, residencia y portabilidad de datos, SSO, auditoria, limites del plan, soporte y costo total con Compras, Tecnologia y Seguridad. Si la organizacion exige alojar y controlar toda la plataforma, Payload es la alternativa preferida: es TypeScript, se integra naturalmente con Next.js y ofrece panel, autenticacion, control de acceso, APIs, medios, preview y base de datos. Esa propiedad implica operar Postgres, almacenamiento de objetos, respaldos, actualizaciones y monitoreo. Strapi tambien es viable para un equipo que prefiera un CMS desacoplado y tenga experiencia operando Node; agrega otra pila y modelos generados fuera del tipado actual.

| Criterio                   | Sanity                           | Payload                                       | Strapi                                       |
| -------------------------- | -------------------------------- | --------------------------------------------- | -------------------------------------------- |
| Operacion inicial          | Servicio administrado            | Infraestructura propia o cloud del proveedor  | Infraestructura propia o cloud del proveedor |
| Ajuste al codigo actual    | Cliente de datos en ambas apps   | Muy alto por Next.js y TypeScript             | API REST/GraphQL desacoplada                 |
| Borradores y preview       | Si; validar funciones del plan   | Si; configurable en codigo                    | Draft & Publish; preview configurable        |
| Control del esquema        | Esquema como codigo              | Esquema como codigo y tipos                   | Content Type Builder y codigo                |
| Propiedad de base de datos | Servicio del proveedor           | Directa con Postgres o MongoDB                | Directa en despliegue propio                 |
| Carga operativa            | Baja                             | Media/alta                                    | Media/alta                                   |
| Riesgo principal           | Dependencia y plan del proveedor | Operacion y acoplamiento a una aplicacion CMS | Operacion y sincronizacion de tipos          |

No se registran precios en este estudio porque cambian por plan, usuarios, trafico, almacenamiento y soporte. Se deben solicitar cotizaciones sobre el mismo escenario para compararlas.

## Alcance del CMS

Contenido editable:

- Textos de inicio, Somos, Cultura, Contacto y paginas informativas.
- Aliados, logos, orden, visibilidad y piezas publicitarias.
- Vacantes reales, ubicacion, modalidad, descripcion, vigencia y estado.
- Imagenes con texto alternativo, dimensiones, punto focal, autor, derechos y fecha de expiracion.
- SEO por pagina: titulo, descripcion, imagen social, canonical cuando aplique e indexacion.
- Datos de contacto publicos y enlaces sociales sujetos a aprobacion.

Configuracion que permanece en codigo:

- Rutas, componentes, identidad visual, tokens, navbar y reglas responsive.
- Endpoints, destinatarios secretos, Turnstile, Resend y variables de entorno.
- Validaciones, limites de archivos, permisos tecnicos y contratos de datos.
- Textos legales aprobados que requieran despliegue controlado, hasta definir su flujo formal de aprobacion.

Fuera del CMS publico:

- PQRS, radicados, identidades, anexos y trazabilidad de casos.
- Hojas de vida y datos de candidatos.
- Formularios de proveedores, clientes y contactos.
- Credenciales, reportes internos, datos comerciales y datos sensibles.

Estos registros requieren un sistema transaccional o gestor documental con cifrado, auditoria, retencion, autorizacion por expediente y respaldo. El CMS solo podria publicar el catalogo aprobado de causales; nunca seria la fuente del expediente.

## Modelo editorial

Usar un unico proyecto o instancia con un campo obligatorio `brand` (`la-nieve` o `unimarka`) y permisos por marca. No modelar cada pagina como un editor visual sin restricciones. Conviene definir bloques aprobados y tipados para conservar el diseno y la accesibilidad.

Colecciones iniciales:

- `siteSettings`: una entrada por marca para datos publicos globales.
- `page`: slug, marca, encabezado, bloques aprobados y SEO.
- `ally`: marca, nombre, logo, orden, estado y vigencia.
- `campaign`: marca, piezas, aliado, orden, fechas y estado.
- `cultureStory`: marca, titulo, resumen, contenido, personas, medios y estado.
- `jobOpening`: marca, codigo interno, cargo, area, ubicacion, modalidad, descripcion, fechas y estado.
- `media`: archivo, punto focal, texto alternativo, derechos, autor y caducidad.

Cada documento debe incluir marca, estado, autor, fecha de modificacion y version. Los slugs deben ser unicos por marca. Las relaciones entre contenido publicado deben impedir referencias a borradores inexistentes.

## Flujo empresarial

Roles minimos:

- Editor La Nieve: crea y edita solo contenido de La Nieve.
- Editor Unimarka: crea y edita solo contenido de Unimarka.
- Revisor: aprueba contenido de su marca.
- Publicador: publica o programa publicaciones.
- Administrador: gestiona modelos, usuarios e integraciones; no es el rol editorial diario.

Flujo: borrador, revision, aprobado, publicado y archivado. El preview debe usar una URL firmada, cookies seguras y contenido no indexable. Produccion solo consulta documentos publicados. Las publicaciones deben conservar historial suficiente para identificar quien cambio que y permitir una restauracion controlada.

## Integracion con Next.js 16

1. Crear un paquete `packages/content` con cliente servidor, consultas, esquemas de lectura y mapeo hacia los tipos actuales de `SiteConfig`.
2. Consultar el CMS desde Server Components. No exponer tokens de escritura al navegador.
3. Mantener una configuracion local minima como fallback solo durante la migracion, con fecha de retiro definida; no mantener dos fuentes editables indefinidamente.
4. Etiquetar cache por marca y tipo de contenido. Un webhook autenticado del CMS llamara a Route Handlers separados por aplicacion.
5. En Next.js 16 usar `revalidateTag(tag, "max")` para contenido publico tolerante a una breve demora; la firma de un solo argumento esta deprecada. Validar firma, secreto, marca y tipo antes de invalidar.
6. Tratar una falla del CMS con una respuesta controlada y contenido publicado cacheado, no con acceso al borrador ni mensajes tecnicos al visitante.
7. Generar sitemap y metadata desde el mismo contenido publicado para evitar diferencias entre pagina y SEO.

## Seguridad y operacion

- SSO y MFA para editores si el plan elegido lo permite; prohibir cuentas compartidas.
- Menor privilegio por marca, ambiente, coleccion y operacion.
- Webhooks firmados, secretos rotables y listas de origen cuando sean compatibles.
- Medios con validacion de tipo y peso, analisis de archivos y politica de derechos.
- Ambientes separados para desarrollo, pruebas y produccion; nunca probar con el contenido productivo editable.
- Exportaciones periodicas, respaldo probado y procedimiento documentado de restauracion.
- Alertas por fallos de webhook, consultas, almacenamiento y autenticacion.
- Registro de auditoria y revision periodica de usuarios, permisos y contenido vencido.
- Presupuesto que incluya plataforma, almacenamiento, transferencia, usuarios, soporte y horas de operacion.

## Implementacion por fases

1. Descubrimiento: inventariar campos actuales, propietarios, aprobadores, dominios, volumen de medios y requisitos de seguridad.
2. Prueba de concepto: modelar Aliados y una pagina de Cultura para ambas marcas, con permisos, preview, publicacion y restauracion. Comparar Sanity y Payload si control de infraestructura sigue abierto.
3. Fundacion: crear ambientes, SSO/MFA, backups, paquete tipado, webhooks y monitoreo.
4. Migracion: cargar contenido existente mediante scripts repetibles, validar imagenes y comparar visualmente ambas marcas.
5. Piloto editorial: operar con un editor y un revisor por marca; medir errores, tiempos y necesidades de capacitacion.
6. Expansion: migrar paginas informativas, campanas y vacantes. Legal entra solo con flujo juridico aprobado.
7. Retiro: eliminar la fuente duplicada en `site.config.ts` cuando la migracion tenga aceptacion y rollback probado.

## Decisiones pendientes

- Preferencia entre servicio administrado y propiedad total de infraestructura.
- Requisitos de SSO, residencia de datos, auditoria, soporte y aprobacion de proveedores.
- Numero de editores, revisores y publicadores por marca.
- Quien aprueba contenido comercial, Cultura, vacantes y Legal.
- Frecuencia de publicacion, necesidad de programacion y tolerancia a cache.
- Politica de derechos, vigencia, retencion y eliminacion de medios.
- Integracion futura de vacantes con un ATS; el CMS publica ofertas, pero no debe almacenar postulaciones.

## Fuentes consultadas

- Payload, "What is Payload?": panel, APIs, autenticacion, acceso, archivos y base de datos en una aplicacion Next.js TypeScript. https://payloadcms.com/docs/getting-started/what-is-payload
- Sanity, documentacion oficial e indice para integraciones Next.js. https://www.sanity.io/docs/next-js-quickstart
- Strapi 5, "Draft & Publish": borradores, estados, publicacion y API de contenido. https://docs.strapi.io/cms/features/draft-and-publish
- Next.js 16 local, `node_modules/next/dist/docs/01-app/01-getting-started/09-revalidating.md`: cache por etiquetas y recomendacion de revalidacion bajo demanda para CMS.

Consulta realizada el 7 de septiembre de 2026. Esta es una recomendacion de arquitectura, no una aprobacion comercial, juridica o de seguridad.
